from flask import Flask, request, jsonify,session, redirect, Blueprint
from flask_wtf import FlaskForm
from flask_cors import CORS 
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from uuid import uuid4
from flask_bcrypt import Bcrypt
from functools import wraps
import re  # For regex pattern matching
import logging
import os 
from .model import db, User, LoginForm, Tag, Role, Comment, Contact, Subscriber
from app import db, app

bcrypt = Bcrypt(app)
comments = []
login_manager = LoginManager()
login_manager.init_app(app)

CORS(app,supports_credentials=True)
app.logger.setLevel(logging.DEBUG)

data = ["Example 1", "Example 2", "Example 3", "Another example"]

main = Blueprint('main', __name__)

def load_user(user_id):
    return User.query.get(user_id)


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user)  # Log in the user
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401


@app.route('/verify-login', methods=['GET'])
def verify_login():
    if current_user.is_authenticated:
        # If the user is authenticated, return positive response
        return jsonify({"status": "Logged In", "user_id": current_user.get_id()}), 200
    else:
        # If the user is not authenticated, return negative response
        return jsonify({"status": "Not Logged In"}), 401

def add_roles():

    for role_name in ['Previous Employer', 'Recruiter/HR', 'Visitor']:
        if not Role.query.filter_by(name=role_name).first():
            db.session.add(Role(name=role_name))
    db.session.commit()


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "user_id" not in session:
            return jsonify({"error": "Unauthorized"}), 401  
        return f(*args, **kwargs)
    return decorated_function

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    role_name = data.get('role') 

    if role_name not in ['Previous Employer', 'Recruiter/HR', 'Visitor']:
        return jsonify({'error': 'Invalid role selected'}), 400
    
    role = Role.query.filter_by(name=role_name).first()
    if not role:
        return jsonify({'error': 'Role not found'}), 404
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')# Hashing password with bcrypt
    user = User(email=email, password=hashed_password, role_id=role.id, active=True)

    # Verify if user exists
    user_exists = User.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409

    # Check password strength
    if not is_strong_password(password):
        return jsonify({"error": "Password is too weak"}), 400

    db.session.add(user)
    try:
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'An error occurred while processing your request'}), 500

    

def is_strong_password(password):
    """Check if the password is strong and return tuple (is_strong, message)."""
    # Checking length
    if len(password) < 8:
        return False, "Password must be at least 8 characters long."
    # Checking for lowercase
    if not re.search("[a-z]", password):
        return False, "Password must include lowercase letters."
    # Checking for uppercase
    if not re.search("[A-Z]", password):
        return False, "Password must include uppercase letters."
    # Checking for digits
    if not re.search("[0-9]", password):
        return False, "Password must include digits."
    # Checking for special characters
    if not re.search("[!@#$%^&*(),.?\":{}|<>]", password):
        return False, "Password must include special characters."
    
    # If all checks passed
    return True, "Password is strong."


    

@app.route('/submit-comments', methods=['POST'])

def submit_comments():
    if not current_user.is_authenticated:
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.json
    if 'comment' in data and 'rating' in data:
       new_comment = Comment(
            user_id=current_user.id,
            content=data['comment'],
            rating=data['rating'],
            
        )

       tag_objects = []
       for tag_name in data.get('tags', []):
            tag = Tag.query.filter_by(name=tag_name).first()
            if not tag:
                tag = Tag(name=tag_name, usage_count=1) 
                db.session.add(tag)
            else:
               tag.usage_count += 1 
            tag_objects.append(tag)

       new_comment.tags = tag_objects
       db.session.add(new_comment)

       try:
            db.session.commit()
            return jsonify({'message': 'Comment added'}), 200
       except Exception as e:
            db.session.rollback()
            logging.error(f"Error submitting comment: {e}")
            return jsonify({'error': 'An error occurred while submitting the comment'}), 500
       
    else:
        return jsonify({'error': 'Invalid data'}), 400

@app.route('/get-comments', methods=['GET'])
def get_comments():
    all_comments = Comment.query.join(User).order_by(Comment.timestamp.desc()).all()  
    
    comments_json = []
    for comment in all_comments:

        comments_json.append({
            'username': comment.user.email,
            'role': comment.user.role.name, 
            'content': comment.content,
            'rating': comment.rating,
            'timestamp': comment.timestamp.isoformat(),
            'tags': [tag.name for tag in comment.tags]
        })

    return jsonify({'comments': comments_json}), 200

@app.route('/api/tag-summary', methods=['GET'])
def get_tag_summary():
    tags = Tag.query.all()
    tag_summary = {tag.name: tag.usage_count for tag in tags}
    return jsonify(tag_summary)


@app.route('/contact', methods=['POST'])
def handle_contact():
    data = request.json
    new_contact = Contact(
        firstName=data['firstName'],
        lastName=data['lastName'],
        email=data['email'],
        phone=data['phone'],
        message=data['message']
    )
    db.session.add(new_contact)
    db.session.commit()
    return jsonify({"message": "Contact information received!", "code": 200})

@app.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.json
    email = data.get('EMAIL')
    if email:
        new_subscriber = Subscriber(email=email)
        db.session.add(new_subscriber)
        try:
            db.session.commit()
            return jsonify({"message": "Successfully subscribed!", "status": "success"})
        except Exception as e:
            db.session.rollback()
            return jsonify({"message": "You are already subscribed.", "status": "error"})
    return jsonify({"message": "Invalid email address.", "status": "error"})

    
if __name__ == '__main__':
    with app.app_context():
       db.create_all()
       add_roles() 
    app.run(debug=True)
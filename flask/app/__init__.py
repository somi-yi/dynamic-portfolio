from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS 
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from .model import db
from .routes import main
import os
import logging

bcrypt = Bcrypt()
comments = []
login_manager = LoginManager()

CORS(main,supports_credentials=True)
main.logger.setLevel(logging.DEBUG)

data = ["Example 1", "Example 2", "Example 3", "Another example"]


def create_app():
    # Initialize Flask app
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
    bcrypt.init_app(app)
    login_manager.init_app(app)
    # Database configuration
    # app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
    #postgresql://portfoliopostgresql_user:kxidwi1UmTHDblZkwC8JAjuw9nB1MyjM@dpg-cp0k417jbltc73dv29f0-a.oregon-postgres.render.com/portfoliopostgresql
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ECHO'] = True

    db.init_app(app)
    
    app.register_blueprint(main)

    with app.app_context():
        from .routes import main
        app.register_blueprint(main)

    return app

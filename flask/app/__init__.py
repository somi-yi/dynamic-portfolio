from flask import Flask
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from flask_sqlalchemy import SQLAlchemy
from .routes import main
import os
import logging

def create_app():
    # Initialize Flask app
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
    from flask_cors import CORS 

    # Database configuration
    # app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
    #postgresql://portfoliopostgresql_user:kxidwi1UmTHDblZkwC8JAjuw9nB1MyjM@dpg-cp0k417jbltc73dv29f0-a.oregon-postgres.render.com/portfoliopostgresql
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ECHO'] = True
    db = SQLAlchemy()
    db.init_app(app)
    
    app.register_blueprint(main)

    return app

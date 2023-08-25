import uuid
import os
import mysql.connector
import sqlalchemy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from datetime import datetime
from dotenv import load_dotenv


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    otp = db.Column(db.Integer, nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    date_updated = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, email, password, otp):
        self.email = email
        self.password = password
        self.otp = otp

"""class VerificationCode(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    code = db.Column(db.String(6), nullable=False)

    user = db.relationship('User', backref=db.backref('verification_codes', lazy=True))
"""

class StorageEngine:
    def __init__(self, app):

        load_dotenv('./config.env')
        self.app = app
        self.db = db

        db_username = os.getenv('DB_USERNAME')
        db_password = os.getenv('DB_PASSWORD')
        db_name = os.getenv('DB_NAME')

        app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+mysqlconnector://{db_username}:{db_password}@localhost/{db_name}"
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

        self.db.init_app(app)
        with app.app_context():
            self.db.create_all()

    def save_user(self, email, password, otp):
        user = User.query.filter_by(email=email).first()
        if user is None:
            new_user = User(email=email, password=password, otp=otp)
            self.db.session.add(new_user)
            self.db.session.commit()

    def get_all_users(self):
        users = User.query.all()
        user_list = []
        for user in users:
            user_data = {
                'id': user.id,
                'email': user.email,
                'password': user.password,
                'date_created': user.date_created.strftime('%d-%m-%Y:%H:%M'),
                'date_updated': user.date_updated.strftime('%d-%m-%Y:%H:%M')
            }
            user_list.append(user_data)
        return user_list

    def delete_user(self, email):
        user = User.query.filter_by(email=email).first()
        if user:
            self.db.session.delete(user)
            self.db.session.commit()
            return True
        return False

    def modify_user(self, email, new_email, new_password):
        user = User.query.filter_by(email=email).first()
        if user:
            user.email = new_email
            user.password = new_password
            user.date_updated = datetime.utcnow()
            self.db.session.commit()
            return True
        return False




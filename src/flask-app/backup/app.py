import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request
#from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
import mysql.connector
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from flask_cors import CORS
from storage_engine import User, StorageEngine
import uuid
import bcrypt

app = Flask(__name__)

CORS(app, origins='http://localhost:3000')

#loads all .env files
load_dotenv()

db_username = os.getenv('DB_USERNAME')
db_password = os.getenv('DB_PASSWORD')
db_name = os.getenv('DB_NAME')

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+mysqlconnector://{db_username}:{db_password}@localhost/{db_name}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
engine = StorageEngine(app)

# ... Routes and other configurations ...
@app.route('/api/signin', methods=['POST'])
def signin():
    if request.method == 'POST':
        # Retrieve the email and password from the request data
        email = request.json.get('email')
        password = request.json.get('password')
        user = User.query.filter_by(email=email).first()

        # Perform the necessary login logic here
        # Validate the credentials, authenticate the user, etc.

        # Return a response indicating the result of the login
        #if valid_credentials(email, password):
    
    if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({
            'message': 'Signin successful',
            'status': 200,
            'ok': True
            })
    else:
        return jsonify({
            'message': 'Invalid credentials',
            'status': 401,
            'ok': False
            })

@app.route('/api/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        # Retrieve the email and password from the request data
        email = request.json.get('email')
        password = request.json.get('password')
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Perform the necessary login logic here
        # Validate the credentials, authenticate the user, etc.

        # Return a response indicating the result of the login
        #if valid_credentials(email, password):
        if (email != "" and hashed_password != ""):
            engine.save_user(email, hashed_password)
            return jsonify({
                'message': 'Signup successful',
                'status': 200,
                'ok': True
                })
        else:
            return jsonify({
                'message': 'Invalid credentials',
                'status': 410,
                'ok': False
                })


if __name__ == '__main__':
    app.run(debug=True)

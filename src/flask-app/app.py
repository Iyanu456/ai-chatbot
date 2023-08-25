import os
import bcrypt
import random
from flask import Flask, jsonify, request, redirect, render_template
from flask_cors import CORS
from storage_engine import User, StorageEngine
from Packages.auth import otp_gen, validate, encrypt
from Packages.send_mail import send_mail
from flask_mail import Mail, Message
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')

load_dotenv('./config.env')
        
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = os.getenv('MAIL_PORT')
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = 'pydev385@gmail.com'
app.config['MAIL_USE_TLS'] = True

engine = StorageEngine(app)

@app.route('/api/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        email = request.json.get('email')
        password = request.json.get('password')
        hashed_password = encrypt(password)
        otp = otp_gen()

        data = {
            "name": "Iyanuoluwa",
            "otp": otp            
        }

        if (email != "" and hashed_password != ""):
            engine.save_user(email, hashed_password, otp)
            send_mail(app, 'Welcome to Flasky!', email, 'index.html', data)
            return jsonify({
                'message': 'Signup successful',
                'redirectURL': '/otp',
                'status': 200,
                'ok': True
                }), 200
        else:
            return jsonify({
                'message': 'Invalid credentials',
                'status': 401,
                'ok': False
                }), 401


@app.route('/api/auth', methods=['POST'])
def authentication():
    if request.method == 'POST':
        email = request.json.get('email')
        otp = request.json.get('otp')
        user = User.query.filter_by(email=email).first()

        if user.otp == int(otp):
            return jsonify({
                'message': 'Auth successful',
                'redirectURL': '/mainpage',
                'status': 200,
                'ok': True
                }), 200
        else:
            return jsonify({
                'user': f"{user}",
                'message': 'Invalid otp',
                'status': 401,
                'ok': False
                }), 401



@app.route('/api/signin', methods=['POST'])
def signin():
    if request.method == 'POST':
        email = request.json.get('email')
        password = request.json.get('password')
        user = User.query.filter_by(email=email).first()

    if validate(user, password):
        send_mail(app, 'Welcome back to Flasky!', email, 'signin.html') 
        return jsonify({
            'message': 'Invalid credentials',
            'redirectURL': '/mainpage',
            'status': 200,
            'ok': True
            }), 200  
        

    else:
        return jsonify({
            'message': 'Invalid credentials',
            'status': 401,
            'ok': False
            }), 401



if __name__ == '__main__':
    app.run(debug=True)

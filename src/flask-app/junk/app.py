import os
import bcrypt
import random
from dotenv import load_dotenv
from flask import Flask, jsonify, request, redirect, render_template
from flask_cors import CORS
from flask_mail import Mail, Message
from storage_engine import User, StorageEngine

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')

#loads all .env files
load_dotenv('./config.env')

mail_server = os.getenv('MAIL_SERVER')
mail_port = os.getenv('MAIL_PORT')
mail_username = os.getenv('MAIL_USERNAME')
mail_password = os.getenv('MAIL_PASSWORD')
db_username = os.getenv('DB_USERNAME')
db_password = os.getenv('DB_PASSWORD')
db_name = os.getenv('DB_NAME')

app.config['MAIL_SERVER'] = mail_server
app.config['MAIL_PORT'] = mail_port
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = mail_username
app.config['MAIL_PASSWORD'] = mail_password
app.config['MAIL_DEFAULT_SENDER'] = 'pydev385@gmail.com'

app.config['CELERY_BROKER_URL'] = 'pyamqp://guest@localhost//'
app.config['CELERY_RESULT_BACKEND'] = 'rpc://'


engine = StorageEngine(app)
mail = Mail(app)


def generate_verification_code():
    return str(random.randint(100000, 999999))


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
        send_mail_async('Welcome', email, 'your data has been recieved')
            
        return redirect(f"http://localhost:3000/mainpage?data={email}"), 200
    else:
        send_mail_async('Invalid credenttials', email, 'your credentials are not valid')
        if mail_status:
            print(True)
        else:
            print(False)
        return jsonify({
            'user': f"{user}",
            'message': 'Invalid credentials',
            'status': 401,
            'ok': False
            }), 401

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
            send_mail_async.delay('Welcome', [email], 'your data has been recieved')
            return jsonify({
                'message': 'Signup successful',
                'status': 200,
                'ok': True
                }), 200
        else:
            send_mail_async.delay('Welcome', [email], 'your data has been recieved')
            return jsonify({
                'message': 'Invalid credentials',
                'status': 401,
                'ok': False
                }), 401


if __name__ == '__main__':
    app.run(debug=True)

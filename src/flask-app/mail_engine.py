import os
from flask import render_template
from flask_mail import Mail, Message
from dotenv import load_dotenv
from flask import copy_current_request_context

class Mail():
    def __init__(self, app):
        self.app = app
        
        load_dotenv('./config.env')
        
        app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
        app.config['MAIL_PORT'] = os.getenv('MAIL_PORT')
        app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
        app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
        app.config['MAIL_DEFAULT_SENDER'] = 'pydev385@gmail.com'
        app.config['MAIL_USE_TLS'] = True

        mail_instance = Mail(app)
    
    def send_mail(subject, email, template, max_attempts=3):
        attempt = 1
        while attempt <= max_attempts:
            with app.app_context():
                try:
                    #button_link = 'https://example.com/get-started'
                    #msg.html = render_template('email_template.html', recipient_name=recipient_name, button_link=button_link)
                    msg = Message(subject=subject, recipients=[email])
                    msg.html = render_template(template)
                    mail_instance.send(msg)
                    return True

                except Exception as e:
                    print(f"Failed to send email. Error: {str(e)}")
                    print(f"Attempt {attempt}/{max_attempts}")
                    attempt += 1

        return False


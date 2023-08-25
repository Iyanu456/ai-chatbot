from flask import copy_current_request_context, render_template
from flask_mail import Mail, Message

def send_mail(app, subject, email, template, data={}, max_attempts=3):

    """ sends asynchronous email
        retrys if email is not successfully sent """

    mail = Mail(app)
    attempt = 1
    while attempt <= max_attempts:
        with app.app_context():
            try:
                #button_link = 'https://example.com/get-started'
                #msg.html = render_template('email_template.html', recipient_name=recipient_name, button_link=button_link)
                msg = Message(subject=subject, recipients=[email])
                kwargs = {key: value for key, value in data.items()}
                msg.html = render_template(template, **kwargs)
                mail.send(msg)
                return True

            except Exception as e:
                print(f"Failed to send email. Error: {str(e)}")
                print(f"Attempt {attempt}/{max_attempts}")
                attempt += 1

    return False

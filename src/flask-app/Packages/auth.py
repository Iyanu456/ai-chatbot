import bcrypt
import random

def otp_gen():
    return str(random.randint(100000, 999999))

def validate(user, password):
    if user:
        if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            return True
        else:
            return False
    return False

def encrypt(password):
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed_password
import os
from flask import Flask , make_response , jsonify  , session, request
from flask_migrate import Migrate
from model import db, User, Event , Activity , Comment
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import CSRFProtect
from flask_bcrypt import Bcrypt
from sqlalchemy import MetaData
from flask_login import login_user, LoginManager, login_required, logout_user, current_user
from flask_cors import CORS
from flask_restful import Api, Resource
# from flask_jwt_extended import JWTManager, jwt_required, create_access_token , get_jwt_identity 

from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
import datetime
import bcrypt
# import jwt

# from jwt.exceptions import ExpiredSignatureError
from functools import wraps
app = Flask(__name__)
api = Api(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
migrate = Migrate(app,db,render_as_batch=True)



app.secret_key = b'"l\xa9\xe0w\x08\r#\xad\x8c\xb2\x88\x8b\xa9\x91\xa4'
app.config['SECRET_KEY'] = b'"l\xa9\xe0w\x08\r#\xad\x8c\xb2\x88\x8b\xa9\x91\xa4'
app.config['SESSION_TYPE'] = 'filesystem'  # You can choose other session types as well
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_KEY_PREFIX'] = 'myapp'
# app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET') # Change this!
# app.config["JWT_SECRET_KEY"] = b'"l\xa9\xe0w\x08\r#\xad\x8c\xb2\x88\x8b\xa9\x91\xa4'
# jwt = JWTManager(app)
 
# csrf = CSRFProtect(app)
CORS(app)

db.init_app(app)




@app.route("/")
def home():
    return "<h1>hello<h1>"

# def token_required(f):
#     @wraps(f)
#     def decorated(*args, **kwargs):
#         try:
#             jwt_required()  # This will handle token validation and expiration
#             current_user = User.query.filter_by(id=get_jwt_identity().first())
#             return f(current_user, *args, **kwargs)
#         except:
#             return jsonify({'message': 'Token is missing or invalid'}), 401

#     return decorated

class Signup(Resource):

    def get(self):
        user = [users.to_dict() for users in User.query.all()]
        return make_response(jsonify(user),201)

    def post(self):
        data = request.get_json()
        password = data["password"]
        username = data["username"]
        name = data['name']
        user = User.query.filter_by(username=username).first()
        if user is not None:
            return ({"error":"Please choose a diffrent Username." })
        if not data:
            return ({"message": "Invalid input"}), 400
        if len(password) < 7:
            return ({"error": "Password length must be at least 7 characters"})
        if not name:
            return ({"error": "Name is required"})
        salt = bcrypt.gensalt()
        password_hash = bcrypt.hashpw(password.encode("utf-8"), salt)

        new_user = User(
            name = name,
            username = username,
            _password_hash = password_hash

        )
        db.session.add(new_user)
        db.session.commit()
        
        session["user_id"] = new_user.id
        
        return new_user.to_dict()

api.add_resource(Signup, '/signup')



class Login(Resource):

    def get(self):
        user = [users.to_dict() for users in User.query.all()]
        return make_response(jsonify(user),201)

    def post(self):
        username = request.get_json()["username"]
        password = request.get_json()["password"]

        user = User.query.filter_by(username=username).first()
        if user:
            if user.authenticate( password ):
                session["user_id" ] = user.id
                return user.to_dict(), 200
            else:
                {"error" : ["INVALID EMAIL OR USERNAME"]}, 401

api.add_resource(Login, '/login')

class Logout(Resource):

    def delete(self):
        session['user_id'] = None
        return {'message': '204: No Content'}, 204

api.add_resource(Logout, '/logout')


class Events(Resource):
  
    def get(self):
        user = [users.to_dict() for users in Event.query.all()]
        return make_response(jsonify(user),201)
    


    def post(self):
        title = request.get_json()['title']
        description = request.get_json()["description"]
        date = request.get_json()['date']
        start_time = request.get_json()["start_time"]
        location = request.get_json()['location']
        image = request.get_json()["image"]
        user_id = request.get_json()["user_id"]


        

api.add_resource(Events, '/events')



class Users(Resource):
  
    def get(self):
        userss = [users.to_dict() for users in User.query.all()]
        return make_response(jsonify(userss),201)

api.add_resource(Users, '/user')



class Comments(Resource):
  
    def get(self):
        userss = [users.to_dict() for users in Comment.query.all()]
        return make_response(jsonify(userss),201)
    

    def post(self):
        text = request.get_json()['text']
        user_id = request.get_json()['user_id']
        event_id = request.get_json()["event_id"]


        if len(text) <= 1:
            return {"error": "Comment text must be longer than 1 character."}, 400

        new_Comment = Comment(
            text = text,
            user_id = user_id,
            event_id = event_id
        )
        db.session.add(new_Comment)
        db.session.commit()

        return new_Comment.to_dict(), 201
api.add_resource(Comments, '/comments')

if __name__ == "__main__":
    app.run(port=5555, debug=True)



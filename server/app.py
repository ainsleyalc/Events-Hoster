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
from flask_restful import reqparse
import datetime
# from flask_jwt_extended import JWTManager, jwt_required, create_access_token , get_jwt_identity 

from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
import datetime
import bcrypt
import re
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
        titles= request.get_json()['title']
        descriptions = request.get_json()["description"]
        data = request.json
        
        start_times = request.get_json()["start_time"]
        locations = request.get_json()['location']
        images = request.get_json()["image"]
        user_ids = request.get_json()["user_id"]
        parsed_date = datetime.datetime.strptime(data['date'], '%Y-%m-%d').date()  # Use datetime.datetime here
        parsed_start_time = datetime.datetime.strptime(data['start_time'], '%I:%M %p').time()  # Use datetime.datetime here
        new_event = Event(
            title = titles,
            description = descriptions,
            date = parsed_date,
            start_time = parsed_start_time,
            location = locations,
            image = images,
            user_id = user_ids)
        db.session.add(new_event)
        db.session.commit()

        return new_event.to_dict()
    


   



api.add_resource(Events, '/events')

class EventById(Resource):
    def get(self, event_id):
        event = Event.query.filter_by(id=event_id).first()
        if not event:
            return {"message": "Event not found"}, 404
        return event.to_dict(), 200

    def patch(self, event_id):
        event = Event.query.filter_by(id = event_id).first()
        if not event:
            return {"message": "Event not found"}, 404

        parser = reqparse.RequestParser()
        parser.add_argument("title", type=str, required=False)
        parser.add_argument("description", type=str, required=False)
        parser.add_argument("date", type=str, required=False)
        parser.add_argument("start_time", type=str, required=False)
        parser.add_argument("location", type=str, required=False)
        parser.add_argument("image", type=str, required=False)
        # Add more arguments for other attributes


        def is_valid_date(date_str):
            try:
                datetime.datetime.strptime(date_str, '%Y-%m-%d')
                return True
            except ValueError:
                return False



        args = parser.parse_args()

        if args["title"]:
            event.title = args["title"]
        if args["description"]:
            event.description = args["description"]
        if args["date"]:
            if not is_valid_date(args["date"]):
                return {"error": "Invalid date format"}, 400
            event.date = datetime.datetime.strptime(args["date"], '%Y-%m-%d').date()
        if args["start_time"]:
          
            start_time_str = args["start_time"]
            if not re.search(r'\b(?:AM|PM)\b', start_time_str, re.IGNORECASE):
                return {"error": "Time must include AM or PM"}, 400

            start_time = datetime.datetime.strptime(start_time_str, '%I:%M %p').time()
            event.start_time = start_time
        if args["location"]:
            event.location = args["location"]
        if args["image"]:
            event.image = args["image"]
        # Update other attributes as needed

        db.session.commit()

        return event.to_dict(), 200

api.add_resource(EventById, "/events/<int:event_id>")


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
    


    def delete(self):
         user_id = request.get_json()['user_id']
         comment_id = request.get_json()['comment_id']

         
         commentToDelete = Comment.query.filter(Comment.id == comment_id).first()

         if not (str(commentToDelete.user_id) == str(user_id)) :
             return {"error": "Must be your comment to delete"}
         db.session.delete(commentToDelete)
         db.session.commit()
         return "its been deleted"
api.add_resource(Comments, '/comments')

if __name__ == "__main__":
    app.run(port=5555, debug=True)



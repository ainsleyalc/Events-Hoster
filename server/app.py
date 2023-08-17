import os
from flask import Flask , make_response , jsonify  , session, request
from flask_migrate import Migrate
from model import db, User, Event , Activity
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import CSRFProtect
from flask_bcrypt import Bcrypt
from sqlalchemy import MetaData
from flask_login import login_user, LoginManager, login_required, logout_user, current_user
from flask_cors import CORS
from flask_restful import Api, Resource
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
app = Flask(__name__)
api = Api(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
migrate = Migrate(app,db,render_as_batch=True)



app.secret_key = b'"l\xa9\xe0w\x08\r#\xad\x8c\xb2\x88\x8b\xa9\x91\xa4'
app.config['SESSION_TYPE'] = 'filesystem'  # You can choose other session types as well
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_KEY_PREFIX'] = 'myapp'
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET') # Change this!
jwt = JWTManager(app)

# csrf = CSRFProtect(app)
CORS(app)

db.init_app(app)




@app.route("/")
def home():
    return "<h1>hello<h1>"



class Signup(Resource):

    def get(self):
        user = [users.to_dict() for users in User.query.all()]
        return make_response(jsonify(user),201)

    def post(self):
        data = request.get_json()
        if not data:
            return jsonify({"message": "Invalid input"}), 400
        
        new_user = User(
            name = data['name'],
            username = data['username'],
            password = data['password']

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
        username = request.json.get("username", None)
        password = request.json.get("password", None)
        if username != "test" or password != "test":
            return jsonify({"msg": "Bad username or password"}), 401

        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token)

api.add_resource(Login, '/login')

class Logout(Resource):

    def delete(self): # just add this line!
        session['user_id'] = None
        return {'message': '204: No Content'}, 204

api.add_resource(Logout, '/logout')










if __name__ == "__main__":
    app.run(port=5555, debug=True)



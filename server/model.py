from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String 
from flask_login import  UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import  FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.ext.hybrid import hybrid_property
import bcrypt
convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}
metadata = MetaData(naming_convention=convention)
db = SQLAlchemy(metadata=metadata)


class User(db.Model, UserMixin, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    username = db.Column(db.String(20), nullable=False, unique=True)
    _password_hash = db.Column(db.String(20), nullable=False)
    date_signed = db.Column(db.DateTime, default=datetime.utcnow)
    events = db.relationship('Event', backref='user', lazy=True)


    serialize_rules = ('-events',)
    @validates('name', 'username',)
    def validates_attributes(self, key, value):
        if key == 'name' and not value:
            raise ValueError("Name is required")
        elif key == 'username' and not value and len():
            raise ValueError("Username is required")
        elif len(value) <= 3:
                raise ValueError("Username must be more than 5 characters")
        return value


    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        if type( password ) is str and len(password) in range(7,20):
            password_hash = bcrypt.generate_password_hash(password.encode("utf-8"), salt)
            self._password_hash = password_hash.decode("utf-8")
        else:
            print("invalid password")
    def authenticate(self , password):
        return bcrypt.checkpw(password.encode("utf-8"), self._password_hash)

    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     # Validate attributes during instance initialization
    #     self.validates_attributes("name", self.name)
    #     self.validates_attributes("username", self.username)

class Event(db.Model, SerializerMixin):
    __tablename__ = "events"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    date = db.Column(db.Date)
    start_time = db.Column(db.Time)
    location = db.Column(db.String)
    image = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    activities = db.relationship('Activity', secondary='event_activity_association', backref='events', lazy='dynamic')
    comments = db.relationship('Comment', backref='event', lazy=True)


    serialize_rules = ('-activities', "-comments",)
class Activity(db.Model, SerializerMixin):
    __tablename__ = "activitys"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    outdoor = db.Column(db.Boolean)


event_activity_association = db.Table('event_activity_association',
    db.Column('event_id', db.Integer, db.ForeignKey('events.id')),
    db.Column('activity_id', db.Integer, db.ForeignKey('activitys.id'))
)

class Comment(db.Model, SerializerMixin):
    __tablename__ = "comments"
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
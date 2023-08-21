
from datetime import datetime
from sqlalchemy.orm import sessionmaker
from model import db, User, Event, Activity, Comment, event_activity_association
from app import app
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from faker import Faker
# Configure the database connection
from datetime import time
import random


fake = Faker()


def delete_records():
        User.query.delete()
        Activity.query.delete()
        Event.query.delete()
        Comment.query.delete()
        db.session.query(event_activity_association).delete()
        db.session.commit()

def create_sample_data():
    with app.app_context():
        for _ in range(10):
            user = User(
                name=fake.name(),
                username=fake.user_name(),
                password_hash=fake.password(),
            )
            db.session.add(user)
        db.session.commit()

        # Create 10 different events
        events = []
        users = User.query.all()  # Retrieve all users from the database
        for _ in range(10):
            user = random.choice(users)  # Choose a random user from the list
            event = Event(
                title=fake.sentence(),
                description=fake.paragraph(),
                date=fake.date_this_year(),
                start_time=time(fake.random_int(min=0, max=23), fake.random_int(min=0, max=59)),
                location=fake.city(),
                image=fake.image_url(),
                user_id=user.id  # Associate event with the selected user
            )
            events.append(event)
            db.session.add(event)
        db.session.commit()
       # Create 10 different activities
        activities = []
        for _ in range(10):
            activity = Activity(name=fake.word(), outdoor=fake.boolean())
            activities.append(activity)
            db.session.add(activity)
        db.session.commit()

        # Associate activities with events
        for i, event in enumerate(events):
            activity = activities[i % len(activities)]
            event.activities.append(activity)
        db.session.commit()

        # Create 10 more comments
        users = User.query.all()
        events = Event.query.all()
        for _ in range(10):
            userss = random.choice(users)
            eventss = random.choice(events)
            comment = Comment(
                text=fake.sentence(),
                user_id=userss.id,
                event_id=eventss.id
            )
            db.session.add(comment)
        db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        delete_records()
        create_sample_data()

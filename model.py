from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

db = SQLAlchemy()

class Show(db.Model):
    """A table for registered shows"""

    __tablename__ = "shows"

    show_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    company_id = db.Column(db.Integer, db.ForeignKey("companies.company_id"))
    title = db.Column(db.String(100), nullable=False)
    opening_night = db.Column(db.Date, nullable=False)
    closing_night = db.Column(db.Date, nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=True)
    image = db.Column(db.Text, unique=True)

    """Relationship to Company Table"""
    company = db.relationship("Company", backref="shows")
    
    """Relationship to Headshot Table"""
    headshots = db.relationship("Headshot", backref="shows")

    """Relationship to Bio Table"""
    bios = db.relationship("Bio", backref="shows")


    def __repr__(self):
        return f'<Show show_id={self.show_id} title={self.title}>'

class User(db.Model):
    """A table for all registered users"""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fname = db.Column(db.String(50), nullable=False)
    lname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password_hash = db.Column(db.String(200))

    """Function to hash user password for DB"""
    def hash_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    """Function to check password hash for login authentication"""
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    

    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'


class Cast(db.Model):
    """A table to hold all Users connected to One Show"""

    __tablename__ = "casts"

    cast_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    show_id = db.Column(db.Integer, db.ForeignKey("shows.show_id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    role = db.Column(db.String(50))
    admin = db.Column(db.Boolean, nullable=False, default=False)

    """Relationship to User Table"""
    user = db.relationship("User", backref="cast")

    """Relationship to Show Table"""
    shows = db.relationship("Show", backref="cast")


    def __repr__(self):
        return f'<Cast show_id={self.show_id}, user_id={self.user_id}, admin={self.admin}>'

class Company(db.Model):
    """A table for Company Information"""

    __tablename__="companies"

    company_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(200), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    zip_code = db.Column(db.String(25), nullable=False)
    theater_name = db.Column(db.String)
    website = db.Column(db.Text)
    logo = db.Column(db.Text)

    #shows = an array of Shows associated with Company

    def __repr__(self):
        return f'<Company company_id={self.company_id} name={self.name} city={self.city}>'


class Bio(db.Model):
    """A table to store User Bios"""

    __tablename__="bios"

    bio_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    show_id = db.Column(db.Integer, db.ForeignKey('shows.show_id'), nullable=False)
    pending = db.Column(db.Boolean, nullable=False, default=True)
    bio = db.Column(db.Text, nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=True)
    
    """Relationship to User Table"""
    user = db.relationship("User", backref="bios")


    def __repr__(self):
        return f'<Bio bio_id={self.bio_id} user_id={self.user_id} show_id = {self.show_id}>'


class Headshot(db.Model):
    """A table to store User Headshots"""

    __tablename__="headshots"
    
    headshot_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    show_id = db.Column(db.Integer, db.ForeignKey('shows.show_id'), nullable=False)
    pending = db.Column(db.Boolean, nullable=False, default=True)
    img = db.Column(db.Text, nullable=False, unique=True)
    active = db.Column(db.Boolean, nullable=False, default=True)

    # """Relationship to User Table"""
    user = db.relationship("User", backref="headshots")


    def __repr__(self):
        return f'<Headshot headshot_id={self.headshot_id} user_id={self.user_id} show_id={self.show_id}>'


def connect_to_db(flask_app, db_uri='postgresql:///playbillApp', echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)
    db.create_all()
    print("Connected to the db!")

if __name__ == "__main__":
    from server import app

    connect_to_db(app)


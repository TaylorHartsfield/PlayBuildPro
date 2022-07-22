from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import password_hash, check_password_hash

db = SQLAlchemy()

class Show(db.Model):
    """A table for registered shows"""

    __tablename__ = "shows"

    show_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    opening_night = db.Column(db.Date)
    closing_night = db.Column(db.Date)

    """Relationship to Cast Table"""
    cast = db.relationship("Cast", back_populates("show"))
    
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

    """Relationship to Cast Table"""
    cast = db.Relationship("Cast", back_populates="user")

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
    cast_id = db.Column(db.Integer, primary_key=True)
    show_id = db.Column(db.Integer, db.ForeignKey("shows.show_id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    role = db.Column(db.String(50))
    admin = db.Column(db.Boolean, nullable=False)

    """Relationship to User Table"""
    user = db.relationship("User", back_populates="cast")

    """Relationship to Show Table"""
    show = db.relationship("Show", back_populates="cast")


    def __repr__(self):
        return f'<Cast '





from cloudinary import CloudinaryImage
import cloudinary.uploader
import os
from datetime import datetime
import model
from model import db
CLOUDINARY_KEY = os.environ['API_KEY']
CLOUDINARY_SECRET = os.environ['API_SECRET']
CLOUD_NAME = os.environ['CLOUD_NAME']
CLOUDINARY_URL= os.environ['CLOUDINARY_URL']

"""All Show Functions"""


def register_new_show(title, opening_night, closing_night, theater_name):
    
    new_show = model.Show(
                        title=(title.title()), 
                        opening_night=opening_night,
                        closing_night=closing_night,
                        theater_name=(theater_name.title()))

    return new_show

def get_show_by_id(show_id):

    return model.Show.query.get(show_id)



def check_for_user_in_show(user, show_id):

    show = get_show_by_id(show_id)
    
    for user_show in user.cast:
        
        if user_show.show_id == show.show_id:
            return True

    return False

def update_show_image(show_id, image):

    show = get_show_by_id(show_id)
    show.image = image
    model.db.session.commit()

    return show


def archive_show(show_id):

    show = get_show_by_id(show_id)
    show.active = not show.active
    model.db.session.commit()
    return show

def search_shows(title):
   
    shows = model.Show.query.filter_by(title=title).all()

    return shows

"""All Company Functions"""

def register_new_company(name, city, state, zip_code):

    new_company = model.Company(
                                name=name.title(),
                                city=city.title(),
                                state=state.capitalize(),
                                zip_code=zip_code)
                                

    
    return new_company

def get_company_by_name_city_state(name, city, state):

    company = model.Company.query.filter_by(
                                    name=name.title(), 
                                    city=city.title(), 
                                    state=state.title()).first()
    return company


"""All User Functions"""

def create_user(fname, lname, email):

    user = model.User(  
                    fname=fname.title(),
                    lname=lname.title(),
                    email=email)
    
    return user

def get_user_by_email(email):
    
    user = model.User.query.filter_by(email=email).first()

    return user

def is_admin(show_id, user):

    admin = model.Cast.query.filter_by(show_id = show_id, admin=True).all()
    for admin_account in admin:
        if admin_account.user_id == user.user_id:
            return True
    
    return False

def get_role(show, user):
    
    for shows in user.cast:
        if shows.show_id == show.show_id:
            return shows.role

"""All Cast Functions"""

def get_cast_by_show_id(show_id):

    show = get_show_by_id(show_id)
    cast = model.Cast.query.filter_by(show_id=show.show_id).all()

    return cast

def add_to_cast(role, admin):

    new_cast_member = model.Cast(
                                role=role.title(),
                                admin=admin)
    
    return new_cast_member

def update_actor(user_id, new_role, show_id):
    
    actor = model.User.query.get(user_id)
    show = get_show_by_id(show_id)
    
    for cast in actor.cast:    
        if show.show_id == cast.show_id:
            cast.role = new_role
            model.db.session.commit()
           

    return actor


def remove_from_cast(user_id, show_id):

    actor = model.Cast.query.filter_by(user_id=user_id, show_id=show_id).first()
    headshot = model.Headshot.query.filter_by(user_id=user_id, show_id=show_id).first()
    bio = model.Bio.query.filter_by(user_id=user_id, show_id=show_id).first()
    model.db.session.delete(actor)
    model.db.session.delete(headshot)
    model.db.session.delete(bio)
    model.db.session.commit()
    
    return
"""Headshot Functions"""

def add_new_headshot(img):

    headshot = model.Headshot(
                            img=img)
    
    return headshot


def update_headshot(current_headshot, new_headshot, user, show):
    print(current_headshot.user_id)

    upload_new_headshot = cloudinary.uploader.upload(new_headshot,
                                        api_key=CLOUDINARY_KEY,
                                        api_secret=CLOUDINARY_SECRET,
                                        cloud_name=CLOUD_NAME,
                                        eager = [{"aspect_ratio":"1:1",
                                                    "gravity": "face",
                                                    "height":150, 
                                                    "zoom": "0.75",
                                                    "crop":"thumb"}])

  
    new_headshot_url = upload_new_headshot['eager'][0]['url']

    if current_headshot == None:
        current_headshot = add_new_headshot(new_headshot_url)
        model.db.session.add(current_headshot)
        current_headshot.user_id = user.user_id
        current_headshot.show_id = show.show_id
        model.db.session.commit()
        return current_headshot

    current_headshot.img = new_headshot_url
    print(current_headshot.user_id)
    current_headshot.pending = True
    model.db.session.commit()
   
    return current_headshot


def approve_headshot_to_publish(headshot_id):

    headshot = model.Headshot.query.get(headshot_id)
    headshot.pending = False
    model.db.session.commit()

    return headshot


def get_user_headshot_for_show(user, show):

    for headshot in user.headshots:
        
        if headshot.show_id == show.show_id:
            return headshot

    return None

"""Bio Functions"""

def add_bio(bio):

    new_bio = model.Bio(
                    bio=bio)
    
    return new_bio


def update_bio(bio, update):

    if bio == None:
       new_bio = add_bio(update)
       db.model.session.add(new_bio)
       return new_bio
       
    bio.bio = update
    bio.pending = True
    model.db.session.add(bio)
    return bio


def approve_bio_to_publish(bio_id):

    bio = model.Bio.query.get(bio_id)
    bio.pending = False
    model.db.session.commit()

    return bio


def get_user_bio_for_show(user, show):

    for bio in user.bios:
        if bio.show_id == show.show_id:
            return bio
            
    return None
    


"""Admin Functions"""

def new_submissions(show):

    for headshot in show.headshots:
        for role in headshot.user.cast:
            if show.show_id == role.show_id and role.role != "Admin" and headshot.pending == True and headshot.img != "/static/img/download.png":
                return True
    
    for bio in show.bios:
        for role in bio.user.cast:
            if show.show_id == role.show_id and role.role != "Admin" and bio.pending == True and bio.bio != "No Bio Submitted":
                return True
    
    return False


def waiting_on_submissions(show):

    for headshot in show.headshots:
        for role in headshot.user.cast:
            if show.show_id == role.show_id and role.role != "Admin" and headshot.pending == True and headshot.img == "/static/img/download.png":
                return True
    
    for bio in show.bios:
        for role in bio.user.cast:
            if show.show_id == role.show_id and role.role != "Admin" and bio.pending == True and bio.bio == "No Bio Submitted":
                return True
    
    return False








import model

"""All Show Functions"""


def register_new_show(title, opening_night, closing_night):
    
    new_show = model.Show(
                        title=title, 
                        opening_night=opening_night,
                        closing_night=closing_night)
    
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


def archive_show(show_id, user_id):

    if is_admin:
        show.active = False
        model.db.session.commit()
        return show
    
    return False

"""All Company Functions"""

def register_new_company(name, theater_name, city, state, zip_code, website, logo):

    new_company = model.Company(
                                name=name,
                                theater_name=theater_name,
                                city=city,
                                state=state,
                                zip_code=zip_code,
                                website=website,
                                logo=logo)

    
    return new_company

def get_company_by_name_city_state(name, city, state):

    company = model.Company.query.filter_by(
                                    name=name, 
                                    city=city, 
                                    state=state).first()
    return company


"""All User Functions"""

def get_user_by_email(email):
    
    user = model.User.query.filter_by(email=email).first()

    return user

def get_user_by_id(user_id):

    user = model.User.query.get(user_id)

    return user

def is_admin(show_id, user_id=0):

    admin = model.Cast.query.filter_by(show_id = show_id, admin=True).all()
    for admin_account in admin:
        if admin_account.user_id == user_id:
            return True
    
    return False



"""All Cast Functions"""

def get_cast_by_show_id(show_id):

    show = get_show_by_id(show_id)
    cast = model.Cast.query.filter_by(show_id=show.show_id).all()

    return cast

def add_to_cast(role, admin):

    new_cast_member = model.Cast(
                                role=role,
                                admin=admin)
    
    return new_cast_member


"""Headshot Functions"""

def add_new_headshot(img):

    headshot = model.Headshot(
                            img=img)
    
    return headshot


def add_headshot_to_show(headshot_id, show_id):
    
    show = get_show_by_id(show_id)
    headshot = model.Headshot.query.get(headshot_id)

    for headshots in show.headshots:
        if headshot.user_id == headshots.user_id:
            headshots.show_id = None
            headshots.pending = True

    headshot.show_id = show_id
    model.db.session.add(headshot)
    model.db.session.commit()

    return headshot

#Can I set this to return FALSE if an error occured?
def archive_headshot(headshot_id):

    headshot = model.Headshot.query.get(headshot_id)
    headshot.active = False
    model.db.session.commit()

    return True


#Can I set this to return FALSE if an error occured?
def delete_headshot(headshot_id):

    headshot = model.Headshot.query.get(headshot_id)
    model.db.session.delete(headshot)
    model.db.session.commit()

    return True


def approve_headshot_to_publish(headshot_id):

    headshot = model.Headshot.query.get(headshot_id)
    headshot.pending = False
    model.db.session.commit()

    return headshot


"""Bio Functions"""

def add_bio(bio):

    bio = model.Bio(
                    bio=bio)
    
    return bio


def add_bio_to_show(bio_id, show_id):
    
    show = get_show_by_id(show_id)
    bio=model.Bio.query.get(bio_id)

    for bios in show.bios:
      
        if bios.user_id == bio.user_id:
            bios.show_id = None
            bios.pending = True

    bio.show_id = show_id
    model.db.session.add(bio)
    model.db.session.commit()

    return bio


def archive_bio(bio_id):

    bio = model.Bio.query.get(bio_id)
    bio.active = False
    bio.pending = True
    model.db.session.commit()

    return bio


def update_bio(bio_id, update):

    bio = model.Bio.query.get(bio_id)
    bio.bio = update
    bio.pending = True
    model.db.session.commit()

    return bio


def delete_bio(bio_id):

    bio = model.Bio.query.get(bio_id)
    model.db.session.delete(bio)
    model.db.session.commit()

    return True


def approve_bio_to_publish(bio_id):

    bio = model.Bio.query.get(bio_id)
    bio.pending=False
    model.db.session.commit()

    return bio

    






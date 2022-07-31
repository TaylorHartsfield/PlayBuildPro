import model


def register_new_show(title, opening_night, closing_night):
    
    new_show = model.Show(
                        title=title, 
                        opening_night=opening_night,
                        closing_night=closing_night)
    
    return new_show

def get_show_by_id(show_id):

    return model.Show.query.get(show_id)

def register_new_company(name, city, state, zip_code, website, logo):

    new_company = model.Company(
                                name=name,
                                city=city,
                                state=state,
                                zip_code=zip_code,
                                website=website,
                                logo=logo)

    
    return new_company

def add_to_cast(role, admin):

    new_cast_member = model.Cast(
                                role=role,
                                admin=admin)
    
    return new_cast_member

def check_for_user_in_show(user, show_id):

    show = get_show_by_id(show_id)
    
    for user_show in user.cast:
        if user_show.show_id == show.show_id:
            return True

    return False

def get_user_by_email(email):
    
    user = model.User.query.filter_by(email=email).first()

    return user

def get_user_by_id(user_id):

    user = model.User.query.get(user_id)

    return user

def get_company_by_name_city_state(name, city, state):

    company = model.Company.query.filter_by(
                                    name=name, 
                                    city=city, 
                                    state=state).first()
    return company


def get_show_by_id(show_id):

    show = model.Show.query.get(show_id)

    return show


def get_cast_by_show_id(show_id):

    show = get_show_by_id(show_id)
    cast = model.Cast.query.filter_by(show_id=show.show_id).all()

    return cast


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

    headshot.show_id = show_id
    model.db.session.add(headshot)
    model.db.session.commit()

    return headshot


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

    bio.show_id = show_id
    model.db.session.add(bio)
    model.db.session.commit()

    return bio





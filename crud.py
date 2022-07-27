import model


def register_new_show(title, opening_night, closing_night):
    
    new_show = model.Show(
                        title=title, 
                        opening_night=opening_night,
                        closing_night=closing_night)
    
    return new_show


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

def get_user_by_email(email):
    
    user = model.User.query.filter_by(email=email).first()

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



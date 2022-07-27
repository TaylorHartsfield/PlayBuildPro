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


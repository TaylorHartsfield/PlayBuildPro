from flask import Flask, render_template, request, redirect, flash, session
import model
import crud
from datetime import datetime, date
import cloudinary.uploader
import os

app = Flask(__name__)
CLOUDINARY_KEY = os.environ['API_KEY']
CLOUDINARY_SECRET = os.environ['API_SECRET']
CLOUD_NAME = os.environ['CLOUD_NAME']
app.secret_key='test'

@app.route('/')
def homepage():
    return render_template('homepage.html')

@app.route('/login')
def login_page():
    return render_template("login.html")


@app.route('/login', methods=["POST"])
def user_login():
    
    #Grab email input and check DB for existing user
    email = request.form.get("email_input")
    user = model.User.query.filter_by(email=email).first()

    #Check password by using the hash method defined in the User class
    #if password entry is correct, redirect user to their profile
    #otherwise, ask them to sign in again
    if user:
        password = request.form.get("password_input")
        if user.check_password(password):
            flash(f'Break a leg, {user.fname}!')
            session['user'] = user.user_id
            return redirect(f'/user_profile/{user.user_id}')
        else:
            flash('Incorrect Password. Please Try again.')
            return redirect('/login')
    flash('Please register!')
    return redirect('/register_user')


@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

@app.route('/register_user')
def register_user_form():
    """Route to render the new user registration form"""
    return render_template("register_user.html")


@app.route('/register_user', methods=["POST"])
def register_user():
    """Route to register a new user"""

    #Use value of email input to query DB for existing user
    email = request.form.get("email")
    user_exists = model.User.query.filter_by(email=email).first()

    #Redirect user to login page if they are already a registered user
    if user_exists != None:
        flash("You are already registered. Please login.", category='error')
        return redirect('/login')

    #Create new user entry from remaining form values
    fname = request.form.get("fname")
    lname = request.form.get("lname")

    new_user = model.User(fname=fname, lname=lname, email=email)
    #call hash_password method to hash password before commiting to DB
    new_user.hash_password(request.form.get("password"))

    #add and commit new user to the DB
    model.db.session.add(new_user)
    model.db.session.commit()
    
    #create session for user
    session['user'] = new_user.user_id

    #Redirect user to their profile page
    flash(f'Break a leg, {fname}!', category='success')
    return redirect(f'/user_profile/{new_user.user_id}')


@app.route('/register_show')
def register_show_form():

    return render_template("register_show.html")


@app.route('/register_show', methods=["POST"])
def register_show():
    """A route to register a new show"""

    """Get Company Information from Form"""
    company_name = request.form.get("company_name")
    city = request.form.get("city")
    state = request.form.get("state")
    zip_code = request.form.get("zip_code")
    website = request.form.get("website")
    logo = request.form.get("logo")

    """Get Show Information from Form"""
    title = request.form.get("title")
    opening_night = date.fromisoformat(request.form.get("opening_night"))
    closing_night = date.fromisoformat(request.form.get("closing_night"))

    
    """Check if Company is already registered in DB"""
    company_exists = crud.get_company_by_name_city_state(company_name, city, state)
    print(company_exists)

    if not company_exists:
        new_company = crud.register_new_company(company_name, city, state, zip_code, website, logo)
        model.db.session.add(new_company)
        model.db.session.commit()
        print(new_company)
      
        new_show = crud.register_new_show(title, opening_night, closing_night)
        new_show.company_id = new_company.company_id
        model.db.session.add(new_show)
        model.db.session.commit()
        flash('Show registered!')
        return redirect('/register_show')


    if company_exists:

        for show in company_exists.shows:
            if show.title == title and show.opening_night == opening_night:   
                print(show)        
                flash(f'This show is already registered with {company_exists.name}!')
                return redirect('/register_show')


        new_show = crud.register_new_show(title, opening_night, closing_night)
        new_show.company_id = company_exists.company_id
        model.db.session.add(new_show)
        model.db.session.commit()
        flash('Show registered!')
        for show in company_exists.shows:
            print(show.opening_night)
            print(show.title)
        print(company_exists.shows)
        return redirect('/register_show')


@app.route('/user_profile/<user_id>')
def user_profile(user_id):
    """A route to a user's profile"""

    #Grab user from DB by querying PK with user_id arguement
    user = model.User.query.get(user_id)
    return render_template("user_profile.html", user=user)


@app.route('/cast/<show_id>')
def cast(show_id):
    cast = crud.get_cast_by_show_id(show_id)
    show = crud.get_show_by_id(show_id)

    return render_template("add_cast.html", show=show, cast=cast)
    


@app.route('/cast/<show_id>', methods=["POST"])
def add_cast(show_id):

    cast = crud.get_cast_by_show_id(show_id)
    show = crud.get_show_by_id(show_id)
    user = crud.get_user_by_email(request.form.get("email"))

    role = request.form.get("role")
    admin = request.form.get("admin")
    if admin != None:
        admin = True

    if user:
        new_cast = crud.add_to_cast(role, admin)
        new_cast.show_id = show.show_id
        new_cast.user_id = user.user_id
        model.db.session.add(new_cast)
        model.db.session.commit()
        flash(f'{user.fname}, added to cast!')
        return redirect(f'/cast/{show.show_id}')

    flash('User does not exist')
    return render_template("add_cast.html", show=show, cast=cast)

@app.route('/add_headshot/<user_id>', methods=["POST"])
def add_headshot(user_id):
   
    headshot = request.files['headshot']
    
    image = cloudinary.uploader.upload(headshot,
                                        api_key=CLOUDINARY_KEY,
                                        api_secret=CLOUDINARY_SECRET,
                                        cloud_name=CLOUD_NAME)
  
    img_url = image['secure_url']

    headshot = crud.add_new_headshot(img_url)

    model.db.session.add(headshot)
    headshot.user_id = user_id
    model.db.session.commit()
    
    return redirect(f"/user_profile/{headshot.user_id}")


@app.route('/add_headshot_to_show/', methods=["POST"])
def add_headshot_to_show():
    
    [show_id, headshot_id] = request.form.get('showPicker').split(" ")
    headshot = crud.add_headshot_to_show(headshot_id, show_id)

    flash(f'Headshot sent to {headshot.shows.title} for publishing!')
    return redirect(f'/user_profile/{headshot.user_id}')

@app.route('/add_bio/<user_id>', methods=["POST"])
def add_bio(user_id):

    bio = request.form.get('bio')

    bio = crud.add_bio(bio)
    model.db.session.add(bio)
    bio.user_id = user_id
    model.db.session.commit()

    return redirect(f'/user_profile/{bio.user_id}')


@app.route('/add_bio_to_show', methods=["POST"])
def add_bio_to_show():
    
    [show_id, bio_id] = request.form.get('showPicker').split(" ")

    bio = crud.add_bio_to_show(bio_id, show_id)
   
    flash(f'Bio sent to {bio.shows.title} for publishing!')
    return redirect(f'/user_profile/{bio.user_id}')


if __name__ == "__main__":
    model.connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
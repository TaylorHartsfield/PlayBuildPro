from flask import Flask, render_template, request, redirect, flash
import model
import crud
from datetime import datetime, date
import os

app = Flask(__name__)
app.secret_key='test'

@app.route('/')
def homepage():
    return render_template('base.html')

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
            return redirect(f'/user_profile/{user.user_id}')
        else:
            flash('Incorrect Password. Please Try again.')
            return redirect('/login')
    flash('Please register!')
    return redirect('/register_user')

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

    new_user = User(fname=fname, lname=lname, email=email)
    #call hash_password method to hash password before commiting to DB
    new_user.hash_password(request.form.get("password"))

    #add and commit new user to the DB
    model.db.session.add(new_user)
    model.db.session.commit()
    
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
                flash(f'This show is already registered with {company_exists.name}!')
                return redirect('/register_show')

            else:
                new_show = crud.register_new_show(title, opening_night, closing_night)
                new_show.company_id = company_exists.company_id
                model.db.session.add(new_show)
                model.db.session.commit()
                flash('Show registered!')
                print(company_exists.shows)
                return redirect('/register_show')



@app.route('/user_profile/<user_id>')
def user_profile(user_id):
    """A route to a user's profile"""

    #Grab user from DB by querying PK with user_id arguement
    user = User.query.get(user_id)
    return render_template("user_profile.html", user=user)

if __name__ == "__main__":
    model.connect_to_db(app)
    app.run(debug=True)
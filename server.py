from flask import Flask, render_template, request, redirect, flash
from model import db, connect_to_db, User
import os

app = Flask(__name__)
app.secret_key=os.environ.get('SECRET_KEY')

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
    user = User.query.filter_by(email=email).first()

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
    user_exists = User.query.filter_by(email=email).first()

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
    db.session.add(new_user)
    db.session.commit()
    
    #Redirect user to their profile page
    flash(f'Break a leg, {fname}!', category='success')
    return redirect(f'/user_profile/{new_user.user_id}')


@app.route('/register_show')
def register_show_form():
    return render_template("register_show.html")


@app.route('/register_show', methods=["POST"])
def register_show():
    pass



@app.route('/user_profile/<user_id>')
def user_profile(user_id):
    """A route to a user's profile"""

    #Grab user from DB by querying PK with user_id arguement
    user = User.query.get(user_id)
    return render_template("user_profile.html", user=user)

if __name__ == "__main__":
    connect_to_db(app)
    app.run(debug=True)
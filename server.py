from flask import Flask, render_template, request, redirect, flash
from model import db, connect_to_db, User
import os

app = Flask(__name__)
app.secret_key=os.environ
print(os.environ)
def homepage():
    return render_template('base.html')

@app.route('/login')
def login():
    return redirect('/user_profile/1')

@app.route('/register_user', methods=["GET", "POST"])
def register_user():
    """Route to register a new user"""

    if request.method == 'GET':
        return render_template("register_user.html")
    
    #Get email input to query DB for existing user
    email = request.form.get("email")

    email_exists = User.query.filter_by(email=email).first()
    print(email_exists)

    if email_exists != None:
        flash("You are already registered. Please login.")
        return redirect('/login')

    fname = request.form.get("fname")
    lname = request.form.get("lname")

    new_user = User(fname=fname, lname=lname, email=email)
    new_user.hash_password(request.form.get("password"))

    db.session.add(new_user)
    db.session.commit()

    flash(f'Break a leg, {fname}!')
    return redirect('/login')



@app.route('/register_show')
def register_show():
    pass

@app.route('/user_profile/<user_id>')
def user_profile(user_id):
    return "phew we made it"

if __name__ == "__main__":
    connect_to_db(app)
    app.run(debug=True)
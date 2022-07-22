from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route('/')
def homepage():
    return render_template('base.html')

@app.route('/login')
def login():
    pass

@app.route('/register_user')
def register_user():
    pass

@app.route('/register_show')
def register_show():
    pass

if __name__ == "__main__":
    app.run(debug=True)
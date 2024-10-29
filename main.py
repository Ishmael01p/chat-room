from flask import Flask, render_template, request, session, redirect
from flask_socketio import join_room, leave_room, send, SocketIO
from dotenv import load_dotenv
import random
import os
from string import ascii_uppercase

load_dotenv()
app = Flask(__name__) # name of flask application
app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY") # Will need to be changed for production for security reason
socketio = SocketIO(app)


@app.route("/", methods=["POST","GET"]) # This is the syntax in Flask to setup different routes - the medthods atrribute now gives us the allowed methods that can be sent to this route
def home():
    if request.method == "POST":
        name = request.form.get("name") 
        code = request.form.get("code")
        join = request.form.get("join", False) # These form objects are just python dictionaries - so by putting false we will not get an error if the request is made and nothing is returned
        create = request.form.get("create", False)
    return render_template("home.html")


if __name__ == "__main__":
    socketio.run(app, debug=True)



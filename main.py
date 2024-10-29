from flask import Flask, render_template, request, session, redirect
from flask_socketio import join_room, leave_room, send, SocketIO
import random
from string import ascii_uppercase

app = Flask(__name__) # name of flask application
app.config["SECRET_KEY"] = "TEMPKEY" # Will need to be changed for production for security reason
socketio = SocketIO(app)


@app.route("/home", methods=["POST","GET"]) # This is the syntax in Flask to setup different routes - the medthods atrribute now gives us the allowed methods that can be sent to this route
def home():
    return render_template("home.html")


if __name__ == "__main__":
    socketio.run(app, debug=True)



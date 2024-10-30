from flask import Flask, render_template, request, session, redirect, url_for
from flask_socketio import join_room, leave_room, send, SocketIO
from dotenv import load_dotenv
import random
import os
from string import ascii_uppercase

load_dotenv()
app = Flask(__name__) # name of flask application
app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY") # Will need to be changed for production for security reason
socketio = SocketIO(app)


rooms = {}

def generate_unique_code(Length):
    while True:
        code = ""
        for _ in range(Length):
            code += random.choice(ascii_uppercase)
        
        if code not in rooms:
            break

    return code

@app.route("/", methods=["POST","GET"]) # This is the syntax in Flask to setup different routes - the medthods atrribute now gives us the allowed methods that can be sent to this route
def home():
    session.clear()
    if request.method == "POST":
        name = request.form.get("name") 
        code = request.form.get("code")
        join = request.form.get("join", False) # These form objects are just python dictionaries - so by putting false we will not get an error if the request is made and nothing is returned
        create = request.form.get("create", False)

        if not name:
            return render_template("home.html", error="Please eneter a name!", code=code, name=name)
        
        if join != False and not code:
            return render_template("home.html", error="Please eneter a room Code!", code=code, name=name)
        
        room = code
        if create != False:
            room = generate_unique_code(4)
            rooms[room] = {"memebers": 0, "messages": []}
        elif code not in rooms:
            return render_template("home.html", error="Room does not exist.", code=code, name=name)
        
        session["room"] = room
        session["name"] = name
        return redirect(url_for("room"))

    return render_template("home.html")

@app.route("/room")
def room():
    room = session.get("room")
    if room is None or session.get("name") is None or room not in rooms:
        return redirect(url_for("home"))

    return render_template("room.html")


@socketio.on("connect")
def connect(auth):
    room = session.get("room")
    name = session.get("name")
    if not room or not name:
        return
    if room not in rooms:
        leave_room(room)
        return 
    
    join_room(room)
    send({"name" : name, "message": "has enetered the room"}, to = room)
    rooms[room]["members"] += 1
    print(f"{name} joined room {room}")


if __name__ == "__main__":
    socketio.run(app, debug=True)
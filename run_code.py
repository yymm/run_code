# -*- encode: utf-8 -*-

from flask import Flask, render_template, \
        request, redirect, url_for, g, session
from flask_sockets import Sockets
from flask.ext.sqlalchemy import SQLAlchemy

import subprocess
import os

app = Flask(__name__)

DB_URI = 'SQLALCHEMY_DATABASE_URI'

app.config[DB_URI] = 'sqlite:////tmp/run_code.db' \
        if 'RC_DBPATH' not in os.environ else os.environ['RC_DBPATH']

db = SQLAlchemy(app)

sockets = Sockets(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(50))
    email = db.Column(db.String(120), unique=True)

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def __repr__(self):
        return '<User %r>' % self.username

@app.route("/")
def index():
    return render_template('index.html')


@sockets.route('/status')
def echo_status_with_socket(ws):
    while True:
        message = ws.receive()

        cwd = "."
        cmdline = message
        p = subprocess.Popen(cmdline, shell=True,
                             cwd=cwd,
                             stdin=subprocess.PIPE,
                             stdout=subprocess.PIPE,
                             stderr=subprocess.STDOUT,
                             close_fds=True)
        (stdout, stdin) = (p.stdout, p.stdin)
        while True:
            line = stdout.readline()
            if not line:
              break
            ws.send(line)

@app.route("/signin")
def signin():
    return render_template("signin.html")


@app.before_request
def before_request():
    g.user = None
    if 'user_id'in session:
        g.user = User.query.get(session['user_id'])


if __name__ == '__main__':
    app.debug = True if 'RC_PRODUCTION' not in os.environ is None else False
    app.run()

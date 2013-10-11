# -*- encode: utf-8 -*-

from flask import Flask, render_template, \
        request, redirect, url_for
from flask_sockets import Sockets
import subprocess
import time

app = Flask(__name__)
sockets = Sockets(app)

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
        (stdouterr, stdin) = (p.stdout, p.stdin)
        while True:
            time.sleep(0.2)
            line = stdouterr.readline()
            if not line:
              break
            ws.send(line)

if __name__ == '__main__':
    app.debug = True
    app.run()

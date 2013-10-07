# -*- encode: utf-8 -*-

from flask import Flask, render_template, \
        request, redirect, url_for

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.debug = True
    app.run(host='192.168.5.7', port=5000)

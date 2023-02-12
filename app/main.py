from flask import Flask
from flask import render_template

# pip install -r requirements.txt
# cd app
# flask --app main --debug run --port=8000

app = Flask(__name__)

@app.route("/")
def hello_world():
    return render_template("index.html", data={
        "title": "Geo News!",
    })
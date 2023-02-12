import json

from flask import Flask
from flask import render_template

# pip install -r requirements.txt
# cd app
# flask --app main --debug run --port=8000

content = [
    {
        "title": "First news:Lorem ipsum dolor sit amet.",
        "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    },
    {
        "title": "Second news:Lorem ipsum dolor sit amet.",
        "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    },
]

app = Flask(__name__)

@app.route("/")
def index():
    '''титульная страница .'''
    return render_template("index.html", data={
        "title": "Geo News!",
    })

@app.route("/parse/news/<countryid>/")
def parse_news(countryid):
    '''здесь нужно отдать новости fronend-у'''
    print("country ID-->", countryid)
    return json.dumps(content)
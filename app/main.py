import json
import requests

from pprint import pprint

from flask import Flask
from flask import render_template

from bs4 import BeautifulSoup as bs

# pip install -r requirements.txt
# cd app
# flask --app main --debug run --port=8000

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
    content = []
    response = requests.get("https://ria.ru/export/rss2/archive/index.xml")
    
    if response.status_code == 200:
        soup = bs(response.text, 'xml')
        for item in soup.find_all("item"):
            try:
                image = item.find("enclosure").get("url")
            except Exception as e:
                image = ""
            content.append({
                "title": item.find("title").get_text(),
                "link": item.find("link").get_text(),
                "image": image,
            })

    return json.dumps(content)
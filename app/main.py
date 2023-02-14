import json
import requests

from flask import Flask
from flask import render_template
from flask_scheduler import Scheduler
from bs4 import BeautifulSoup as bs

# pip install -r requirements.txt
# cd app
# flask --app main --debug run --port=8000

# rss chanels
# https://ria.ru/export/rss2/archive/index.xml
# https://rssexport.rbc.ru/rbcnews/news/30/full.rss
# https://tass.ru/rss/v2.xml
# https://regnum.ru/rss/news.html
# https://www.interfax.ru/rss.asp

app = Flask(__name__)

scheduler = Scheduler(app)

@scheduler.runner(interval=60)
def parse_news_task():
    print(
        "Задача собирает новости с нужным интервалом"
        " и создает некоторые обновляемые данные."
    )

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
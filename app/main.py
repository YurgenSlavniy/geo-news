import os
import uuid
import json
import atexit
import sqlite3
import requests

from pprint import pprint

from flask import Flask
from flask import render_template
from flask_apscheduler import APScheduler
from bs4 import BeautifulSoup as bs

# 
# pip install -r requirements.txt
# cd app
# flask --app main --debug run --port=8000

# список rss каналов
CHANELS = [
    "https://ria.ru/export/rss2/archive/index.xml",
    "https://rssexport.rbc.ru/rbcnews/news/30/full.rss",
    "https://tass.ru/rss/v2.xml",
    "https://regnum.ru/rss/news.html",
    "https://www.interfax.ru/rss.asp",
]
# словарь с ключами совпадающими с id страны на карте с
# списками свзанных слов
COUTRIES = {
    "RU": ["РФ", "Российска Федерация", "Россия"],
    "US": ["США", "Соединённые Штаты Америки", "Америка"],
}

# текущеее имя БД
dbname = ""
# тоже текущеее имя базы
dbname_parse = ""
# список старых ибен БД для удаления 
dbname_old_list = []

QUERY_CREATE_TABLE = """CREATE TABLE IF NOT EXISTS news_content(
    id INTEGER PRIMARY KEY,
    title TEXT,
    link TEXT,
    media TEXT);"""

def parser():
    '''собирает заголовки новостей и помещает их базу данных'''
    global dbname
    global dbname_parse
    global dbname_old_list

    dbname = str(uuid.uuid4()) + ".db"
    
    connection = sqlite3.connect(dbname)
    cursor = connection.cursor()
    cursor.execute(QUERY_CREATE_TABLE)

    for i, chanel in enumerate(CHANELS):
        try:
            response = requests.get(chanel)
        except Exception as e:
            continue
        if response.status_code == 200:
            soup = bs(response.text, 'xml')
            for item in soup.find_all("item"):
                try:
                    media = item.find("enclosure").get("url")
                except Exception as e:
                    media = ""
                title = item.find("title").get_text()
                link  = item.find("link").get_text()
                query = "INSERT INTO news_content(title, link, media) VALUES(?, ?, ?)"
                cursor.execute(query, (title, link, media))
        connection.commit()

    if os.path.isfile(dbname_parse):
        dbname_old_list.append(dbname_parse)
    dbname_parse = dbname

    print("dbname_old_list:", dbname_old_list)
    print("dbname:", dbname)
    connection.close()

def clear_news():
    while True:
        if len(dbname_old_list) == 0:
            break
        file_name = dbname_old_list.pop(0)
        if os.path.isfile(file_name):
            print("[REMOVE DB]", file_name)
            os.remove(file_name)

def close_app():
    dbname_old_list.append(dbname)
    clear_news()

atexit.register(close_app)

class Config:
    SCHEDULER_API_ENABLED = True

app = Flask(__name__)
app.config.from_object(Config())

scheduler = APScheduler()
scheduler.init_app(app)

# ПЕРВЫЕ НОВОСТИ ПОСЛЕ ЗАПУСКА ПРИЛОЖЕНИЯ БУДУТ ЧЕРЕЗ 60 секунд
@scheduler.task('interval', id='parse_new_news', seconds=60, max_instances=1)
def parse_new_news():
    print("[RUN PARSER]")
    parser()

@scheduler.task('interval', id='delete_old_news', seconds=25, max_instances=1)
def delete_old_news():
    clear_news()

scheduler.start()

@app.route("/")
def index():
    '''титульная страница .'''
    return render_template("index.html", data={
        "title": "Geo News!",
    })

@app.route("/parse/news/<countryid>/")
def parse_news(countryid):
    '''здесь нужно отдать новости fronend-у'''
    global dbname_parse
    # words список слов для отбора заголовков для конкретной страны
    related_words = COUTRIES.get(countryid, "RU")
    pprint(related_words)
    print("dbname_parse:", dbname_parse)
    if os.path.isfile(dbname_parse):
        connection = sqlite3.connect(dbname_parse)
        cursor = connection.cursor()
        result = cursor.execute("SELECT title, link, media FROM news_content").fetchall()
        # result список заголовкм новостей
        if result is not None:
            connection.close()
            return json.dumps(result)

    return json.dumps([])
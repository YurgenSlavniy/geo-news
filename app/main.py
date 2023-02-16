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
# списками свзанных слов через ||
COUTRIES = {
    "RU": "РФ OR Российская OR Федерация OR Россия OR России",
    "US": "США OR Соединённые OR Штаты OR Америки OR Америка",
}

# текущеее имя БД
dbname = ""
# тоже текущеее имя базы
dbname_parse = ""
# список старых ибен БД для удаления 
dbname_old_list = []
# IF NOT EXISTS 
QUERY_CREATE_TABLE = """CREATE VIRTUAL TABLE news_content USING FTS5(title,link,media);"""

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
            # делаем запрос для получения данных
            # если ошибка переходим к следующей итерации
            response = requests.get(chanel)
        except Exception as e:
            continue
        if response.status_code == 200:
            soup = bs(response.text, 'xml')
            for item in soup.find_all("item"):
                try:
                    # если нет url будет ошибка, пропускаем её
                    media = item.find("enclosure").get("url")
                except Exception as e:
                    media = ""
                title = item.find("title").get_text()
                link  = item.find("link").get_text()
                query = "INSERT INTO news_content(title, link, media) VALUES(?, ?, ?)"
                cursor.execute(query, (title, link, media))
        connection.commit()
    # если было имя БД в глобальной переменной
    # добовляем к списку файлов для удаления
    if os.path.isfile(dbname_parse):
        dbname_old_list.append(dbname_parse)
    # dbname_parse используется в action -> parse_news
    dbname_parse = dbname

    print("dbname_old_list:", dbname_old_list)
    print("dbname:", dbname)
    connection.close()

def clear_news():
    '''удаление фалов БД'''
    while True:
        if len(dbname_old_list) == 0:
            break
        file_name = dbname_old_list.pop(0)
        if os.path.isfile(file_name):
            print("[REMOVE DB]", file_name)
            os.remove(file_name)

def close_app():
    '''выполняется при завершении сервера'''
    dbname_old_list.append(dbname)
    clear_news()

# регистрация функции завершения
atexit.register(close_app)

class Config:
    SCHEDULER_API_ENABLED = True

app = Flask(__name__)
app.config.from_object(Config())

scheduler = APScheduler()
scheduler.init_app(app)

@scheduler.task('interval', id='parse_new_news', seconds=60, max_instances=1)
def parse_new_news():
    '''первые заголовки новостей будут после запуска приложения будут через 60 секунд'''
    print("[RUN PARSER]")
    parser()

@scheduler.task('interval', id='delete_old_news', seconds=25, max_instances=1)
def delete_old_news():
    '''удаление файлов БД во время работы'''
    clear_news()

scheduler.start()

@app.route("/")
def index():
    '''титульная страница .'''
    return render_template("index.html", data={
        "title": "Geo News!",
    })

@app.route("/parse/news/<leftID>/<rightID>/")
def parse_news(leftID, rightID):
    '''здесь нужно отдать новости fronend-у'''
    global dbname_parse
    print("countries code:", leftID, rightID)
    # выбраные области на карте их ID
    related_words_left = COUTRIES.get(leftID, "РФ OR Российская OR Федерация OR Россия OR России")
    related_words_right = COUTRIES.get(rightID, "США OR Соединённые OR Штаты OR Америки OR Америка")

    pprint([related_words_left, related_words_right])
    print("dbname_parse:", dbname_parse)

    if os.path.isfile(dbname_parse):
        connection = sqlite3.connect(dbname_parse)
        cursor = connection.cursor()
        # полно-текстой поиск по БД по словам через или
        l = cursor.execute(f"SELECT title, link, media FROM news_content WHERE title MATCH '{related_words_left}'").fetchall()
        r = cursor.execute(f"SELECT title, link, media FROM news_content WHERE title MATCH '{related_words_right}'").fetchall()
        if l and r:
            connection.close()
            return json.dumps({"left": l, "right": r})
        connection.close()

    return json.dumps({"left": [], "right": []})
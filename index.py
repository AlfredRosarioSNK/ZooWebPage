import requests
from flask import Flask, render_template, request, redirect, url_for, jsonify, session
from pymongo import MongoClient
from flask_moment import Moment
import calendar
from flask_mail import Mail, Message
from datetime import datetime
from google.cloud import storage
from google.oauth2 import service_account
from bson import json_util
import json
import os
from dotenv import load_dotenv

app = Flask(__name__)

load_dotenv()

mail_username = os.getenv('MAIL_USERNAME')
mail_password = os.getenv('MAIL_PASSWORD')
mongo_client_string = os.getenv('MONGO_CLIENT')
secret_key = os.getenv('SECRET_KEY')
app.secret_key = secret_key
app.config['MAIL_USERNAME'] = mail_username
app.config['MAIL_PASSWORD'] = mail_password
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
mail = Mail(app)
moment = Moment(app)
client = MongoClient(mongo_client_string)
db = client.Animals
collection = db['data']
collectionReptile = db['Reptile']
collectionBird = db['Birds']
collectionAmphibian = db['Amphibians']
collectionMammal = db['Mammals']


@app.route('/search')
def search():
    search_term = request.args.get('search', '')
    if search_term:
        search_filter = {"name": {"$regex": search_term, "$options": "i"}}
        count = collection.count_documents(search_filter)
        results = collection.find(search_filter)
    else:
        sample_size = 5
        results = collection.aggregate([{"$sample": {"size": sample_size}}])
        count = sample_size

    animal_data = []
    for result in results:
        name = result.get("name", "No name available")
        image = result.get("image", result.get("Image", "No image available"))
        interesting_fact = result.get(
            "interesting-fact", "No interesting fact available")
        animal_data.append({"name": name, "image": image,
                           "interesting_fact": interesting_fact})

    return render_template('search_results.html', search_term=search_term, results=animal_data, count=count)


class CustomHTMLCalendar(calendar.HTMLCalendar):
    def __init__(self, year, month, day):
        super().__init__()
        self.year = year
        self.month = month
        self.day = day

    def formatday(self, day, weekday):
        if day == 0:
            return '<td class="noday">&nbsp;</td>'
        elif day == self.day:
            return f'<td class="{self.cssclasses[weekday]} current-day">{day}</td>'
        else:
            return f'<td class="{self.cssclasses[weekday]}">{day}</td>'


@app.route("/")
@app.route("/home")
def home():
    current_year = datetime.now().year
    current_month = datetime.now().month
    current_day = datetime.now().day
    cal = CustomHTMLCalendar(current_year, current_month, current_day)
    calendar_html = cal.formatmonth(current_year, current_month)
    current_date = datetime.now().strftime("%B, %d %Y")

    return render_template('home.html', calendar_html=calendar_html, current_date=current_date)

@app.route("/buy_ticket")
def buy_ticket():

    return render_template('buy_ticket.html')

@app.route("/api/mammals")
def get_mammals():
    mammals = collectionMammal.find({})
    mammals_json = json.loads(json_util.dumps(mammals))
    return jsonify(mammals_json)


@app.route("/api/reptile")
def get_reptile():
    reptile = collectionReptile.find({})
    reptile_json = json.loads(json_util.dumps(reptile))
    return jsonify(reptile_json)


@app.route("/api/amphibian")
def get_amphibian():
    amphibian = collectionAmphibian.find({})
    amphibian_json = json.loads(json_util.dumps(amphibian))
    return jsonify(amphibian_json)


@app.route("/api/bird")
def get_bird():
    bird = collectionBird.find({})
    bird_json = json.loads(json_util.dumps(bird))
    return jsonify(bird_json)


@app.route('/send_email', methods=['POST'])
def send_email():
    name = request.form['firstname']
    email = request.form['lastname']
    country = request.form['country']
    subject = request.form['subject']

    message_body = f"Name: {name}\nEmail: {email}\nCountry: {country}\nSubject: {subject}"

    message = Message(subject="Feedback from my page", body=message_body,
                      sender='alfredsnk@gmail.com', recipients=['alfredsnk@gmail.com'])
    mail.send(message)

    return "Message sent!"


class User:
    def __init__(self, userName, email, password):
        self.email = email
        self.password = password
        self.userName = userName

    def to_json(self):
        return {
            "userName": self.userName,
            "email": self.email,
            "password": self.password
        }


@app.route('/signup', methods=['POST'])
def signup():
    email = request.form['email']
    password = request.form['password']
    userName = request.form['userName']
    existing_user = db.users.find_one({'email': email})

    if existing_user is None:
        session['username'] = userName
        new_user = User(userName, email, password)
        db.users.insert_one(new_user.to_json())
        return jsonify({'status': 'success', 'message': 'Successfully registered user.'})
    else:
        return jsonify({'status': 'fail', 'message': 'User already exists.'})


@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']
    user = db.users.find_one({'email': email})

    if user and 'password' in user and user['password'] == password:
        username = user.get('userName', None)
        if username is not None:
            session['username'] = username
            return jsonify({'status': 'success', 'message': 'Successfully logged in.', 'redirect': url_for('home')})
        else:
            return jsonify({'status': 'fail', 'message': 'Username does not exist.'})
    else:
        return jsonify({'status': 'fail', 'message': 'Invalid email or password.'})

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('home'))


google_credentials_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
creds = service_account.Credentials.from_service_account_file(
    google_credentials_path)

client = storage.Client(project='My First Project', credentials=creds)
bucket = client.bucket('zoo-imagestest')

storage_client = storage.Client()

bucket_name = 'zoo-imagestest'
bucket = storage_client.bucket(bucket_name)

if __name__ == '__main__':

    app.run(debug=True)

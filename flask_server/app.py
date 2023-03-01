from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson import ObjectId
from utils import encryptPass, decryptPass, genID


app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb+srv://aspjain07:password_12345@my-cluster-00.hsnz2cn.mongodb.net/UserDataBase?retryWrites=true&w=majority'

mongo = PyMongo(app)

CORS(app)
db = mongo.db.UserEventCollection

# Route for sign up 
@app.route("/register", methods=['POST'])
def register():
    if request.method=='POST':
        user = db.find_one({'userEmail': request.json['userEmail']})
       
        if(not user):
            encrypted_password = encryptPass(request.json['userPassword'])
            
            db.insert_one({'userName': request.json['userName'], 'userEmail': request.json['userEmail'],'password':encrypted_password , 'Task': []})
            
            return jsonify({'status': 'ok', 'message': 'successfully registered'})
        
        else:
            return jsonify({'status': 'error', 'message': 'Email already exist'})


#Login Route
@app.route("/login", methods=[ 'POST'])
def login():
    if request.method=='POST':
        user = db.find_one({'userEmail': request.json['email']})
       
        if(user):
            if(decryptPass(request.json['userPassword'], user['password'])):
                return jsonify({'status': 'ok', 'message': 'login successfully'})
        else:
            return jsonify({'status': 'error', 'message': 'Wrong credentials'})

@app.route("/addEvent", methods=['POST'])
def addEvent():
    if request.method=='POST':
        db.find_one_and_update({'userEmail': request.json['userEmail']}, {'$push': { 'Task': {'TId': 'NewId_','Date': request.json['date'], 'StartTime': request.json['startTime'], 'EndTime': request.json['endTime'], 'Event': request.json['eventText'], 'Status': 'Not Finished'}}})
        return jsonify({'status': 'ok', 'message': 'Event added successfully'})
    

@app.route("/userDetails/<userEmail>", methods=['GET'])
def getUsers(userEmail):
    
    if request.method=='GET':
        user = db.find_one({'userEmail': userEmail})
        return user['Task']


if __name__ == "__main__":
    app.run(debug=True)
# Import flask and datetime module for showing date and time
from flask import Flask, redirect, url_for, request
import json
from pymongo import MongoClient
from bson.json_util import dumps

import datetime
client = MongoClient('mongodb+srv://mangouserr:mangouserr@cluster0.sfjf9gl.mongodb.net/?retryWrites=true&w=majority')
db = client.api
todos = db.api1
x = datetime.datetime.now()

app = Flask(__name__)


@app.route('/data',methods = ['POST', 'GET'])
def get_time():
	
    
	if request.method == "POST":
		body = request.json['hi']
		todos.insert_one(body)
		print(body)
		podabody={
			"name":body
		}



		return body

	if request.method == "GET":
		all_todos =todos.find( {"firstName": "harini" })
		# all_todos1 =todos.find( {name:{$elemMatch : {firstName: "ramaiya" }}})
		# all_todos1 =todos.find( {"name.firstName": "ramaiya" })
		# all_todos1 =todos.find({},{"lastName" :0})

		list_cur = list(all_todos)
		# list_cur1 = list(all_todos1)

		stud_json =dumps(list_cur)
		# stud_json1 =dumps(all_todos1)
		# stud_json1 =dumps(list_cur1)

		# print(all_todos)

		return stud_json
	



	# return {
	# 	'Name':"geek",
	# 	"Age":"22",
	# 	"Date":x,
	# 	"programming":"python"
	# 	}

	
# Running app
if __name__ == '__main__':
	app.run(debug=True)

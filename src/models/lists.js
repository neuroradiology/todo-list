const mongo = require('mongodb').MongoClient;

const url = <INSERT MONGODB DATABASE URI>;
const dbName = 'tasks';
mongo.connect(url, {useNewUrlParser: true}, (err,client) => {
	if (err) throw err;	
	global.db = client.db(dbName);
	console.log('MongoDB Connection Established.')
	console.log(`The database "${db.databaseName}" has been created.`);
});

exports = addTask = (req,res) => {
	const newTask = {
		uniq: Date.now(),
		email: req.body.email,
		taskname: req.body.taskName,
		duetime: req.body.taskTime,
	};
	db.collection('duetasks').insertOne(newTask, (err,result) => {
		if (err) throw err;
		console.log("New task added.");
	});
};
exports = fetchDue = (req,res) =>{
	const query = {email : req.headers['x-user-email']}
	db.collection('duetasks').find(query).toArray((err,result) =>{
		res.json(result);
	});
};
exports = completeTask = (req,res) =>{
	db.collection('duetasks').findOne({uniq: parseInt(req.body.toBeMoved)}, (err,doc) =>{
		if (err) throw err;
		const toBeCompleted = doc;	
		db.collection('completedtasks').insertOne(toBeCompleted , (err,result) =>{
			if (err) throw err;
			console.log('Task moved to completed.');		
			db.collection('duetasks').deleteOne(toBeCompleted, (err,result) =>{
				if (err) throw err;
				console.log('Task deleted from due.');
			});
		});
	});
};
exports = fetchCompleted = (req,res) => {
	const query = {email : req.headers['x-user-email']}
	db.collection('completedtasks').find(query).toArray((err,result) =>{
		res.json(result);
	});
};
exports = deleteTask = (req,res) =>{				
	db.collection('completedtasks').deleteOne({uniq: parseInt(req.body.toBeDeleted)}, (err,result) =>{
		if (err) throw err;
		console.log('Task deleted from completed.');
	});		
};

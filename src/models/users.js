const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

options = {
	host: <INSERT MYSQL DATABASE HOST URI>,
	user: <INSERT USERNAME>,
	password: <INSERT USER PASSWORD>,
	database: 'todolist'
};

const db = mysql.createPool(options);

const email = fs.readFileSync(path.join(__dirname, '../email/email.html'))					   			
	const transporter = nodemailer.createTransport({
		service: <INSERT EMAIL SERVICE PROVIDER>,
		auth: {
		    user: <INSERT EMAIL ADDRESS>,
		    pass: <INSERT EMAIL PASSWORD>
		    },
		tls:{
			rejectUnauthorized: false
		}
	});	

exports = registerUser = (req,res) => {
	const signUpUsername = req.body.signUpUsername;
	const signUpEmail =	req.body.signUpEmail; 
	const signUpPassword = req.body.signUpPassword;
	const mailOptions = {
		from: <INSERT SENDER EMAIL ADDRESS>, 
		to: signUpEmail, 
		subject: 'toDo List', 
		html: email
	};
		let sqlcheck = `SELECT * FROM users WHERE email = '${signUpEmail}'`;
		db.query(sqlcheck, (err,result) =>{
			if(err) {
				throw err;
			}
			else{ 
				if(result.length > 0){					
				res.send('user already exists');
			}else{
				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(signUpPassword, salt);
		    	const hashedPassword = hash;     	
		    	console.log('Password Hashed.')    	
				let sqlone = 'CREATE DATABASE IF NOT EXISTS todolist';
				db.query(sqlone, (err, result) => {
	        		if(err) throw err;
	        			console.log('Database Created.');
	    		});
	    			let sqltwo = 'CREATE TABLE IF NOT EXISTS users(username VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)';
	    			db.query(sqltwo, (err,result) =>{
	    				if(err) throw err;
	        			console.log('Table Created.');
	    			});

	    				let sqlthree = `INSERT INTO users(username, email, password) VALUES ('${signUpUsername}', '${signUpEmail}', '${hashedPassword}')`;
	    				db.query(sqlthree, (err,result) =>{
	    				if(err) throw err;
	        			console.log('Data Inserted.');        			
	    			});    				 
							transporter.sendMail(mailOptions, (err, info) => {
							   	if(err) throw err;
							    console.log('Email Sent.');
								res.send('successful registration');  
							});					
			};
		};
	});		
};

module.exports = db;

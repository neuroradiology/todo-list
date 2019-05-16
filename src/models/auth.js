const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const db = require('./users');
const jwtkey = <INSERT JWT SECRET KEY>;

exports = loginUser = (req,res) => {
	const signInEmail = req.body.signInEmail;
	const signInPassword = req.body.signInPassword;
	let sqlconfirm = `SELECT * FROM users WHERE email = '${signInEmail}'`;
		db.query(sqlconfirm, (err,result) =>{
			if(err) throw err;
			else{ 
				if(result.length === 0){					
					res.json({
							"message": "user does not exist", 
							"token": "Unauthorized"
						});
				}else{
					const comparison = bcrypt.compareSync(signInPassword, result[0].password);
					if (comparison === false) {
						res.json({
							"message": "password is incorrect", 
							"token": "Unauthorized"
						});
					}else if (comparison === true){
						const token = jwt.sign({
							username:result[0].username,
							email:result[0].email							
						}, jwtkey);
						res.json({
							"message": "records match", 
							"token": token
						});
					}
				}
			};
		});
};


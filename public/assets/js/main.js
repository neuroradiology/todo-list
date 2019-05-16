//Globar vars
const signInField = document.getElementById('sign-in');
const signUpField = document.getElementById('sign-up');
const eyeSlash = document.getElementById('eye-slash');
const eye = document.getElementById('eye');
const x = document.getElementById('sign-in-password');
const eyeSlashUp = document.getElementById('eye-slash-up');
const eyeUp = document.getElementById('eye-up');
const y = document.getElementById('sign-up-password');

//Two fields toggle
let showSignUpField = () => {		
	signUpField.style.display = "block";
	signInField.style.display = "none";
};
let showSignInField = () => {		
	signUpField.style.display = "none";
	signInField.style.display = "block";
};

//Pass toggle
const revealInPass = () => {    
    x.type = "text";
    eye.style.display = 'block';
    eyeSlash.style.display = 'none';	     
};
const hideInPass = () => {
	x.type = "password";
	eye.style.display = 'none';
	eyeSlash.style.display = 'block';
};
const revealUpPass = () => {    
    y.type = "text";
    eyeUp.style.display = 'block';
    eyeSlashUp.style.display = 'none';	     
};
const hideUpPass = () => {
	y.type = "password";
	eyeUp.style.display = 'none';
	eyeSlashUp.style.display = 'block';
};

//Init strength meter
$('#sign-up-password').strengthify({tilesOptions:{
		tooltip: false,
		element: true
	},
	drawTitles: true,
	drawMessage: false,
	drawBars: true
});
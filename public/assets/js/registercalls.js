document.getElementById('sign-up-button').addEventListener('click',register);
function register(e) {	
	const signUpUsername = document.getElementById('sign-up-username').value;
	const signUpEmail = document.getElementById('sign-up-email').value;
	const signUpPassword = document.getElementById('sign-up-password').value;
		validateInputs2();
		NProgress.configure({ showSpinner: false });
		NProgress.configure({ ease: 'ease', speed: 30000 });
			NProgress.start();
			NProgress.done();
	const xhr2 = new XMLHttpRequest();		
		xhr2.open('POST', '/api/register', true);
		xhr2.setRequestHeader("Content-type", "application/json");
			xhr2.onload = function(){
				if(this.status == 200){
					if (this.responseText === 'user already exists') {
						Swal.fire({
							title: 'Conflicting Credentials!',
							text: 'That email address is already registered.',
							type: 'error',
							confirmButtonText: 'Try another',
							allowOutsideClick: false,
							allowEscapeKey: false
						}).then(function() {
	    						window.location.reload();
								});
					} else if (this.responseText === 'successful registration'){
						Swal.fire({
							title: 'Successful Registration!',
							text: 'Psst! Check your email for something really cool.',
							type: 'success',
							confirmButtonText: 'Log In',
							allowOutsideClick: false,
							allowEscapeKey: false
							}).then(function() {
	    						window.location.reload();
								});				
					}						
				};
			};
	const sendData2 = JSON.stringify({
		"signUpUsername": signUpUsername,
		"signUpEmail" : signUpEmail,
		"signUpPassword" : signUpPassword
	});	
	xhr2.send(sendData2); 
		signUpPassword.innerHTML = '';
		document.getElementById('signUpForm').reset();	
		e.preventDefault();
};
function validateInputs2() {
	const signUpUsername = document.getElementById('sign-up-username').value;
	const signUpEmail = document.getElementById('sign-up-email').value;
	const signUpPassword = document.getElementById('sign-up-password').value;
	const regex = /^\S+@\S+$/;
		const testEmail = regex.test(signUpEmail);
			if(signUpPassword === '' || testEmail === false || signUpUsername === ''){
				throw new Error('Please fill in the required fields.');
			}else{
				return true;
			};
};


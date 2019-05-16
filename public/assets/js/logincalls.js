document.getElementById('log-in-button').addEventListener('click',login);
function login(e){
	const signInEmail = document.getElementById('sign-in-email').value;
	const signInPassword = document.getElementById('sign-in-password').value;
		validateInputs();
		NProgress.configure({ showSpinner: false });
		NProgress.configure({ ease: 'ease', speed: 700 });
			NProgress.start();
			NProgress.done();
	const xhr = new XMLHttpRequest();		
		xhr.open('POST', '/api/login', true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.onload = function(){
				if(this.status == 200){					
					const message = JSON.parse(this.responseText).message;
					const token = JSON.parse(this.responseText).token;
					if (message === 'user does not exist' || message === 'password is incorrect') {
						Swal.fire({
							title: 'Invalid Credentials!',
							text: 'The email and password you entered did not match our records.',
							type: 'error',
							width: 520,
							confirmButtonText: 'Try again',
							allowOutsideClick: false,
							allowEscapeKey: false
						})
					} else if (message === 'records match'){											
						localStorage.setItem('token', token);
						window.location = '/todo';												
					}								
				};				
			};	
	const sendData = JSON.stringify({
		"signInEmail": signInEmail,
		"signInPassword" : signInPassword
	});	
	xhr.send(sendData);
		document.getElementById('signInForm').reset();	
		e.preventDefault();
};
function validateInputs() {
	const signInEmail = document.getElementById('sign-in-email').value;
	const signInPassword = document.getElementById('sign-in-password').value;
	const regex = /^\S+@\S+$/;
		const testEmail = regex.test(signInEmail);
			if(signInPassword === '' || testEmail === false){
				throw new Error('Please fill in the required fields.');
			}else{
				return true;
			};
};

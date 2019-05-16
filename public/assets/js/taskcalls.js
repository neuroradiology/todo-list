document.getElementById('add-task-button').addEventListener('click',addtask);
function addtask(e){
	const taskName = document.getElementById('task-name').value;
	const taskTime = document.getElementById('task-time').value;
	const token = localStorage.getItem('token');
	const decoded = jwt_decode(token);
		const userEmail = decoded.email;
		validateInputs3();
		NProgress.configure({ showSpinner: false });
		NProgress.configure({ ease: 'ease', speed: 700 });
			NProgress.start();
			NProgress.done();
	const xhr3 = new XMLHttpRequest();		
		xhr3.open('POST', '/api/addtask', true);
		xhr3.setRequestHeader("Content-type", "application/json");
		xhr3.setRequestHeader("Authorization", "Bearer " + token)
		xhr3.onload = function(){
				if(this.status === 200){
					console.log('OK');
				};
			};
	const sendData3 = JSON.stringify({
		"taskName": taskName,
		"taskTime": taskTime,
		"email": userEmail
	});	
	xhr3.send(sendData3);
		document.getElementById('taskForm').reset();
		e.preventDefault();
};
function validateInputs3() {
	const taskName = document.getElementById('task-name').value;
	const taskTime = document.getElementById('task-time').value;
		if(taskName === '' || taskTime === ''){
			throw new Error('Please fill in the required fields.');
		}else{
			return true;
		};
};
function completetask(taskid){
	NProgress.configure({ showSpinner: false });
		NProgress.configure({ ease: 'ease', speed: 700 });
			NProgress.start();
			NProgress.done();
	const xhr = new XMLHttpRequest();		
		xhr.open('POST', '/api/completetask', true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'))
			xhr.onload = function(){
				if(this.status === 200){
					console.log('OK');
					};    
   			 };
		const sentData = JSON.stringify({
			"toBeMoved": taskid
		});
   		xhr.send(sentData);
};
function deletetask(comptaskid){
	NProgress.configure({ showSpinner: false });
		NProgress.configure({ ease: 'ease', speed: 700 });
			NProgress.start();
			NProgress.done();
	const xhr = new XMLHttpRequest();		
		xhr.open('POST', '/api/deletetask', true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'))
			xhr.onload = function(){
				if(this.status === 200){
					console.log('OK');
					};    
   			 };
		const sentData2 = JSON.stringify({
			"toBeDeleted": comptaskid
		});
   		xhr.send(sentData2);
};
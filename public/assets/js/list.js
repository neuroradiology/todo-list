window.onload = () =>{
	fetchUser();
	fetchDue();
	fetchCompleted();
};
//Init datepicker
let taskTime = document.getElementById('task-time')
const picker = datepicker(taskTime);
//Logout
let logout = () => {	
	NProgress.start();
	NProgress.done();
	localStorage.removeItem('token');
	window.location.reload();
 };
NProgress.configure({ showSpinner: false });
//Displays
const fetchUser = () => {
const placeholder = document.getElementById('username');
const token = localStorage.getItem('token');
	const decoded = jwt_decode(token);
		const user = decoded.username;
		window.loggedEmail = decoded.email;
		placeholder.innerHTML = `&nbsp;${user}` 
};
const fetchDue = () => {
	const xhr = new XMLHttpRequest();		
		xhr.open('GET', '/api/fetchdue', true);
		xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
		xhr.setRequestHeader("x-user-email", loggedEmail);
		xhr.onload = function(){
			if(this.status === 200){
				const dueTasksBody = document.getElementById('dueTasksBody');
				const due = JSON.parse(this.responseText);
				for (var i = 0; i < due.length; i++) {
					const duetask = due[i].taskname;
					const duetime = due[i].duetime;
					const taskid = due[i].uniq;
 						const row = document.createElement("tr");
 						row.innerHTML +=`<td id="dueTask">${duetask}</td>
                    					<td id="dueTime">${duetime}</td>
                    					<td><button id="completeTask" onclick="completetask('${taskid}');window.location.reload();" class="btn btn-success">Complete Task</button></td>
                    					`               
                    document.getElementById('due-tasks-image').style.display = 'none';
                    document.getElementById('dueTasksTable').style.display = 'block';				 
    				dueTasksBody.appendChild(row);
				};									
			};
		};
	xhr.send();
};

const fetchCompleted = () => {
const xhr = new XMLHttpRequest();		
		xhr.open('GET', '/api/fetchcompleted', true);
		xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
		xhr.setRequestHeader("x-user-email", loggedEmail);
		xhr.onload = function(){
			if(this.status === 200){
				const completedTasksBody = document.getElementById('completedTasksBody');
				const comp = JSON.parse(this.responseText);
				for (var i = 0; i < comp.length; i++) {
					const comptask = comp[i].taskname;
					const comptime = comp[i].duetime;
					const comptaskid = comp[i].uniq;
 						const row = document.createElement("tr");
 						row.innerHTML +=`<td id="compTask">${comptask}</td>
                    					<td id="compTime">${comptime}</td>
                    					<td><button id="deleteTask" onclick="deletetask('${comptaskid}');window.location.reload();" class="btn btn-danger">Delete Task</button></td>
                    					`               
                    document.getElementById('completed-tasks-image').style.display = 'none';
                    document.getElementById('completedTasksTable').style.display = 'block';				 
    				completedTasksBody.appendChild(row);
				};									
			};
		};
	xhr.send();
};

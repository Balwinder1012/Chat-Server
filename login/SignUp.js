var UserList =  [];
var signUp = document.getElementById('signUp');
var cancel = document.getElementById('cancel');
var userid = 1;

function getUserList(){
	var request = new XMLHttpRequest();
	request.open("GET","/getUserList");
	
	request.addEventListener("load",function(){
			var t = request.responseText;;
			if(t){
				
				t = JSON.parse(t);
				UserList = t;
				setUserId();
			}
		});
		request.send();
      
}



getUserList();

function setUserId(){
if(UserList.length){
	
	userid = parseInt(UserList[UserList.length-1].id) + 1;
	
	
}
}
cancel.addEventListener("click",function(event){
	
	window.location = "loginPage";
	
});

function sendDataToServer(){
	
	var request = new XMLHttpRequest();
	request.open("POST","/userRegistration");
	request.send(JSON.stringify(UserList));
	
	
	
}
signUp.addEventListener("click",function(event){
	
		var name = document.getElementById('name').value;
		var email = document.getElementById('email').value;
		var pwd = document.getElementById('pwd').value;
		var repwd = document.getElementById('repwd').value;
		
		
		
		
		if(pwd!=repwd){
			alert("Please enter same password in both fields");
			document.getElementById('pwd').value = "";
			document.getElementById('repwd').value="";
		}
		else if(!name || !email || !pwd)
			alert("Please enter all the fields");
		
		else{
			addTheNewUserToArray(name,email,pwd,address);
			window.location = "loginPage";
		}
		
	
	
});

function addTheNewUserToArray(name,email,pwd,address){
	
		var userObj = new Object();
		userObj.id = userid;
		userObj.name = name;
		userObj.email = email;
		userObj.pwd = pwd;
		
		
		userObj.type = "user";
		UserList.push(userObj);
		sendDataToServer();
		
		userid++;
		alert(name+"'s account is created");
	
}



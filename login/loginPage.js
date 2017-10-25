var onLogin = document.getElementById('onLogin');
var onSignUp = document.getElementById('onSignUp');
var username = document.getElementById('userName');
var password = document.getElementById('password');

var UserList = [];

function getUserList(){
	var request = new XMLHttpRequest();
	request.open("GET","/getUserList");
	
	request.addEventListener("load",function(){
			var t = request.responseText;;
			if(t){
				
				t = JSON.parse(t);
				UserList = t;
				
			}
		});
		request.send();
      
}



getUserList();



onLogin.addEventListener("click",function(event){
	
	if(username.value=='' || password.value=='')
		alert('Enter both the fields');

	var select = checkAccount(username.value,password.value);
	if(select){
		window.location = "pageFirst.html";
	}
	else{
		
		alert("wrong username password combination");
	}
	
	
	
	
});

onSignUp.addEventListener("click",function(event){
	window.location="signUp.html";
	
});

function checkAccount(uname,pwd){
	
	for(x in UserList){
	
		if(UserList[x].email===uname && UserList[x].pwd===pwd){
			
			return true;	
		}
	}
	
	return false
	
	
}
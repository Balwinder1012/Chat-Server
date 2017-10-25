var wrapper = document.getElementById('wrapper');
var signup = document.getElementById('signup');
var login = document.getElementById('login');
var rightMost = document.getElementById('rightMost');
var user;

login.style.width = "100%";



var messageArray=[];

placeDiv(wrapper);
placeDiv(signup);
placeDiv(login);
function placeDiv(div) {
  
  div.style.position = "absolute";
  div.style.left = 0;
  div.style.top = 0;
}

//messageArray.push("bal");
//console.log(JSON.stringify(messageArray));

hideTheNode(wrapper);
hideTheNode(signup);

////////////////////////////////////////////////////////////

function showTheNode(node){
	
	node.style.visibility = "visible"
	
}
function hideTheNode(node){
	
	node.style.visibility = "hidden"
	
}
///////////////////////////////////////////////////////////

function getPreviousMessages(){
	
	var request = new XMLHttpRequest();
	request.open("GET","/getPreviousMessages");
	
	request.addEventListener("load",function(){
			var t = request.responseText;;
			if(t!=""){
			
			
				messageArray = JSON.parse(t);
				//console.log(messageArray[1]);
			
			}
			else
				messageArray = [];
			drawTheTextArea();
			
		});
		request.send();

}
	

var h1 = document.createElement('h2');

rightMost.appendChild(h1);
rightMost.appendChild(document.createElement('br'));


var logout = document.createElement('input');
logout.type = "button";
logout.value = "LogOut";
logout.style.align = "right";
logout.addEventListener("click",function(event){
	hideTheNode(wrapper);
	hideTheNode(signup);
	showTheNode(login);
});

rightMost.appendChild(logout);


var tf = document.createElement('input');
tf.type = "text";
tf.maxlength = "4";
tf.size="100";
tf.placeholder = "Write here.....";
tf.addEventListener("keypress",function(event){

	if(event.keyCode==13){
		sendMessage();
		getPreviousMessages();
		tf.value="";
	}
	
});

wrapper.appendChild(document.createElement('br'));

wrapper.appendChild(tf);

wrapper.appendChild(document.createElement('br'));
wrapper.appendChild(document.createElement('br'));

	
var ta = document.createElement('textarea');
ta.setAttribute('rows','30');
ta.setAttribute('cols','100');
ta.readOnly = true;
	//ta.setAttribute("style:overflow-y='scroll'");
ta.scrollTop = ta.scrollHeight;
wrapper.appendChild(ta);
getPreviousMessages();
function drawTheTextArea(){
	ta.innerHTML="";
	if(messageArray.length>0){
		
		for(var i=messageArray.length-1;i>=0;i--){
			ta.innerHTML += messageArray[i].msg + "&#13;&#10;" ;
		}
		
	}

}


var sub = document.createElement('input');
sub.type = "button";
sub.value = "Send";
sub.addEventListener("click",function(event){
	sendMessage();
	getPreviousMessages();
	tf.value="";
});
wrapper.appendChild(document.createElement('br'));
wrapper.appendChild(document.createElement('br'));
wrapper.appendChild(sub);



wrapper.appendChild(document.createElement('br'));
wrapper.appendChild(document.createElement('br'));

var clear = document.createElement('input');
clear.type = "button";
clear.value = "Clear";
clear.addEventListener("click",function(event){
	deleteAllTheMsgs();
});


function sendMessage(){
	
	var text1 = user + ": "+tf.value;
	var obj = new Object();
	obj.msg = text1;
	messageArray.push(obj);
	var request = new XMLHttpRequest();
	request.open("POST","/sentMessage");
	request.send(JSON.stringify(obj));
	var t = JSON.stringify(messageArray);
	//console.log("ballu"+ t);
	
	
}

function deleteAllTheMsgs(){
	
	messageArray = [];
	var request = new XMLHttpRequest();
	request.open("GET","/deleteAllMsgs");
	
	request.addEventListener("load",function(){
			var t = request.responseText;;
			console.log("deleted");
		});
		request.send();
	
	
}



/////////////////////////////////////////////////////////////////////////////////////////////////////

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
				console.log(JSON.stringify(UserList));
				
			}
		});
		request.send();
      
}



getUserList();

cancel.addEventListener("click",function(event){
	
	hideTheNode(wrapper);
hideTheNode(signup);
showTheNode(login);
	
});

function sendDataToServer(userObj){
	
	var request = new XMLHttpRequest();
	request.open("POST","/userRegistration");
	request.send(JSON.stringify(userObj));
	
	
	
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
			addTheNewUserToArray(name,email,pwd);
			
			hideTheNode(signup);
			hideTheNode(wrapper);
			showTheNode(login);
		
		}
		
	
	
});

function addTheNewUserToArray(name,email,pwd){
	
		var userObj = new Object();
		//userObj.id = userid;
		userObj.name = name;
		userObj.email = email;
		userObj.pwd = pwd;
		
		
		userObj.type = "user";
		UserList.push(userObj);
		console.log(UserList);
		sendDataToServer(userObj);
		
	//	userid++;
		alert(name+"'s account is created");
	
}





////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////
var onLogin = document.getElementById('onLogin');
var onSignUp = document.getElementById('onSignUp');
var username = document.getElementById('userName');
var password = document.getElementById('password');




onLogin.addEventListener("click",function(event){
	
	if(username.value=='' || password.value=='')
		alert('Enter both the fields');

	var select = checkAccount(username.value,password.value);
	if(select){
		hideTheNode(login);
		hideTheNode(signup);
		showTheNode(wrapper);
		user = username.value;
		h1.innerHTML = "Welcome "+user;
		
	}
	else{
		
		alert("wrong username password combination");
	}
	
	
	
	
});

onSignUp.addEventListener("click",function(event){
		hideTheNode(login);
		hideTheNode(wrapper);
		showTheNode(signup);
	
});

function checkAccount(uname,pwd){
	
	console.log("no of accounts "+UserList.length);
	for(x in UserList){
		console.log(UserList[x].email+" "+uname);
		console.log(UserList[x].pwd+" "+pwd);
		if(UserList[x].email===uname && UserList[x].pwd===pwd){
			user = UserList[x].name;
			if(UserList[x].type=="admin")
				wrapper.appendChild(clear);
			return true;	
		}
		
	}
	
	return false;
	
	
}
/////////////////////////////////////////////////////////////////////////////////////////////////////


setInterval(getPreviousMessages, 1000);
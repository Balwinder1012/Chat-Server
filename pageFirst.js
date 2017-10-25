var wrapper = document.getElementById('wrapper');
var user;
var check = false;

var messageArray=[];
//messageArray.push("bal");
//console.log(JSON.stringify(messageArray));
while(!check){
 user = prompt("Enter your name");
 if(user!=""){
	 check = true;
 }
}

function getPreviousMessages(){
	
	var request = new XMLHttpRequest();
	request.open("GET","/getPreviousMessages");
	
	request.addEventListener("load",function(){
			var t = request.responseText;;
			if(t!=""){
			
			
				messageArray = JSON.parse(t);
				//console.log(messageArray[1]);
			
			}
			drawTheTextArea();
			
		});
		request.send();

}
	

var h1 = document.createElement('h2');
h1.innerHTML = "Welcome "+user;

wrapper.appendChild(h1);


var tf = document.createElement('input');
tf.type = "text";
tf.maxlength = "4";
tf.size="148";
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
wrapper.appendChild(document.createElement('br'));

wrapper.appendChild(clear);


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
setInterval(getPreviousMessages, 1000);
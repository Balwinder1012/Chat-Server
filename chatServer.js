var http = require('http');
var fs = require('fs');
var url = require('url');

var messages = [];
var UserList = [];
getData();
console.log(messages);


var obj = new Object();
obj.name = "Balwinder";
obj.email = "balwinder1012@gmail.com";
obj.pwd = "saini"
obj.type = "admin";


if(notAlready())
	UserList.push(obj);

console.log(JSON.stringify(UserList));

function serveTheHtmlFile(response,fileName){
	
	
	
	fs.readFile(fileName,function(err,data){
		if(err)
			console.log("Error in Reading");
		else{
			response.writeHead(200,{"Content-Type":"text/html"});
			response.write(data);
			console.log("html file sent");
		}
		response.end();
	});
		
	
}
function serveTheJSFile(response,fileName){
	

		fs.readFile(fileName,function(err,data){

			if(err){
				console.log("Error in reading the file");
			}
			else{
				response.writeHead(200,{"Content-Type":"text/js"});
				response.write(data);
			}
			response.end();
			});
	
	
}

function getData(){
	fs.readFile("dataFile.txt", 'utf8', function (err, data) {
		if (err) 
			console.log("Error");
    	
		else{	
			if(data!=""){
				var temp = JSON.parse(data);
				console.log(temp.length+temp);
				for(var i=0;i<temp.length;i++)
					messages.push(temp[i]);
				
			}
			else{
				console.log("file is empty");
			}
	}});
	
	fs.readFile("UserList.txt", 'utf8', function (err, data) {
		if (err) 
			console.log("Error");
    	
		else{	
			if(data!=""){
				var temp = JSON.parse(data);
				console.log(temp.length+temp);
				for(var i=0;i<temp.length;i++)
					if(notAlready1(temp[i])){
						UserList.push(temp[i]);
					}
				updateFile();
			}
			else{
				
				if(notAlready()){
				UserList.push(obj);
				updateFile();
				}
				console.log("User file is empty");
			}
	}});
}
function notAlready1(temp){
	for(x in UserList){
		if(UserList[x].email==temp.email)
			return false;
	}
	return true;
}
function notAlready(){
	
	for(x in UserList){
		if(UserList[x].email==obj.email)
			return false;
	}
	return true;
}
function getPreviousMessages(response){
	/*
	fs.readFile("dataFile.txt", 'utf8', function (err, data) {
		if (err) 
			console.log("Error");
    	
		else{	
			if(data!=""){
				
				response.end(JSON.parse(messages));
			}
			
		}
		response.end();
	});
	*/
				if(messages.length){
			//		console.log("checking"+messages[0].msg);
				//	console.log("checking"+messages[1].msg);
				response.end(JSON.stringify(messages));
				}
				else
					response.end("");
	
}

function updateFile(){
	fs.writeFile('dataFile.txt','', function(){console.log('done')})
	fs.writeFile("dataFile.txt",JSON.stringify(messages),function(err){
					if(err)
						console.log("error in writing");
	});
	fs.writeFile('UserList.txt','', function(){console.log('done')})
	console.log("inserting in file "+JSON.stringify(UserList));
	fs.writeFile("UserList.txt",JSON.stringify(UserList),function(err){
					if(err)
						console.log("error in writing");
	});
	
	
}
function sendTheMessage(request,response){
	var body="";
		request.on('data',function(d){
			body+=d;
		});
		
		
		request.on('end',function(){
			if(body){
				//var msgs = JSON.parse(body);
				var msgs = JSON.parse(body);
				
				messages.push(msgs);
				console.log("msgs size"+messages.length);
				console.log(messages);
				updateFile();
				
			}
			response.end();
		});
	
}


function deleteAllMsgs(response){
	
	messages = [];
	updateFile();
	
	
}

function getUserList(response){
	if(UserList.length){
			//		console.log("checking"+messages[0].msg);
				//	console.log("checking"+messages[1].msg);
				response.end(JSON.stringify(UserList));
				}
				else
					response.end("");
	
	
	
}
function registerTheUser(request,response){
		var body="";
		request.on('data',function(d){
			body+=d;
		});
		
		
		request.on('end',function(){
			if(body){
				body = JSON.parse(body);
				
				if(notAlready1(body))
				UserList.push(body);
				
				updateFile();
				
				
			}
			response.end();
		});
	
	
}
function handleRequests(request,response){
	
	var pathName = url.parse(request.url).pathname;
	console.log(pathName);
	if(request.method==="GET" && pathName==="/")
		serveTheHtmlFile(response,"pageFirst.html");
	if(request.method=="GET" && pathName==="/pageFirst.js")
	{
		fs.readFile("pageFirst.js",function(err,data){

			if(err){
				console.log("Error in reading the js file");
			}
			else{
				response.writeHead(200,{"Content-Type":"text/js"});
				response.write(data);
			}
			response.end();
			});
	}
	if(request.method=="POST" && pathName==="/sentMessage")
		sendTheMessage(request,response);
	if(request.method==="GET" && pathName==="/getPreviousMessages")
		getPreviousMessages(response);
	
	
	if(request.method==="GET" && pathName==="/deleteAllMsgs")
		deleteAllMsgs(response);
	

	if(request.method=="GET" && pathName==="/getUserList")
		getUserList(response);
	
	if(request.method=="GET" && pathName==="/getUserList")
		getUserList(response);
	if(request.method=="POST" && pathName==="/userRegistration")
		registerTheUser(request,response);
	
	
}
var server = http.createServer(handleRequests);
server.listen(process.env.PORT || 5000)
console.log("Server Initialized at Port Number 5000");


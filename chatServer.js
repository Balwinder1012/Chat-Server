var http = require('http');
var fs = require('fs');
var url = require('url');

var messages = [];
getData();
console.log(messages);
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
	fs.writeFile('dataFile.txt', '', function(){console.log('done')})
	fs.writeFile("dataFile.txt",JSON.stringify(messages),function(err){
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
	
	
	
	
}
var server = http.createServer(handleRequests);
server.listen(process.env.PORT || 5000)
console.log("Server Initialized at Port Number 8080");


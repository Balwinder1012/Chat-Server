var http = require('http');
var fs = require('fs');
var url = require('url');


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

function handleRequests(request,response){
	
	var pathName = url.parse(request.url).pathname;
	console.log(pathName);
	if(request.method==="GET" && pathName==="/")
		serveTheHtmlFile(response,"pageFirst.html");
	if(request.method=="GET" && pathName==="/pageFirst.js")
	{
		fs.readFile("index.js",function(err,data){

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

	
	
	
}
var server = http.createServer(handleRequests);
server.listen("5000");
console.log("Server Initialized at Port Number 5000");


const Mail = require('./lib/mail');
const http = require("http");
const fs = require('fs');
const path = require('path');
const handleMail = require('./app');

http.createServer((request, response) => {
  console.log('debugger')
  const { method, url } = request;
  if (url.includes('source')) {
    fs.readFile(__dirname.replace('backend', 'public') + request.url, function (err,data) {
      if (err) {
        response.writeHead(404);
        response.end(JSON.stringify(err));
        return;
      }
      response.writeHead(200);
      response.end(data);
    });

    return;
  }

  if (url === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    const fileName = path.join(__dirname.replace('/backend','/public'), '/index.html');
    fs.readFile(fileName, null, (error, data) => {
      if (error) {
          response.writeHead(404);
          respone.write(JSON.stringify({ "status": 404, "message": "Whoops! File not found!" }));
      } else {
          response.write(data);
      }
      response.end();
    });
    return;
  }
  
  handleMail(require, response);
   
}).listen(3310);
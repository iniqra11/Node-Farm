// Creating a simple web server
const http = require('http'); // this module gives networking capabilities
const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
// We can use syncronous function to read here because it is a top level code and would be executed once and not for every request
const dataObjects = JSON.parse(data);

// Creating a server

const server = http.createServer((request,response) => {

    const path = request.url;
    switch(path)
    {
        case '/overview':
            response.end('Overview');
            break;
        case '/product':
            response.end('Product');
            break;
        case '/':
            response.end('Overview');
            console.log(__dirname);
            break;
        case '/api':
           
            response.writeHead(200, { 'Content-type': 'application/json'});
            response.end(data);
            break;

        default: 
        response.writeHead(404, {
            'Content-type':'text/html',
            'my-header':'hello-world'
        });
        response.end('<h1>Page not found!</h1>');
    }
});

//Listening for request

server.listen(3000,'localhost',() => {
    console.log('Listening to requests on 3000');
});

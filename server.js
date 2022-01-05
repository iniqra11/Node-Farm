// Creating a simple web server
const http = require('http'); // this module gives networking capabilities
const fs = require('fs');
const { report } = require('process');

// For parsing the url and getting the request params
const url = require('url');

// We can use syncronous function to read here because it is a top level code and would be executed once and not for every request

const replaceTemplate = require('./modules/replaceTemplate'); // Importing our own module
// Reading the html templates to render the view
const overviewTemplate = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const cardTemplate = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const productTemplate = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');

const dataObjects = JSON.parse(data); // Array of 5 objects


// Creating a server

const server = http.createServer((request,response) => {

    console.log(url.parse(request.url,true));

    /*
    when request.url is /product?id=1, then we parse it using the url module,
    query -> {id : '0'}
    pathname -> /product

    */
    const {query, pathname} = url.parse(request.url,true); // var name must be the same as in the returned object by url.parse

    
    switch(pathname)
    {
        case '/overview':
            // Overview Page
            response.writeHead(200,{'Content-type':'text/html'})

            let cardHtml = dataObjects.map(el => replaceTemplate(cardTemplate,el));
            console.log(cardHtml); // cardHtml is an array
            // Converting to string
            cardHtml = cardHtml.join('');
            const output = overviewTemplate.replace(/{%PRODUCT_CARDS%}/g,cardHtml);
            response.end(output);
            break;
        case '/product':
            console.log(query);
            const product = dataObjects[query.id];
            response.writeHead(200,{'Content-type':'text/html'});
            const productDetails = replaceTemplate(productTemplate,product);
            response.end(productDetails);
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

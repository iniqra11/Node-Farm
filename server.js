// Creating a simple web server
const http = require('http'); // this module gives networking capabilities
const fs = require('fs');
const { report } = require('process');

// We can use syncronous function to read here because it is a top level code and would be executed once and not for every request

// Reading the html templates to render the view
const overviewTemplate = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const cardTemplate = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const productTemplate = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');

const dataObjects = JSON.parse(data); // Array of 5 objects

const replaceTemplate = (template,product) =>
{
    let output = template.replace(/{%PRODUCT_NAME%}/g,product.productName); // /{%PRODUCT_NAME%}/g would replace all occurrences not just once
    output = output.replace(/{%PRODUCT_IMAGE%}/g,product.image);
    output = output.replace( /{%PRODUCT_QUANTITY%}/g,product.quantity);
    output = output.replace( /{%PRODUCT_NUTRIENTS%}/g,product.nutrients);
    output = output.replace( /{%PRODUCT_PRICE%}/g,product.price);
    output = output.replace( /{%PRODUCT_FROM%}/g,product.from);
    output = output.replace( /{%PRODUCT_DESCRIPTION%}/g,product.description);
    output = output.replace(/{%PRODUCT_ID%}/g,product.id);

    if(!product.organic)
    {
        output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
    }
    return output;


}

// Creating a server

const server = http.createServer((request,response) => {

    const path = request.url;
    switch(path)
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

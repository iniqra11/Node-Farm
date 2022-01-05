const fs = require('fs');

// This returns an object which has very various functions for working with files

console.log(fs);

const textInput = fs.readFileSync('./txt/input.txt','utf-8'); 

// Important to specify the encoding to get a string value otherwise a buffer is returned

console.log(textInput);

const textOutput = `This is what we know : ${textInput}. \n Created on ${Date.now()}`;

// Any JS manipulation is valid within these {}
fs.writeFileSync('./txt/output.txt',textOutput);
console.log('File written!');




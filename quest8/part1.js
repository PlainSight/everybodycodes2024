var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8');

var blocks = parseInt(input);

var height = Math.ceil(Math.sqrt(blocks));

var width = height*2 - 1;

var remaining = height*height - blocks;

console.log(remaining * width);
var fs = require('fs');

var input = fs.readFileSync('./input3.txt', 'utf8').split('\r\n').map(n => parseInt(n));

var avg = input.sort((a, b) => b - a)[Math.floor(input.length/2)];

var sum = input.map(n => Math.abs(n - avg)).reduce((a, c) => a + c, 0);

console.log(sum);
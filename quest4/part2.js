var fs = require('fs');

var input = fs.readFileSync('./input2.txt', 'utf8').split('\r\n').map(n => parseInt(n));

var min = Math.min(...input);

var sum = input.map(n => n - min).reduce((a, c) => a + c, 0);

console.log(sum);
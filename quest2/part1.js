var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n').filter(n => n);

var words = input[0].split(/[,:]/).slice(1);
var inscr = input[1];

var count = 0;

words.forEach(w => {
	var matches = inscr.match(new RegExp(w, 'g'));
	count += matches.length;
});

console.log(count);
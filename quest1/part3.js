var fs = require('fs');

var input = fs.readFileSync('./input3.txt', 'utf8').split('');

var potions = 0;

var pots = (e) => {
	switch (e) {
		case 'A':
			return 0;
		break;
		case 'B':
			return 1;
		break;
		case 'C':
			return 3;
		break;
		case 'D':
			return 5;
		break;
		default:
			return -1;
		break;
	}
}

for(i = 0; i < input.length; i+=3) {
	var vals = [pots(input[i]), pots(input[i+1]), pots(input[i+2])];
	
	var present = vals.filter(v => v >= 0);
	
	var bat = present.length*(present.length-1) + present.reduce((a, c) => { return c + a; }, 0);
	potions += bat;
}

console.log(potions);
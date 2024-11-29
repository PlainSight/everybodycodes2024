var fs = require('fs');

var input = fs.readFileSync('./input2.txt', 'utf8').split('');

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

for(i = 0; i < input.length; i+=2) {
	var c = pots(input[i]);
	var cc = pots(input[i+1]);
	
	if (c >= 0 && cc >= 0) {
		potions += 2 + c + cc;
	} else {
		if (c >= 0 || cc >= 0) {
			potions += Math.max(c, cc);
		}
	}
}

console.log(potions);
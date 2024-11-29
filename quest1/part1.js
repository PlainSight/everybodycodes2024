var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('');

var potions = 0;

input.forEach(i => {
	switch (i) {
		case 'B':
			potions++;
		break;
		case 'C':
			potions += 3;
		break;
		default:
		break;
	}
});

console.log(potions);
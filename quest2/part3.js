var fs = require('fs');

var input = fs.readFileSync('./input3.txt', 'utf8').split('\r\n\r\n').filter(n => n);

var words = input[0].split(/[,:]/).slice(1);
var inscrs = input[1].split('\r\n');

rev = (w) => {
	var res = '';
	w.split('').forEach(c => {
		res = c + res;
	});
	return res;
}

var indexes = {};

var lines = inscrs.length;
var maxLineLen = Math.max(...inscrs.map(i => i.length));

console.log(lines, maxLineLen);

var loop = (x, y) => {
	if (x < 0) {
		x += maxLineLen;
	}
	// if (y < 0) {
	// 	y += lines;
	// }
	// if (y >= lines) {
	// 	y -= lines;
	// }
	if (x >= maxLineLen) {
		x -= maxLineLen;
	}
	return [x, y];
}

var k = (x, y) => {
	if (x < 0) {
		x += maxLineLen;
	}
	// if (y < 0) {
	// 	y += lines;
	// }
	// if (y >= lines) {
	// 	y -= lines;
	// }
	if (x >= maxLineLen) {
		x -= maxLineLen;
	}
	return x + y*maxLineLen;
}

var dirs = [
	[0, 1],
	[0, -1],
	[1, 0],
	[-1, 0],
];

for(var y = 0; y < lines; y++) {
	for (var x = 0; x < maxLineLen; x++) {
		dirs.forEach(d => {
			words.forEach(w => {
				var matching = true;
				var matchingIn = [];
				w.split('').forEach((c, ci) => {
					var xpos = x + d[0]*ci;
					var ypos = y + d[1]*ci;
					var l = loop(xpos, ypos);
					matching = matching && inscrs[l[1]] && inscrs[l[1]][l[0]] == c;
					matchingIn.push([l[0], l[1]]);
				});
				if (matching) {
					matchingIn.forEach(r => {
						indexes[k(r[0], r[1])] = true;
					})
				}
			})
		})
	}
}

console.log(Object.keys(indexes).length);
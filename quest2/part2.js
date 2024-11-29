var fs = require('fs');

var input = fs.readFileSync('./input2.txt', 'utf8').split('\r\n\r\n').filter(n => n);

var words = input[0].split(/[,:]/).slice(1);
var inscrs = input[1].split('\r\n');

var count = 0;

rev = (w) => {
	var res = '';
	w.split('').forEach(c => {
		res = c + res;
	});
	return res;
}

inscrs.forEach((ins) => {
	var indexes = {};
	words.forEach(w => {
		var reg = new RegExp(w, 'g');
		var rreg = new RegExp(rev(w), 'g');
		
		while((m = reg.exec(ins)) != null) {
			reg.lastIndex -= (w.length-1);
			for(var i = 0; i < w.length; i++) {
				indexes[m.index + i] = true;
			}
		}

		while((m = rreg.exec(ins)) != null) {
			rreg.lastIndex -= (w.length-1);
			for(var i = 0; i < w.length; i++) {
				indexes[m.index + i] = true;
			}
		}
	});
	count += Object.keys(indexes).length;
});


console.log(count);
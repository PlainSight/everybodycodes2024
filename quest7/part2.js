var fs = require('fs');

var input = fs.readFileSync('./input2.txt', 'utf8').split('\r\n\r\n');

var track = input[1].split('\r\n').map(n => n.split(''));

var course = [];

var ds = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1]
];

var x = 0;
var y = 0;

ds.forEach(d => {
    var nx = x + d[0];
    var ny = y + d[1];
    while(track[ny] && track[ny][nx]) {
        x = nx;
        y = ny;
        course.push(track[y][x]);
        nx += d[0];
        ny += d[1];
    }
});

var loops = 10;

var plans = [];

input[0].split('\r\n').forEach(i => {
    var ps = i.split(/[:,]/);
    var name = ps[0];
    var steps = ps.slice(1);
    plans.push({ n:name, s: steps });
});

var sim = (p) => {
    var power = 10;
    var total = 0;
    for(var i = 0; i < loops*course.length; i++) {

        var ci = course[i % course.length];

        if (ci == '+') {
            power++;
        } else {
            if (ci == '-') {
                power--;
            } else {
                switch(p.s[i % p.s.length]) {
                    case '+':
                        power++;
                        break;
                    case '-':
                        power--;
                        break;
                }
            }
        }
        
        if (power < 0) {
            power = 0;
        }
        total += power;
    }
    p.score = total;
    return power;
};

plans.forEach(p => {
    sim(p);
});

var res = plans.sort((a, b) => b.score - a.score).map(a => a.n).join('');

console.log(res);
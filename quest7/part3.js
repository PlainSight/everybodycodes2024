var fs = require('fs');

var input = fs.readFileSync('./input3.txt', 'utf8').split('\r\n\r\n');

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
var lastDirI = -50;

while(course.length == 0 || (track[y][x] != 'S')) {
    ds.forEach((d, di) => {
        if (Math.abs(di - lastDirI) != 2) {
            var nx = x + d[0];
            var ny = y + d[1];
            if(track[ny] && track[ny][nx] && track[ny][nx] != ' ') {
                x = nx;
                y = ny;
                course.push(track[y][x]);
                lastDirI = di;
                nx += d[0];
                ny += d[1];
            }
        }
    });
}

console.log(course);

var loops = 2024;

var plan;

input[0].split('\r\n').forEach(i => {
    var ps = i.split(/[:,]/);
    var name = ps[0];
    var steps = ps.slice(1);
    plan = ({ n:name, s: steps });
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

sim(plan);

var scoreToBeat = plan.score;

console.log(scoreToBeat);

var uniquePlans = {};
var chars = ['+', '-', '='];

for(var i = 0; i < Math.pow(3, 11); i++) {
    var amounts = [5, 3, 3];
    var p = '';
    var pid = i;

    for(var n = 0; n < 11; n++) {
        var s = pid % 3;
        pid = Math.floor(pid/3);
        if (amounts[s] > 0) {
            p += chars[s];
            amounts[s]--;
        } else {
            if (amounts[(s+1)%3] > 0) {
                p += chars[(s+1)%3];
                amounts[(s+1)%3]--;
            } else {
                if (amounts[(s+2)%3] > 0) {
                    p += chars[(s+2)%3];
                    amounts[(s+2)%3]--;
                }
            }
        }
    }
    uniquePlans[p] = p;
}

var plans = Object.values(uniquePlans);

var winningStrats = 0;

plans.forEach(p => {
    var t = {
        n: 'x',
        s: p.split('')
    };
    sim(t);
    if (t.score > scoreToBeat) {
        winningStrats++;
    }
});

console.log(winningStrats);
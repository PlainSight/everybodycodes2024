var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var segments = 10;

var plans = [];

input.forEach(i => {
    var ps = i.split(/[:,]/);
    var name = ps[0];
    var steps = ps.slice(1);
    plans.push({ n:name, s: steps });
});

var sim = (p) => {
    var power = 10;
    var total = 0;
    for(var i = 0; i < segments; i++) {
        switch(p.s[i % p.s.length]) {
            case '+':
                power++;
                break;
            case '-':
                power--;
                break;
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
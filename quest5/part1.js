var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n').map(n => n.split(' '));

var cols = [];

input.forEach((n) => {
    n.forEach((m, i) => {
        cols[i] = (cols[i] || []);
        cols[i].push(m);
    });
});

function sim(round) {
    var origin = round % cols.length;
    var dest = (round + 1) % cols.length;
    var clapper = cols[origin].shift();
    cols[dest].splice(clapper-1, 0, clapper);

    // console.log(round);
    // for(var i = 0; i < cols.reduce((a, c) => Math.max(a, c.length), 0); i++) {
    //     console.log(cols.map(c => c[i] || ' ').join(''));
    // }

    return cols.map(c => c[0] || ' ').join('');
}

var res = '';

for(var i = 0; i < 10; i++) {
    res = sim(i);
}

console.log(res);
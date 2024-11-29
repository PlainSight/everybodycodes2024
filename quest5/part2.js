var fs = require('fs');

var input = fs.readFileSync('./input2.txt', 'utf8').split('\r\n').map(n => n.split(' '));

var cols = [];

input.forEach((n) => {
    n.forEach((m, i) => {
        cols[i] = (cols[i] || []);
        cols[i].push(m);
    });
});

var size = input[0].length;

var results = {};

function sim(round) {
    var origin = round % size;
    var dest = (round + 1) % size;
    var clapper = cols[origin].shift();

    var claps = clapper % (cols[dest].length*2);

    if (claps == 0) {
        cols[dest].splice(1, 0, clapper);
    } else {
        if (claps <= cols[dest].length) {
            cols[dest].splice(claps-1, 0, clapper);
        } else {
            claps -= cols[dest].length;
            cols[dest].splice(cols[dest].length-(claps-1), 0, clapper);
        }
    }
   
    // console.log(round);
    // for(var i = 0; i < cols.reduce((a, c) => Math.max(a, c.length), 0); i++) {
    //     console.log(cols.map(c => c[i] || ' ').join(''));
    // }

    return cols.map(c => c[0] || ' ').join('');
}

var final = 0;

for(var i = 0; true; i++) {
    var res = sim(i);
    results[res] = results[res] || 0;
    results[res]++;

    if (results[res] == 2024) {
        final = (i+1) * parseInt(res);
        break;
    }
}

console.log(final);
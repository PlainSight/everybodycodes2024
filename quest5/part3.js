var fs = require('fs');

var input = fs.readFileSync('./input3.txt', 'utf8').split('\r\n').map(n => n.split(' '));

var cols = [];

input.forEach((n) => {
    n.forEach((m, i) => {
        cols[i] = (cols[i] || []);
        cols[i].push(m);
    });
});

var stateHash = {};
var largestNumber = 0;

var size = input[0].length;

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
   
    var hashString = origin + '!' + cols.map(c => c.join(',')).join(':');

    var seen = stateHash[hashString];

    stateHash[hashString] = true;
    
    var num = parseInt(cols.map(c => c[0] || ' ').join(''));
    if (num > largestNumber) {
        largestNumber = num;
    }

    return seen;
}

for(var i = 0; true; i++) {
    if(sim(i)) {
        break;
    }
}

console.log(largestNumber);
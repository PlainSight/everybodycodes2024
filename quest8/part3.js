var fs = require('fs');

var input = fs.readFileSync('./input3.txt', 'utf8');

var hp = parseInt(input);
var hpa = 10;
var blocks = 202400000;

var nextThick = (currentThick) => {
    return hpa + (currentThick * hp) % hpa;
}

var leftEmpty = (width, colHeight) => {
    return (hp * width * colHeight) % hpa;
}

var blocksReq = 1;
var width = 1;
var thick = 1;
var cols = [1];
var exceeds = false;

while(!exceeds) {
    while(blocksReq < blocks) {
        width += 2;
        thick = nextThick(thick);
    
        blocksReq += thick * width;
    
        cols.unshift(0, 0);
        cols = cols.map(c => c+thick);
    }
    var toRemove = 0;
    cols.slice(2).forEach(c => {
        toRemove += leftEmpty(width, c);
    });
    if (blocksReq - toRemove < blocks) {
        exceeds = false;
    } else {
        exceeds = true;
    }
}

var toActuallyRemove = 0;

console.log(cols);

cols.slice(2).forEach(c => {
    toActuallyRemove += leftEmpty(width, c);
});

blocksReq -= toActuallyRemove;


console.log(blocksReq - blocks);

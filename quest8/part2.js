var fs = require('fs');

var input = fs.readFileSync('./input2.txt', 'utf8');

var priests = parseInt(input);

var blocks = 20240000;

var nextThick = (currentThick) => {
    return (currentThick * priests) % 1111;
}

var blocksReq = 0;
var width = 1;
var thick = 1;

while(blocksReq < blocks) {
    blocksReq += thick * width;

    thick = nextThick(thick);
    width += 2;
}

var actualWidth = width - 2;
var blocksRemaining = blocksReq - blocks;

console.log(actualWidth * blocksRemaining);

var fs = require('fs');

var input = fs.readFileSync('./input2.txt', 'utf8').split('\r\n');

var heightMap = input.map(i => i.split('').map(c => c == '.' ? 0 : 1));

var ds = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0]
];

function neighboursAtLeastDepth(x, y, h) {
    var res = true;
    ds.forEach(d => {
        if (heightMap[y+d[0]][x+d[1]] < h) {
            res = false;
        }
    });
    return res;
}

var changed = true;
var iter = 0;
while(changed) {
    console.log(iter);
    console.log(heightMap.map(h => h.join('')).join('\r\n'));
    iter++
    changed = false;
    for (var x = 1; x < heightMap[0].length-1; x++) {
        for(var y = 1; y < heightMap.length-1; y++) {
            if (neighboursAtLeastDepth(x, y, heightMap[y][x]) && heightMap[y][x]) {
                heightMap[y][x]++;
                changed = true;
            }
        }
    }
}

var total = heightMap.reduce((a, c) => {
    return a + c.reduce((aa, cc) => {
        return aa + cc;
    }, 0)
}, 0);

console.log(total);
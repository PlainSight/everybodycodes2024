var fs = require('fs');

var input = fs.readFileSync('./input2.txt', 'utf8').split('\r\n');

var childParent = {};

var fruitParents = [];

input.forEach(i => {
    var parts = i.split(/[:,]/);
    var nodeName = parts[0];
    var children = parts.slice(1);
    children.forEach(c => {
        if (c != '@') {
            childParent[c] = nodeName;
        } else {
            fruitParents.push(nodeName);
        }
    });
});

var walk = (node, seen, count) => {
    if (node == 'RR') {
        return {
            count: count,
            seen: node[0]+seen
        }
    }
    var next = childParent[node];
    return walk(next, node[0]+seen, count+1);
}

var allCounts = {};

fruitParents.forEach(fp => {
    var res = walk(fp, '@', 1);
    
    allCounts[res.count] = allCounts[res.count] || [];
    allCounts[res.count].push(res);
})

console.log(Object.values(allCounts).filter(c => c.length == 1));
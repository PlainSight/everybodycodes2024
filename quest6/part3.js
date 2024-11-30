var fs = require('fs');

var input = fs.readFileSync('./input3.txt', 'utf8').split('\r\n');

var childParent = {};

var fruitParents = [];

var cache = {
    'RR': {
        seen: 'R',
        count: 1
    }
};

input.forEach(i => {
    var parts = i.split(/[:,]/);
    var nodeName = parts[0];
    var children = parts.slice(1);
    if (!['ANT', 'BUG'].includes(nodeName)) {
        children.forEach(c => {
            if (c != '@') {
                childParent[c] = nodeName;
            } else {
                fruitParents.push(nodeName);
            }
        });
    }
});

var walk = (node) => {
    var current = node;
    var seen = '';
    var count = 0;
    var stack = [];

    while(true) {
        if (cache[current]) {
            seen = cache[current].seen;
            count = cache[current].count;
            break;
        }
        
        stack.push(current);
        current = childParent[current];
    }

    while(stack.length) {
        var ts = stack.pop();
        seen = seen + ts[0];
        count = 1 + count;
        cache[ts] = {
            seen: seen,
            count: count
        }
    }

    return {
        count: count,
        seen: seen+'@'
    }
}

var allCounts = {};

fruitParents.forEach(fp => {
    var res = walk(fp);
    
    allCounts[res.count] = allCounts[res.count] || [];
    allCounts[res.count].push(res);
})

console.log(cache);
console.log(Object.values(allCounts).filter(c => c.length == 1));
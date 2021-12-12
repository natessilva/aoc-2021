const fs = require('fs')
const { format } = require('path/posix')
const data = fs.readFileSync("./input.txt").toString()
const edges = data.split('\n').map(line => line.split('-'))

const nodes = new Map
edges.forEach(([from, to]) => {
    if (!nodes.has(from)) {
        nodes.set(from, new Set());
    }
    nodes.get(from).add(to);
    if (!nodes.has(to)) {
        nodes.set(to, new Set());
    }
    nodes.get(to).add(from);
});

console.log(numberPaths('start', 'end', new Map(), false))

function numberPaths(start, end, marked, twice) {
    if (start == end) {
        return 1;
    }
    if (marked.has(start) && marked.get(start) > 0) {
        if (twice) {
            return 0;
        } else {
            twice = true
        }
    }
    if (start == start.toLowerCase()) {
        marked.set(start, (marked.get(start) || 0) + 1)
    }
    const neighbors = Array.from(nodes.get(start).keys()).filter(key => key != 'start').sort();
    const res = neighbors.map(n => numberPaths(n, end, marked, twice)).reduce((a, b) => a + b, 0);
    marked.set(start, marked.get(start) - 1);
    return res;
}
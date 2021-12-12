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

console.log(numberPaths('start', 'end', new Set()))

function numberPaths(start, end, marked) {
    if (start == end) {
        return 1;
    }
    if (marked.has(start)) {
        return 0;
    }
    if (start == start.toLowerCase()) {
        marked.add(start)
    }
    const neighbors = Array.from(nodes.get(start).keys());
    const res = neighbors.map(n => numberPaths(n, end, marked)).reduce((a, b) => a + b, 0);
    marked.delete(start);
    return res;
}
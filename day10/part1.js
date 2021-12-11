const fs = require('fs')
const data = fs.readFileSync("./input.txt").toString()
const lines = data.split('\n').map(line => line.split(''))
const opens = ['(', '[', '{', '<'];
const closes = [')', ']', '}', '>'];
const points = [3, 57, 1197, 25137];

console.log(lines.map(line => {
    const stack = [];
    for (let i = 0; i < line.length; i++) {
        const char = line[i]
        if (opens.includes(char)) {
            stack.push(opens.findIndex(i => i == char))
            continue;
        }
        const closeIndex = closes.findIndex(i => i == char);
        const top = stack.pop();
        if (closeIndex != top) {
            console.log(line.join(''), 'wanted', closes[top], 'got', char)
            return closeIndex
        }
    }
}).filter(a => a != null).map(a => points[a]).reduce((a, b) => a + b, 0))
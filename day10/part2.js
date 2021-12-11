const fs = require('fs');
const { start } = require('repl');
const data = fs.readFileSync("./input.txt").toString()
const lines = data.split('\n').map(line => line.split(''))
const opens = ['(', '[', '{', '<'];
const closes = [')', ']', '}', '>'];
const points = [1, 2, 3, 4];

const scores = lines.map(line => {
    const stack = [];
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (opens.includes(char)) {
            stack.push(opens.findIndex(i => i == char));
            continue;
        }
        const closeIndex = closes.findIndex(i => i == char);
        const top = stack.pop();
        if (closeIndex != top) {
            return null;
        }
    }
    return stack.reverse().map(i => points[i]).reduce((a, b) => a * 5 + b, 0);
}).filter(a => a != null).sort((a, b) => a - b);
console.log(scores[Math.floor(scores.length / 2)])
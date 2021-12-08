const fs = require('fs')
const data = fs.readFileSync("./input.txt").toString()

const lines = data.split('\n')
console.log(lines.map(line => {
    const [values, output] = line.split(' | ')
    return output.split(' ').map(o => [2, 3, 4, 7].includes(o.length)).filter(a => a).length
}).reduce((a, b) => a + b, 0));
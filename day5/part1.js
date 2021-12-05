const fs = require('fs')
const data = fs.readFileSync("./input.txt").toString()
const points = {};
data.split('\n').forEach(line => {
    const [from, to] = line.split(' -> ')
    const [x1, y1] = from.split(',').map(Number)
    const [x2, y2] = to.split(',').map(Number)
    if (x1 != x2 && y1 != y2) {
        return
    }
    if (x1 == x2) {
        const start = y1 < y2 ? y1 : y2;
        const end = start == y1 ? y2 : y1;
        for (let i = start; i <= end; i++) {
            const v = points[`${x1},${i}`] || 0
            points[`${x1},${i}`] = v + 1
        }
        return
    }
    if (y1 == y2) {
        const start = x1 < x2 ? x1 : x2;
        const end = start == x1 ? x2 : x1;
        for (let i = start; i <= end; i++) {
            const v = points[`${i},${y1}`] || 0
            points[`${i},${y1}`] = v + 1
        }
        return
    }
})
console.log(Array.from(Object.keys(points)).filter(key => points[key] > 1).length);
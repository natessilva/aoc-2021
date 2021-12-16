const fs = require('fs')
const data = fs.readFileSync("./input.txt").toString()

const values = data.split('\n').map(line => line.split('').map(Number));

console.log(values.length - 1, values[0].length - 1)

const results = new Map();
const endKey = `${values.length - 1},${values[0].length - 1}`;
const q = [{
    i: 0,
    j: 0,
    dist: 0,
}]

while (q.length) {
    const index = q.reduce((a, b, i) => q[a].dist < b.dist ? a : i, 0)
    const { i, j, dist } = q[index];
    console.log('visiting', i, j)
    q.splice(index, 1)
    const key = `${i},${j}`;
    if (results.has(key)) {
        continue;
    }
    if (key == endKey) {
        console.log(dist);
        break;
    }
    results.set(key, dist);


    q.push(...[
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ].map(([ii, jj]) => ({ i: i + ii, j: j + jj }))
        .filter(({ i, j }) => (values[i] || [])[j] != null)
        .filter(({ i, j }) => !results.has(`${i},${j}`))
        .map(({ i, j }) => ({ i, j, dist: dist + values[i][j] })));
}
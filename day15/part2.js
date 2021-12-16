const fs = require('fs')
const data = fs.readFileSync("./input.txt").toString()

const smallValues = data.split('\n').map(line => line.split('').map(Number));
const values = new Array(smallValues.length * 5).fill(null).map(() => []);

let lineValues = smallValues;
for (let i = 0; i < 5; i++) {
    let rowValues = lineValues;
    for (let j = 0; j < 5; j++) {
        rowValues.forEach((line, ii) => line.forEach((value, jj) => {
            values[i * smallValues.length + ii][j * smallValues[0].length + jj] = value;
        }))
        rowValues = plus1(rowValues);
    }
    lineValues = plus1(lineValues);
}

function plus1(values, by) {
    return values.map(line => line.map(value => value + 1 > 9 ? 1 : value + 1))
}

// console.log(values.length - 1, values[0].length - 1)

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
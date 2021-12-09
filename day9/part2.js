const fs = require('fs')
const data = fs.readFileSync("./input.txt").toString()

const lines = data.split('\n')
const board = lines.map(line => line.split('').map(Number));
const width = board[0].length;
const height = board.length;

const lowPoints = []
for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
        if (isLowPoint(i, j)) {
            lowPoints.push({ i, j })
        }
    }
}
const basins = lowPoints.map(({ i, j }) => {
    const value = board[i][j]
    const queue = [{ i, j }];
    const seen = {};
    let count = 0;
    while (queue.length) {
        const { i, j } = queue.shift();
        if (seen[`${i},${j}`]) {
            continue;
        }
        count++
        seen[`${i},${j}`] = true;
        const value = board[i][j]
        const directions = [
            [0, -1],
            [0, 1],
            [-1, 0],
            [1, 0],
        ]
        directions.forEach(([ii, jj]) => {
            if (i + ii < 0 || j + jj < 0) {
                return;
            }
            if (i + ii >= height || j + jj >= width) {
                return
            }
            if (board[i + ii][j + jj] != 9 && board[i + ii][j + jj] > value) {
                queue.push({ i: i + ii, j: j + jj })
            }
        })
    }
    return count
})
console.log(basins.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a * b, 1))

function isLowPoint(i, j) {
    for (let ii = -1; ii < 2; ii++) {
        for (let jj = -1; jj < 2; jj++) {
            if (ii == 0 && jj == 0) {
                continue;
            }
            if (i + ii < 0 || j + jj < 0) {
                continue;
            }
            if (i + ii >= height || j + jj >= width) {
                continue
            }
            if (board[i + ii][j + jj] <= board[i][j]) {
                return false
            }
        }
    }
    return true
}
const fs = require('fs')
const data = fs.readFileSync("./input.txt").toString()

const lines = data.split('\n')
const board = lines.map(line => line.split(''));
const width = board[0].length;
const height = board.length;

const lowPoints = []
for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
        if (isLowPoint(i, j)) {
            lowPoints.push(+(board[i][j]) + 1)
        }
    }
}
console.log(lowPoints.reduce((a, b) => a + b, 0))

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
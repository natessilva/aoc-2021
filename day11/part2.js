const fs = require('fs')
const data = fs.readFileSync("./input.txt").toString()
const board = data.split('\n').map(line => line.split('').map(Number));
let newBoard = board;

// console.log(board.map(line => line.map(String).join('')).join('\n'));
const totalOctopi = board.length * board[0].length;
let flashCount = 0;
for (let i = 0; true; i++) {
    const currentFlashCount = flashCount;
    newBoard = step(newBoard)
    const diff = flashCount - currentFlashCount;
    if (diff == totalOctopi) {
        console.log(i + 1);
        break;
    }
}
// console.log(flashCount)

function step(board) {
    const newBoard = []
    const flashes = {}
    board.forEach(line => {
        newBoard.push([...line.map(v => v + 1)])
    });
    let notDone = true;
    while (notDone) {
        notDone = false;
        newBoard.forEach((line, i) => line.forEach((v, j) => {
            const key = `${i},${j}`;
            if (v > 9 && !flashes[key]) {
                notDone = true
                // flash
                flashCount++;
                flashes[key] = true;
                for (let ii = -1; ii < 2; ii++) {
                    for (let jj = -1; jj < 2; jj++) {
                        if (ii == 0 && jj == 0) {
                            continue;
                        }
                        if (i + ii < 0 || j + jj < 0 || i + ii >= newBoard.length || j + jj >= newBoard[0].length) {
                            continue;
                        }
                        newBoard[i + ii][j + jj]++;
                    }
                }
            }
        }))
    }
    newBoard.forEach((line, i) => line.forEach((v, j) => {
        if (flashes[`${i},${j}`]) {
            newBoard[i][j] = 0;
        }
    }))
    return newBoard;
}
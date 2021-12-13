const fs = require('fs')
const data = fs.readFileSync("./input.txt").toString()

const [dots, folds] = data.split('\n\n')
let maxX = 0;
let maxY = 0;
const dotMap = new Map();
dots.split('\n').map(d => {
    const [x, y] = d.split(',').map(Number);
    if (x > maxX) {
        maxX = x
    }
    if (y > maxY) {
        maxY = y
    }
    dotMap.set(d, true);
})
let board = []
for (let i = 0; i <= maxY; i++) {
    board.push([])
    for (let j = 0; j <= maxX; j++) {
        const key = `${j},${i}`
        board[i].push(dotMap.has(key) ? '#' : '.')

    }
}

folds.split('\n').filter((_, i) => i == 0).forEach(fold => {
    const [axis, v] = fold.split('=');
    if (axis == 'fold along y') {
        board = foldY(board, +v);
    } else {
        board = foldX(board, +v);
    }
})

console.log(board.map(line => line.filter(c => c == '#').length).reduce((a, b) => a + b, 0))

function foldY(board, y) {
    const top = board.slice(0, y)
    const bottom = board.slice(y + 1)

    return top.reverse().map((line, i) => {
        return union(line, bottom[i] || [])
    }).reverse()
}

function foldX(board, x) {
    return board.map(line => {
        const left = line.slice(0, x);
        const right = line.slice(x + 1);
        return left.reverse().map((char, i) => char == '#' || right[i] == '#' ? '#' : '.')
    })
}

function union(line1, line2) {
    return line1.map((c, i) => {
        return c == '#' || line2[i] == '#' ? '#' : '.'
    })
}
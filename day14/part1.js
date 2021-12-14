const fs = require('fs')
const data = fs.readFileSync("./input.txt").toString()

const [start, ins] = data.split('\n\n')

const insertions = new Map(ins.split('\n').map(i => {
    const [pair, val] = i.split(' -> ')
    return [
        pair, val
    ]
}))

let value = start
for (let i = 0; i < 10; i++) {
    value = step(value)
}
const mc = mostCommon(value);
const lc = leastCommon(value);
console.log(+mc - +lc)

function toPairs(s) {
    const sp = s.split('')
    return sp.slice(1).map((c, i) => [sp[i], c].join(''))
}

function pairToString(pairs) {
    return pairs.map((p, i) => {
        if (i == 0) {
            return p;
        }
        return p.split('').slice(1).join('')
    }).join('')
}

function step(s) {
    const pairs = toPairs(s)
    const newPairs = pairs.map(p => {
        const i = insertions.get(p)
        if (i != null) {
            const [left, right] = p.split('');
            return [left, i, right].join('')
        }
        return p
    })
    return pairToString(newPairs);
}

function mostCommon(s) {
    m = new Map()
    let max = 0;
    let maxVal;
    s.split('').forEach(v => {
        let count = m.get(v) || 0;
        count++
        m.set(v, count);
        if (count > max) {
            max = count;
            maxVal = v
        }
    })
    return max
}

function leastCommon(s) {
    m = new Map()
    s.split('').forEach(v => {
        let count = m.get(v) || 0;
        count++
        m.set(v, count)
    })
    return Math.min(...Array.from(m.values()))
}
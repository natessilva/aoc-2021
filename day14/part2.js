const fs = require('fs')
const data = fs.readFileSync("./input.txt").toString()

const [start, ins] = data.split('\n\n')

const insertions = new Map(ins.split('\n').map(i => {
    const [pair, val] = i.split(' -> ')
    return [
        pair, val
    ]
}))

let value = pairsToMap(toPairs(start))
for (let i = 0; i < 40; i++) {
    value = step(value)
}
const l = pairsToLetters(value);
const mc = mostCommon(l);
const lc = leastCommon(l);
console.log(+mc - +lc)

function toPairs(s) {
    const sp = s.split('')
    return sp.slice(1).map((c, i) => [sp[i], c].join(''))
}

function pairsToMap(pairs) {
    const m = new Map()
    pairs.forEach(p => {
        const v = m.get(p) || 0;
        m.set(p, v + 1)
    })
    return { first: pairs[0], pairs: m };
}

function pairsToLetters({ first, pairs }) {
    const m = new Map();
    Array.from(pairs.keys()).forEach((pair) => {
        const count = pairs.get(pair)
        const [left, right] = pair.split('')
        if (pair == first) {
            m.set(left, m.has(left) ? m.get(left) + 1 : 1);
        }
        m.set(right, m.has(right) ? m.get(right) + count : count);
    })
    return m;
}

function step({ first, pairs }) {
    const result = new Map(pairs);
    Array.from(pairs.keys()).forEach(pair => {
        const count = pairs.get(pair);
        if (count == 0) {
            return;
        }
        const i = insertions.get(pair)
        if (i != null) {
            const currentCount = result.has(pair) ? result.get(pair) : count;
            result.set(pair, currentCount - count);
            const [left, right] = pair.split('');
            const leftPair = [left, i].join('');
            if (pair == first) {
                first = leftPair
            }
            const rightPair = [i, right].join('')
            result.set(leftPair, result.has(leftPair) ? result.get(leftPair) + count : count);
            result.set(rightPair, result.has(rightPair) ? result.get(rightPair) + count : count);
        }
    });
    return { first, pairs: result };
}

function mostCommon(s) {
    return Math.max(...Array.from(s.values()))
}

function leastCommon(s) {
    return Math.min(...Array.from(s.values()))
}
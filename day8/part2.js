const fs = require('fs')
const data = fs.readFileSync("./input.txt").toString()

const lines = data.split('\n')
console.log(lines.map((line, i) => {
    const [values, output] = line.split(' | ')
    const split = values.split(' ');

    const one = split.find(a => a.length == 2).split('');
    const four = split.find(a => a.length == 4).split('');
    const seven = split.find(a => a.length == 3).split('');
    const eight = split.find(a => a.length == 7).split('');

    const three = split.find(a => a.length == 5 && one.every(v => a.includes(v))).split('');
    const six = split.find(a => a.length == 6 && one.find(v => !a.includes(v)) != null).split('');

    const f = six.find(v => one.find(a => v == a) != null)
    const c = one.find(v => v != f)

    const two = split.find(a => a.length == 5 && !a.includes(f)).split('');
    const five = split.find(a => a.length == 5 && !a.includes(c)).split('');

    const d = 'abcdefg'.split('').find(letter => [two, three, four, five, six].every(list => list.includes(letter)))

    const nine = split.find(a => a.length == 6 && one.find(v => !a.includes(v)) == null && a.includes(d)).split('');
    const zero = split.find(a => a.length == 6 && one.find(v => !a.includes(v)) == null && !a.includes(d)).split('');

    return Number(output.split(' ').map(o => {
        return [zero, one, two, three, four, five, six, seven, eight, nine].findIndex(list => list.length == o.split('').length && o.split('').every(v => list.includes(v)))
    }).join(''))
}).reduce((a, b) => a + b, 0))
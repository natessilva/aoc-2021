const fs = require('fs');
const data = fs.readFileSync("./input.txt").toString()
let version = 0;
console.log(data.split('').map(v => parseInt(v, 16).toString(2).padStart(4, '0')).join(''))
parse(data.split('').map(v => parseInt(v, 16).toString(2).padStart(4, '0')).join(''))
console.log(version);

function parse(b) {
    const v = parseInt(b.substring(0, 3), 2);
    console.log('version', v)
    version += v;
    const t = parseInt(b.substring(3, 6), 2);
    const body = b.substring(6)
    if (t == 4) {
        return literal(body);
    }
    return operator(body);
}

function literal(b) {
    const res = [];
    while (true) {
        s = b.substring(0, 5);
        res.push(s.substring(1))
        if (b.substring(0, 1) == '0') {
            b = b.substring(5);
            break;
        }
        b = b.substring(5);
    }
    return { value: parseInt(res.join(''), 2), remainder: b };
}

function operator(b) {
    const i = b.substring(0, 1);
    const body = b.substring(1);
    const children = [];

    if (i == '0') {
        const l = parseInt(body.substring(0, 15), 2);

        console.log('case 0, l', l)
        let rest = body.substring(15, 15 + l)
        let leftover = body.substring(15 + l)

        while (true) {
            const { value, remainder } = parse(rest);
            children.push(value);
            if (remainder.includes('1')) {
                rest = remainder;
            } else {
                return {
                    value: children, remainder: remainder + leftover
                }
            }

        }
    } else {
        const l = parseInt(body.substring(0, 11), 2);
        console.log('case 1, l', l)
        let rest = body.substring(11);
        for (let i = 0; i < l; i++) {
            const { value, remainder } = parse(rest);
            children.push(value);
            rest = remainder;
        }
        return { value: children, remainder: rest }
    }
}
const fs = require('fs')
const data = fs.readFileSync("./input.txt").toString()

let values = data.split(',')

console.log('values', values)


for (let days = 0; days < 80; days++) {
    let toAdd = 0;
    values = values.map(value => {
        if (value == 0) {
            toAdd++;
            return 6;
        }
        return value - 1;
    });
    for (let i = 0; i < toAdd; i++) {
        values.push(8);
    }
}
console.log(values.length)
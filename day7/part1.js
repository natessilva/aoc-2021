const fs = require('fs')
const data = fs.readFileSync("./input.txt").toString()

const values = data.split(',').map(Number)

const min = Math.min(...values);
const max = Math.max(...values);

let minFuel;
for (let i = min; i <= max; i++) {
    const fuel = values.map(v => Math.abs(v - i)).reduce((a, b) => a + b, 0);
    if (minFuel == null || fuel < minFuel) {
        minFuel = fuel
    }
}
console.log(minFuel)

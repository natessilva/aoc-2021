const fs = require('fs')
const data = fs.readFileSync("./input.txt").toString()

let values = data.split(',').map(Number)

let valueMap = new Map();

values.forEach(v => {
    valueMap.set(v, valueMap.has(v) ? valueMap.get(v) + 1 : 1)
});

console.log('valueMap', valueMap)


for (let days = 0; days < 256; days++) {
    const newMap = new Map()
    Array.from(valueMap.keys()).forEach(key => {
        const value = valueMap.get(key);
        let newKey = Number(key) - 1;
        if (newKey < 0) {
            newKey = 6;
            newMap.set(8, newMap.has(8) ? valueMap.get(8) + value : value)
        }
        newMap.set(newKey, newMap.has(newKey) ? newMap.get(newKey) + value : value)

    });
    valueMap = newMap
}


console.log(Array.from(valueMap.values()).reduce((a, b) => a + b, 0))
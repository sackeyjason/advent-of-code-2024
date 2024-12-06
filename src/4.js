import {loader} from './utils.js';

let input = loader('4.txt')
let lines = input.split('\n');
let p1 = 0;
let p2 = 0;

//#region Part 1
p1 += input.match(/XMAS/g).length;
p1 += input.match(/SAMX/g).length;

let rotated = [];
let skewed = [];
let s2 = []
lines.forEach((line, y) => {
    line.split('').forEach((char, x) => {
        if (!rotated[x]) {
            rotated.push([]);
        }
        rotated[x][y] = char;
        if (!skewed[y + x]) {
            skewed.push(new Array(line.length).fill('.'))
        };
        skewed[y + x][x] = char;
        let sy = y + (line.length - x);
        while (!s2[sy]) {
            s2.push(new Array(line.length).fill('.'));
        }
        s2[sy][x] = char;
    })
});
let rotatedS = rotated.map(line => line.join('')).join('\n');
p1 += rotatedS.match(/XMAS/g)?.length ?? 0;
p1 += rotatedS.match(/SAMX/g)?.length ?? 0;
let skewedS = skewed.map(line => line.join('')).join('\n');
p1 += skewedS.match(/XMAS/g)?.length ?? 0;
p1 += skewedS.match(/SAMX/g)?.length ?? 0;
let s2s = s2.map(line => line.join('')).join('\n');
p1 += s2s.match(/XMAS/g)?.length ?? 0;
p1 += s2s.match(/SAMX/g)?.length ?? 0;
//#endregion

//#region Part 2
lines.forEach((line, y) => {
    if (y === 0 || y === lines.length - 1) {
        return;
    }
    line.split('').forEach((char, x) => {
        if (x === 0 || x === line.length - 1) {
            return;
        }
        if (char === 'A') {
            let up = `${lines[y + 1][x - 1]}A${lines[y - 1][x + 1]}`;
            let down = `${lines[y - 1][x - 1]}A${lines[y + 1][x + 1]}`;
            switch (up + down) {
                case "MASMAS":
                case "SAMMAS":
                case "SAMSAM":
                case "MASSAM":
                    p2++;
                    break;
                default:
                    break;
            }
        }
    })
})
//#endregion

console.log({
    p1, p2,
});
//{ p1: 2507, p2: 1969 }

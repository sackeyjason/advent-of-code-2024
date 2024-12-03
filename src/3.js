import {loader} from './utils.js';

var input = loader('3.txt')

// var muls = input.match(/mul\(\d+,\d+\)/g);
// sum = muls.map(m => {
//     var n = m.match(/(\d+),(\d+)/);
//     return n[1] * n[2];
// }).reduce((a, b) => a + b);
// console.log(sum)

var ins = input.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g)
var sum = 0;
var doing = true;
ins.forEach((x) => {
    if (x === 'do()') {
        doing = true;
    } else if (x === "don't()") {
        doing = false;
    } else if (doing) {
        var [_, a, b] = x.match(/(\d+),(\d+)/);
        sum = sum + (a * b);
    }
});

console.log({ins , sum});
import {loader} from './utils.js';

var input = loader('3.txt')
var instructions = input.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g)
var sum = 0;
var doing = true;
instructions.forEach((instruction) => {
    if (instruction === 'do()') {
        doing = true;
    } else if (instruction === "don't()") {
        doing = false;
    } else if (doing) {
        var [_, a, b] = instruction.match(/(\d+),(\d+)/);
        sum = sum + (a * b);
    }
});
console.log({ sum });
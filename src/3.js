import {loader} from './utils.js';

var input = loader('3.txt')
var instructions = input.match(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g)
var sum1 = 0;
var sum2 = 0;
var doing = true;
instructions.forEach((instruction) => {
    if (instruction === 'do()') {
        doing = true;
    } else if (instruction === "don't()") {
        doing = false;
    } else {
        var [_, a, b] = instruction.match(/(\d+),(\d+)/);
        var product = a * b;
        sum1 += product;
        if (doing) {
            sum2 += product;
        }
    }
});
console.log({ sum1, sum2 });
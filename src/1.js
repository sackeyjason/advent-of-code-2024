import { loader } from './utils.js';

var input = loader('1.txt')
var lines = input.split('\n');
let list1 = [], list2 = [];
lines.forEach(l => {
    var [a, b] = l.split('   ');
    list1.push(a);
    list2.push(b);
});
list1.sort((a, b) => a - b);
list2.sort((a, b) => a - b);

var part = 2;

if (part === 1) {
    var diffs = [];
    list1.forEach((a, i) => {
        var b = list2[i];
        diffs.push(Math.abs(a - b));
    })

    var sum = diffs.reduce((prev, curr) => prev + curr);
    console.log({ sum });
} else {
    var similarity = 0;
    list1.forEach((a) => {
        var count = list2.reduce((x, y) => x + +(y === a), 0);
        similarity += a * count;
    })
    console.log({ similarity });
}
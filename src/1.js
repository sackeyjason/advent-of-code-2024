import { loader } from './utils.js';

var input = loader('1.txt');
var lines = input.split('\n');
var list1 = [], list2 = [];
lines.forEach(l => {
    var [a, b] = l.match(/\d+/g);
    list1.push(+a);
    list2.push(+b);
});
list1.sort((a, b) => a - b);
list2.sort((a, b) => a - b);
var sum = 0;
var similarity = 0;
list1.forEach((a, i) => {
    var b = list2[i];
    sum += Math.abs(a - b);
    var appearances = list2.filter(c => c == a).length;
    similarity += a * appearances;
});
console.log({ sum, similarity });

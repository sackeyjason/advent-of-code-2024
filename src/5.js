import { loader } from './utils.js';

var input = loader('5.txt')

const [rules, updates] = input.split('\n\n')
    .map((block) => block.split('\n')
        .map(l => l.match(/\d\d/g))
    );

/*
This ordering function assumes that for each pair of items we want to sort
there is an explicit rule placing the one before the other, otherwise they
go in the other order. Is this safe to assume? Would the problem be
solvable if that was not the case? Could instead the puzzle be built so
you have to infer some ordering rules? Seems possible. But luckily not
needed here.
*/
  
function order(a, b) {
    if (rules.find(([before, after]) => {
        return (a === before && b === after)
    })) {
        return -1;
    } else {
        return 1;
    }
}

console.log({
    p1: updates.filter(u => {
        let isSorted = "" + u.toSorted(order) === "" + u;
        return isSorted
    }).map(list => {
        return list[Math.floor(list.length / 2)];
    }).reduce((sum, item) => sum + +item, 0),
    p2: updates.filter(u => {
        let isSorted = "" + u.toSorted(order) === "" + u;
        return !isSorted;
    }).map(list => {
        return list.toSorted(order)[Math.floor(list.length / 2)];
    }).reduce((sum, item) => sum + +item, 0)
});

// Here be deprecated dragons

/* I like this dirty array-building
   iteration method... alas! */

// let lines = input.split('\n');
// let rules = [];
// let updates = [];
// let gettingRules = true;
// lines.forEach(l => {
//     if (l === "") {
//         gettingRules = false;
//         return;
//     }
//     if (gettingRules) {
//         rules.push(l.split("|"));
//     } else {
//         updates.push(l.split(","))
//     }
// });

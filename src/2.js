import { loader } from './utils.js';

var input = loader('2.txt')
var reports = input.split('\n');

function getIsSafe(nums) {
    var pairs = [];
    var bigChange = false;
    var noChange = false;
    for (let i = 0; i < nums.length - 1; i++) {
        pairs.push([nums[i], nums[i + 1]]);
        var diff = Math.abs(nums[i] - nums[i + 1]);
        if (diff === 0) noChange = true;
        if (diff > 3) bigChange = true;
    }
    var sortedNums = nums.toSorted((a, b) => a - b);
    var increasing = nums.join('') === sortedNums.join('');
    var decreasing = nums.join('') === sortedNums.toReversed().join('');

    var isSafe = (increasing || decreasing) && !noChange && !bigChange;
    return !!isSafe;
}

var r2 = reports.map((r) => {
    var nums = r.split(' ');
    var isSafe = getIsSafe(nums);
    var safe1 = isSafe;
    var safe2 = null;
    var variants = [];

    if (!isSafe) {
        for (let i = 0; i < nums.length; i++) {
            var v = [...nums];
            v.splice(i, 1);
            variants.push(v);
        }

        variants.forEach((variant) => {
            if (getIsSafe(variant)) {
                isSafe = true;
                safe2 = variant;
            }
        });
    }

    return { nums, isSafe, safe1, safe2, variants };
});
console.log(r2);
console.log(r2.find(x => x.safe2));
console.log(r2.reduce((count, item) => {
    if (item.isSafe) {
        count++;
    }
    return count;
}, 0))

// function isSafe(report) {
//     var nums = report.split(' ');
//     var pairs = [];
//     for (let i = 0; i < nums.length - 1; i++) {
//         pairs.push([nums[i], nums[i + 1]]);
//     }
//     var d = [];
//     var flag = true;
//     pairs.forEach((p) => {
//         var diff = p[0] - p[1];
//         if (Math.abs(diff) > 2) flag = false;
//         if (diff === 0) flag = false;
//         d.push(diff);
//     });

//     if (flag) {
//         var ups = 0;
//         var downs = 0;
//         d.forEach((x) => {
//             if (x > 0) ups++;
//             if (x < 0) downs++;
//         });
//         return (ups === 0 || downs === 0)
//     }

//     return flag;
// }

// var count = 0;

// reports.forEach((r) => {
//     if (isSafe(r)) {
//         count++;
//     }
// });

// console.log({ count })
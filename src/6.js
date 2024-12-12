import {loader} from './utils.js';

var input = loader('6.txt')
var lines = input.split('\n');

let visited = new Set();
let loops = 0;
let directionPositions = new Set();
const GUARD_START = { x: null, y: null };
for (let le of lines.entries()) {
    let [r, line] = le;
    let c = line.indexOf('^');
    if (c >= 0) {
        GUARD_START.x = c;
        GUARD_START.y = r;
        break;
    }
}

let dir;

function getFront(x, y) {
    return [x + dir[0], y + dir[1]];
}

function turn() {
    let [a, b] = dir;
    if (a === 1) dir = [0, 1];
    if (b === 1) dir = [-1, 0];
    if (a === -1) dir = [0, -1];
    if (b === -1) dir = [1, 0];
}

function getTileAt([x, y], grid) {
    return grid?.[y]?.[x]
}

function patrol(grid = lines) {
    dir = [0, -1];
    let guard = {...GUARD_START};
    let exited = false;
    let loopDetected = false;
    directionPositions = new Set();
    while (!exited && !loopDetected) {
        let positionStr = String([guard.x, guard.y]);
        let directionStr = String(dir);
        let dirPos = directionStr + positionStr;

        if (directionPositions.has(dirPos)) {
            loopDetected = true;
            break;
        } else {
            directionPositions.add(dirPos);
        }
        visited.add(positionStr);
        let f = getFront(guard.x, guard.y);
        switch (getTileAt(f, grid)) {
            case undefined:
                exited = true;
                break;
            case '.':
            case '^':
                guard.x = f[0];
                guard.y = f[1];
                break;
            case '#':
                turn();
                break;
            default:
                break;
        }
    }
    if (loopDetected) {
        loops++;
    }
}

patrol();
let p1 = visited.size;

for (let [y, line] of lines.entries()) {
    for (let [x, char] of line.split('').entries()) {
        if ('.^'.indexOf(char) === -1) continue;
        let gridCopy = lines.map(l => l);
        let y_ = gridCopy[y].split('');
        y_[x] = '#';
        gridCopy[y] = y_.join('');
        patrol(gridCopy);
    }
}

console.log({
    p1,
    p2: loops
});

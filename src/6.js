import {loader} from './utils.js';

var input = loader('6s.txt')
var lines = input.split('\n');

let visited = new Set();
let loops = 0;
let directionPositions = new Set();
let guard = { x: null, y: null };
for (let le of lines.entries()) {
    let [r, line] = le;
    let c = line.indexOf('^');
    if (c >= 0) {
        guard.x = c;
        guard.y = r;
        break;
    }
}

let dir = [0, -1];

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

function getTileAt([x, y]) {
    return lines?.[y]?.[x]
}

function patrol() {
    let exited = false;
    let loopDetected = false;
    while (!exited && !loopDetected) {
        
        let positionStr = String([guard.x, guard.y]);
        let directionStr = String(dir);
        let dirPos = directionStr + positionStr;
        // console.log(dirPos);

        if (directionPositions.has(dir)) {
            loopDetected = true;
            break;
        } else {
            directionPositions.add(dirPos);
        }
        visited.add(positionStr);
        let f = getFront(guard.x, guard.y);
        switch (getTileAt(f)) {
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



console.log({
    p1: visited.size,
    p2: loops
})
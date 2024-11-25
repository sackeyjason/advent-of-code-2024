import fs from 'fs';

export function loader(path) {
    return fs.readFileSync('input/' + path).toString();
};

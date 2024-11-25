import {loader} from './utils.js';

var input = loader('hw.txt')
var lines = input.split('\n');
lines.forEach(l => console.log('++++' + l));

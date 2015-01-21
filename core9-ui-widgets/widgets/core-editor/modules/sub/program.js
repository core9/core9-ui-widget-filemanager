var one = require('a.js');
var two = require('../a.js');
var three = require('./a.js');

module.exports.one = one.text;
module.exports.two = two.text;
module.exports.three = three.text;



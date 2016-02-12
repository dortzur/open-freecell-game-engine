'use strict';
function srand(seed) {
    return function rand() {
        seed = (((seed * 214013 + 2531011) & 0x7FFFFFFF));
        return seed >> 16;
    };
}
module.exports = srand;
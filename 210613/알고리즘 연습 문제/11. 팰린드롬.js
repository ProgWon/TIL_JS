function checkPalindrom(str) {
    if (str === str.split('').reverse().join('')) return true;
    return false;
}

console.log(checkPalindrom('dad')); // true
console.log(checkPalindrom('mom')); // true
console.log(checkPalindrom('palindrom')); // false
console.log(checkPalindrom('s')); // true
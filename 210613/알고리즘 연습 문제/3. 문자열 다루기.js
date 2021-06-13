function alphaString46(s = 'a') {
    if (s.length < 4 || s.length > 6) return false;

    return isNaN(s) ? false : true;

}

console.log(alphaString46('1234')); // true
console.log(alphaString46('9014')); // true
console.log(alphaString46('723'));  // false
console.log(alphaString46('a234')); // false
console.log(alphaString46(''));     // false
console.log(alphaString46());       // false
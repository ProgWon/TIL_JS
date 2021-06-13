function numPY(s = 'a') {
    let countP = 0, countY = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === 'p' || s[i] === 'P') countP++;
        else if (s[i] === 'y' || s[i] === 'Y') countY++;     
    }
    
    if (countP === countY) return true;

    return false;

}

console.log(numPY('pPoooyY')); // true
console.log(numPY('Pyy'));     // false
console.log(numPY('ab'));      // true
console.log(numPY(''));        // true
console.log(numPY());          // true
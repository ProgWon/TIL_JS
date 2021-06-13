function isHarshad(n) {
    const str = n + '';
    let sum = 0;

    for (let i = 0; i < str.length; i++) {
        sum += (+str[i]);
    }

    return (n % sum === 0) ? true : false;
}

console.log(isHarshad(10)); // true
console.log(isHarshad(12)); // true
console.log(isHarshad(18)); // true
console.log(isHarshad(11)); // false
console.log(isHarshad(13)); // false
function hideNumbers(str) {
    return str.substr(0, -4);
}

console.log(hideNumbers('01033334444')); // *******4444
console.log(hideNumbers('027778888'));   // *****8888
function digitSum(n) {
    if (n > 100000000) return false;

    const str = n + '';
    let answer = 0;

    for (let i = 0; i < str.length; i++) {
        answer += (+str[i]);
    }
    
    return answer;
}

console.log(digitSum(123));  // 6
console.log(digitSum(987));  // 24
console.log(digitSum(100000001));  // false
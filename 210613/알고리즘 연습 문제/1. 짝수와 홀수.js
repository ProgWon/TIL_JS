// if문
function evenOrOdd0(num) {
    if (num % 2 === 0) return 'Even';
    else return 'Odd';
}

// 삼항 조건 연산자
function evenOrOdd1(num) {
    return num % 2 === 0 ? 'Even' : 'Odd';
}
console.log('if 문 --------------------------------')
console.log(evenOrOdd0(2)); // Even
console.log(evenOrOdd0(3)); // Odd
console.log(evenOrOdd0(1000)); // Even
console.log('삼항 조건 연산자 ----------------------')
console.log(evenOrOdd1(2)); // Even
console.log(evenOrOdd1(3)); // Odd
console.log(evenOrOdd1(1000)); // Even
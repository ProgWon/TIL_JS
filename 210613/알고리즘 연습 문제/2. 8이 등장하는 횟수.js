function getCount8() {
    let count8 = 0;

    for (let i = 1; i <= 10000; i++) {
        const strNum = i + '';

        for (let j = 0; j < strNum.length; j++) {
            if (strNum[j] === '8') count8++;
        }
    }

    return count8;
}

console.log(getCount8()); // 4000
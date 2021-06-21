function toWeirdCase(s) {
    const stringArr = s.split(' ');
    
    for (let i = 0; i < stringArr.length; i++) {
        let weirdCase = '';
        const str = stringArr[i];

        for (let j = 0; j < str.length; j++) {
            weirdCase += (j % 2 === 0) ? str[j].toUpperCase() : str[j].toLowerCase();
        }

        stringArr[i] = weirdCase;
    }

    return stringArr.join(' ');
}

console.log(toWeirdCase('hello world'));    // 'HeLlO WoRlD'
console.log(toWeirdCase('my name is lee')); // 'My NaMe Is LeE'

function isNotOverlapArray(array) {
    const set = new Set(array);
    console.log(set.length);

    for (let i = 1; i <= set.length; i++) {
        console.log(i);
        if (!set.has(i)) return false;
    }
    return true;

console.log(isNotOverlapArray([4, 1, 3, 2])); // true
console.log(isNotOverlapArray([4, 1, 3]));    // false
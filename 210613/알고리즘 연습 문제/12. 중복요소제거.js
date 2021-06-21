function uniq(array) {
    return [...new Set(array)];
}

console.log(uniq([2, 1, 2, 3, 4, 3, 4])); // [ 2, 1, 3, 4 ]
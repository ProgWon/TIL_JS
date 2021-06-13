function findDuplicated(array) {
    return [...new Set(array.filter((v, i, self) => self.indexOf(v) !== i))];
}

console.log(findDuplicated([1, 2, 3, 4, 1, 2, 3])); // [ 1, 2, 3 ]
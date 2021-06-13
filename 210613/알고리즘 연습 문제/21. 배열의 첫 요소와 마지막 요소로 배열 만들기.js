function generateRange(from, to) {
    const res = Array.from({length: (to - from + 1)}, (_, i) => i + from);

    return res;
}

console.log(generateRange(10, 15)); // [ 10, 11, 12, 13, 14, 15 ]
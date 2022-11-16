function measureCardinality(n) {
  let cardinality = 0;
  const maxInt = Math.pow(2, 24);

  for (let i = 1; i <= maxInt; i = i << 1) {
    if (i & n) {
      cardinality++;
    }
  }

  return cardinality;
}

function cardinalitySort(nums) {
  nums.sort((a, b) => {
    const aCardinality = measureCardinality(a);
    const bCardinality = measureCardinality(b);

    return aCardinality - bCardinality || a - b;
  });

  return nums;
}

function main() {
  const result = cardinalitySort([31, 15, 7, 3, 2]);

  console.log(result);
}

main();

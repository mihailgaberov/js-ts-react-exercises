// 1. Scopes & Closures

function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const test = outer();
test();
test();
// Question: What will be logged after both calls to fn()?
// 1
// 2

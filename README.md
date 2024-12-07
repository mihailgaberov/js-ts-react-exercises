## 1. Scopes & Closures

```javascript
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
```

## 2. Hoisting

```javascript
console.log(a);
var a = 5;
function foo() {
  console.log(a);
  var a = 10;
}
foo();
// Question: What will be logged and why?
// undefined
// undefined
// because var hoists the declaration and initializes it to 'undefined'
```

## 3. Reference vs Value

```javascript
let obj1 = { name: "Alice" };
let obj2 = obj1;
obj2.name = "Bob";

console.log(obj1.name);
// Bob
// because both variables obj1 and obj1 are pointing to the same object, i.e. the same place in the memory and thus can manipulate its value
```

## 4. Function Parameters & Default Values

```javascript
function greet(name = "Stranger") {
  console.log(`Hello, ${name}!`);
}

greet();
greet(undefined);
greet(null);

// Stranger,
// Stranger,
// null
// because empty or undefined are considered as missing values and trigger the default value, whereas null is still an existing object but initialized as nothing
```

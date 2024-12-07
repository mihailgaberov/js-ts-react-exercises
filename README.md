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

//Question: What will be printed for each call?

// Stranger,
// Stranger,
// null
// because empty or undefined are considered as missing values and trigger the default value, whereas null is still an existing object but initialized as nothing
```

## 5. `this` Context

```javascript
const person = {
  name: "Sam",
  greet() {
    console.log(this.name);
  },
};

const greet = person.greet;
greet();
// Question: What will be logged and why?
// undefined because greet is invoked in the global context, in order to fix it we could use 'bing', i.e. const greet = person.greet.bind(person) - in this case 'this' would be considered in the context of the object 'person' and will console.log the name 'Sam'
```

## 6. Immediately Invoked Function Expressions (IIFE)

```javascript
(function () {
  let a = 10;
  console.log(a);
})();

console.log(typeof a);
// Question: What will be printed and why?

// 10
// undefined
// because the iife creates its own function scope and the value of a there would be 10 as declared, but in the outside scope it doesn't exist and the type of it would be undefined
```

## 7. Currying & Partial Application

```javascript
function add(a) {
  return function (b) {
    return a + b;
  };
}

const addFive = add(5);
console.log(addFive(3));

// Question: What will be logged to the console?

// 8
// because first invokation of 'add' creates a closure that 'freezes' the number 5 which is available on the second call where we use number 3, so the result would be 5 + 3
```

## 8. Equality Check (== vs ===)

```javascript
console.log(0 == "0");
console.log(0 === "0");
console.log(false == "0");

// Question: What will be logged and why?

//  true
// false
// true
// because the first and the last check are not strict and don't consider the types of the operan, whereas the second is strict equality and check the values and the types of the operands
```

## 9. Event Loop & Asynchronous Behavior

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");

// Question: What will be logged and in what order?
// Start, End, Promise, Timeout
// First two are clear, then the promise is going to be first as it is considered as a micro task in the event loop whereas the timeout is a macro task, and micro tasks get executed before the macro ones.

```

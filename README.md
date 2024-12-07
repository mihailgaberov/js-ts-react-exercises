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

## 10. Variable Shadowing & Block Scope

```javascript
let x = 1;

function test() {
  console.log(x);
  let x = 2;
}

test();

// Question: What will be logged, or will there be an error? Why?

// ReferenceError: Cannot access 'x' before initialization
// because 'let' hoists only declataion but no initialization, if we replace it with 'var' in this case it will log 'undefined' as 'var' hoists both the declaration and initialization to undefined.
```

## 11. Rest & Spread Operators

```javascript
function sum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log(sum(1, 2, 3));
console.log(sum());

// Question: What will be the output of both console.log calls?

// 6
// 0
// because the spread operator gets all input argiuments and sum them up via the 'reduce', but in the second case don't pass anything, and the numbers array that is created by the spread operator is considered as empty, i.e. and we only get the initializing value of the reduce function which is 0
```

## 12. Destructuring & Default Values

```javascript
const { a, b = 2 } = { a: 1 };
console.log(a, b);

const [x, y = 3] = [5];
console.log(x, y);

// Question: What will be logged for both console.log statements?

// 1, 2
// 5, 3

// because the destructuring takes into account the order of the params in the objects/arrays
```

## 13. Array & Object Mutation

```javascript
const arr = [1, 2, 3];
const obj = { key: "value" };

function mutate(array, object) {
  array.push(4);
  object.key = "newValue";
}

mutate(arr, obj);
console.log(arr);
console.log(obj);

// Question: What will be printed and why?

// [1, 2, 3, 4]
// { key: "newValue" }
// because we pass the referencers to the object themselfes (array is also considered as Object in JS), not copies of their values, and thus mutate their values
```

## 14. Prototypal Inheritance

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`Hello, my name is ${this.name}`);
};

const person1 = new Person("Alice");
person1.sayHello();

// Question: What will be logged? How does prototypal inheritance work here?

// Hello, my name is Alice
// beause we create an instance of the Person object, whose protypes methods are available in all instances created by it
```

## 15. Type Coercion & NaN

```javascript
console.log("5" - 2);
console.log("5" + 2);
console.log(true + false);
console.log(null + 1);
console.log(undefined + 1);

// 3
// 52
// 1
// 1
// NaN

// + triggers string concatenation when at least one operand is a string.
// Arithmetic operators (-, *, /) trigger numeric coercion.
// Booleans: true → 1, false → 0.
// `null` becomes 0, while `undefined` becomes NaN in mathematical expressions.
```

## 16. Callbacks & Higher-Order Functions

```javascript
function process(num, callback) {
  return callback(num);
}

const double = (x) => x * 2;
const square = (x) => x ** 2;

console.log(process(5, double));
console.log(process(5, square));

// Question: What will be printed for both calls?

// 10
// 25
// because in js the functions are first class citizens and we can pass them as normal arguments to another functions
```

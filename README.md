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

## 17. Function Binding

```javascript
const person = {
  name: "John",
  greet() {
    console.log(`Hello, ${this.name}`);
  },
};

const greet = person.greet.bind({ name: "Doe" });
greet();

// Hello, Doe
// because the `greet` function is binder with the context of the object we pass to it
```

## 18. Optional Chaining (?.)

```javascript
const user = {
  profile: {
    name: "Alice",
    address: {
      city: "Wonderland",
    },
  },
};

console.log(user.profile?.address?.city);
console.log(user.profile?.contact?.phone);

// Wonderland
// undefined
// because the `phone` props is missing, but since we use the optional chaining operator, the code still works (instead of throwing an error for trying to access an undefined) and we will log just `undefined`
```

## 19. Nullish Coalescing Operator (??)

```javascript
const a = null ?? "defaultA";
const b = undefined ?? "defaultB";
const c = 0 ?? 42;
const d = "" ?? "defaultD";

console.log(a, b, c, d);

// defaultA, defaultB, 0, ""
// because the nullish coalescing operator returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.
```

## 20. Dynamic Imports

```javascript
(async () => {
  const { greet } = await import("./utils.js");
  greet("John");
})();

// How does the dynamic import work here and what are the benefits?

// import() is a function that returns a Promise when called, it is used to load JavaScript modules dynamically at runtime. Benefits are code splitting, lazy loading, conditional loading (if this then import this file, else this file), runtime module loading and better perf.
```

## 21. Promise.allSettled

```javascript
const promises = [
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Another success"),
];

Promise.allSettled(promises).then((results) => console.log(results));
// Question: What will be logged, and how does Promise.allSettled differ from Promise.all?

// Promise.allSettled() waits for all promises to settle, meaning they are either fulfilled or rejected. It never short-circuits and always returns an array of results, where each result is an object with:
// status: "fulfilled" or "rejected"
// value: The resolved value (if fulfilled)
// reason: The error value (if rejected)
// Promise.all stops on the first rejection
```

## 22. Private Class Fields (#)

```javascript
class Person {
  #secret = "Hidden";

  getSecret() {
    return this.#secret;
  }
}

const p = new Person();
console.log(p.getSecret());
console.log(p.#secret);

// Hidden
// Uncaught SyntaxError: Private field '#secret' must be declared in an enclosing class
// because Private Field Declaration:
// The #secret field is declared as private by using the # symbol.
// Private fields are only accessible inside the class.
// Access Through a Method:

// The method getSecret() can access #secret because it’s inside the Person class.
// This returns "Hidden" correctly.
// Direct Access Attempt:

// console.log(p.#secret); will throw a SyntaxError because #secret is not accessible outside the class.
```

## 23. Logical Assignment Operators (&&=, ||=, ??=)

```javascript
let x = 0;
let y = null;
let z = 5;

x ||= 10;
y ??= 20;
z &&= 30;

console.log(x, y, z);
// 10 20 30

// Logical OR Assignment (||=):
// x ||= 10 means "if x is falsy (e.g., 0, null, undefined, false), assign 10 to x."
// x = 0 is falsy, so x becomes 10.
// Nullish Coalescing Assignment (??=):

// y ??= 20 means "if y is null or undefined, assign 20 to y."
// y = null is nullish, so y becomes 20.
// Logical AND Assignment (&&=):

// z &&= 30 means "if z is truthy, assign 30 to z."
// z = 5 is truthy, so z becomes 30.

// x = 10 (because 0 is falsy, so it was replaced by 10)
// y = 20 (because null is nullish, so it was replaced by 20)
// z = 30 (because 5 is truthy, so it was replaced by 30)
```

## 24. Top-Level await (ES2022)

```javascript
// Assuming we are in a module environment
const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
const data = await response.json();
console.log(data);

// Top-level await simplifies asynchronous code by allowing direct use of await in modules, eliminating the need to wrap async logic inside functions and improving code readability and maintainability.
// Without top-level await, you would need to wrap asynchronous code in an async function, With top-level await, you can write asynchronous code directly in the module
```

## 25. at() Method for Arrays and Strings

```javascript
const arr = [10, 20, 30, 40, 50];
console.log(arr.at(2));
console.log(arr.at(-1));

const str = "Hello";
console.log(str.at(1));
console.log(str.at(-2));

// 30
// 50
// e
// l
// because te methods return the item on the specified index in both arrays or stings
```

## 26. WeakRef and Finalizers (Advanced)

```javascript
let obj = { data: "Important" };
const weakRef = new WeakRef(obj);

obj = null; // Dereference the object

setTimeout(() => {
  console.log(weakRef.deref());
}, 1000);

// Question: What will be logged after setTimeout runs? Why?

// A WeakRef is a reference to an object that does not prevent the object from being garbage collected.
// When you create a WeakRef to an object, it holds a "weak" reference, meaning the object can still be garbage collected if there are no strong references to it.
// Dereferencing the Object:

// const weakRef = new WeakRef(obj); creates a weak reference to obj.
// After obj = null;, the strong reference to the object is removed. Since weakRef is the only reference left, and it is weak, the object is now eligible for garbage collection.
// weakRef.deref():

// The deref() method on a WeakRef returns the object if it has not been garbage collected. If the object has been garbage collected, it returns undefined.
```

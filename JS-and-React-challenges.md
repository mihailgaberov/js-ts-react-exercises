# JavaScript And React Coding Challenges – Solutions & Explanations

---

## 🧩 Challenge 1: React Component – What's Wrong?

```jsx
class WelcomeMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || "Anonymous",
    };
  }
  render() {
    return <p>Hello {this.state.name}</p>;
  }
}
```

### ✅ Problem:

- Using state unnecessarily for a prop that doesn't change.
- Won't reflect updates to `props.name` after initial render.

### ✅ Fix:

Use functional component:

```jsx
const WelcomeMessage = ({ name = "Anonymous" }) => <p>Hello {name}</p>;
```

---

## 🧩 Challenge 2: React Function Bindings

```jsx
class App extends React.Component {
  constructor() {
    super();
    this.name = "MyComponent";
    this.handleClick2 = this.handleClick1.bind(this);
  }

  handleClick1() {
    alert(this.name);
  }

  handleClick3 = () => alert(this.name);

  render() {
    return (
      <div>
        <button onClick={this.handleClick1()}>click 1</button>
        <button onClick={this.handleClick1}>click 2</button>
        <button onClick={this.handleClick2}>click 3</button>
        <button onClick={this.handleClick3}>click 4</button>
      </div>
    );
  }
}
```

### ✅ Explanation:

- **Click 1**: Executes during render → `undefined` or error.
- **Click 2**: `this` is `undefined` → runtime error.
- **Click 3**: Bound manually → works.
- **Click 4**: Arrow function keeps `this` → works.

---

## 🧩 Challenge 3: Spy Function

```js
function spy(obj, method) {
  const original = obj[method];
  let callCount = 0;

  obj[method] = function (...args) {
    callCount++;
    return original.apply(this, args);
  };

  obj[method].restore = () => (obj[method] = original);
  Object.defineProperty(obj[method], "callCount", {
    get: () => callCount,
  });
}
```

---

## 🧩 Challenge 4: Lexical Environment

```js
const a = 10;
function b() {
  return a;
}
((f) => {
  const a = 5;
  return f();
})(b); // Returns 10
```

✅ Answer: `10`

---

## 🧩 Challenge 5: Prototype Extension

```js
const person = "Milos";
person.say("Hello,")("!"); // Hello, Milos!
```

✅ Fix:

```js
String.prototype.say = function (start) {
  const name = this.valueOf();
  return function (end) {
    console.log(`${start} ${name}${end}`);
  };
};
```

---

## 🧩 Challenge 6: Array Rotation

```js
const rotate = (a, k) => {
  const n = a.length;
  if (!n) return a;
  const shift = k % n;
  return a.slice(-shift).concat(a.slice(0, -shift));
};
```

---

## 🧩 Challenge 7: Duplicate Encoder

```js
const func = (str) => {
  const lower = str.toLowerCase();
  return [...lower]
    .map((c) => (lower.indexOf(c) === lower.lastIndexOf(c) ? "(" : ")"))
    .join("");
};
```

---

## 🧩 Challenge 8: Find Duplicate in Unsorted Array

```js
const findDuplicate = (arr) => {
  const seen = new Set();
  for (let num of arr) {
    if (seen.has(num)) return num;
    seen.add(num);
  }
};
```

---

## 🧩 Challenge 9: `var` + `setTimeout`

```js
for (var i = 0; i < 10; i++) {
  setTimeout(() => console.log(i), 10);
}
// Prints: 10 ten times
```

✅ Fix:

```js
for (let i = 0; i < 10; i++) {
  setTimeout(() => console.log(i), 10);
}
```

---

## 🧩 Challenge 10: Most Frequent Words

```js
String.prototype.words = function (n) {
  return Object.entries(
    this.split(" ").reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {})
  )
    .sort(([, a], [, b]) => b - a)
    .slice(0, n)
    .map(([word]) => word);
};
```

---

## 🧩 Challenge 11: Function Hoisting

```js
(function () {
  f(); // 2
  f = function () {
    console.log(1);
  };
})();

function f() {
  console.log(2);
}

f(); // 1
```

✅ Answer:

- Prints: `2` then `1`

---

## 🧩 Challenge 12: `setTimeout` with Object Method

```js
var feedback = {
  message: "Hello",
  send() {
    console.log(this.message);
  },
};

setTimeout(feedback.send); // undefined
```

✅ Fix:

```js
setTimeout(() => feedback.send());
// or
setTimeout(feedback.send.bind(feedback));
```

---

## 🧩 Challenge 13: CSS Selector

```css
[role="navigation"] > ul a:not([href^="mailto"]) {
}
```

✅ Explanation:

- Selects `<a>` elements inside `<ul>` that is a direct child of an element with `role="navigation"`, but only those that do **not** start with `mailto:`.

---

## 🧩 Challenge 14: CSS Units

- `%`: Relative to parent container.
- `em`: Relative to font-size of the element's parent.
- `rem`: Relative to root element (`html`) font-size.
- `vh`: 1% of viewport height.
- `vw`: 1% of viewport width.

---

> Need more? Let me know and I can extend this into a full JavaScript challenge workbook.

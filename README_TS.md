# 📚 Advanced TypeScript Exercises with Answers

An advanced collection of TypeScript exercises covering types, generics, mapped types, utility types, and more. Each exercise includes the answer and a detailed explanation.

---

## **Table of Contents**

1. [Type Inference and Type Annotations](#1-type-inference-and-type-annotations)
2. [Interfaces, Types, and Generics](#2-interfaces-types-and-generics)
3. [Utility Types and Conditional Types](#3-utility-types-and-conditional-types)
4. [Type Guards and Advanced Type Inference](#4-type-guards-and-advanced-type-inference)
5. [Decorators and Metadata](#5-decorators-and-metadata)
6. [Miscellaneous TypeScript Features](#6-miscellaneous-typescript-features)
7. [Advanced Generics and Constraints](#7-advanced-generics-and-constraints)
8. [Mapped Types in Depth](#8-mapped-types-in-depth)
9. [Conditional Types (Advanced Usage)](#9-conditional-types-advanced-usage)
10. [Template Literal Types and String Manipulation](#10-template-literal-types-and-string-manipulation)
11. [Type Manipulation with `infer` and Recursive Types](#11-type-manipulation-with-infer-and-recursive-types)
12. [Module Augmentation and Declaration Merging](#12-module-augmentation-and-declaration-merging)

---

## **1. Type Inference and Type Annotations**

### **1.1 Type Inference with Variables**

```typescript
let message: string = "Hello, TypeScript!";
message = 123; // What happens here?
```

### **Answer:**

```
TypeScript Error: Type 'number' is not assignable to type 'string'.
```

**Why:** The variable `message` is declared with a type `string`, so assigning a number causes a TypeScript type error.

---

### **1.2 Type Inference without Annotations**

```typescript
let value = "TypeScript";
value = true; // What happens here?
```

### **Answer:**

```
TypeScript Error: Type 'boolean' is not assignable to type 'string'.
```

**Why:** TypeScript infers the type of `value` as `string` during initialization.

---

### **1.3 Type Assertions**

```typescript
let unknownValue: any = "Hello World";
let strLength: number = (unknownValue as string).length;

console.log(strLength);
```

### **Answer:**

```
11
```

**Why:** The type assertion `as string` tells TypeScript that `unknownValue` should be treated as a string.

---

---

## **2. Interfaces, Types, and Generics**

### **2.1 Generics with Functions**

```typescript
function reverseArray<T>(items: T[]): T[] {
  return items.reverse();
}

console.log(reverseArray<number>([1, 2, 3]));
console.log(reverseArray<string>(["a", "b", "c"]));
```

### **Answer:**

```
[3, 2, 1]
['c', 'b', 'a']
```

**Why:** The function `reverseArray` uses a generic type `T`, allowing it to work with both numbers and strings.

---

### **2.2 Extending Interfaces**

```typescript
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

const myDog: Dog = { name: "Buddy", breed: "Golden Retriever" };
console.log(myDog);
```

### **Answer:**

```
{ name: 'Buddy', breed: 'Golden Retriever' }
```

**Why:** `Dog` extends `Animal`, so objects of type `Dog` must have both `name` and `breed` properties.

---

### **2.3 Using `keyof` in Generics**

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const person = { name: "John", age: 30 };
console.log(getProperty(person, "name"));
```

### **Answer:**

```
John
```

**Why:** The function uses `keyof T` to ensure `key` exists on the provided object `obj`.

---

---

## **3. Utility Types and Conditional Types**

### **3.1 `Partial<T>` Utility Type**

```typescript
interface Task {
  title: string;
  description: string;
}

function updateTask(task: Task, updates: Partial<Task>) {
  return { ...task, ...updates };
}

const task1: Task = { title: "Learn TypeScript", description: "Master TS" };
const updatedTask = updateTask(task1, { description: "Practice daily" });
console.log(updatedTask);
```

### **Answer:**

```
{ title: 'Learn TypeScript', description: 'Practice daily' }
```

**Why:** `Partial<T>` makes all properties optional, enabling partial updates.

---

### **3.2 `Required<T>` Utility Type**

```typescript
interface Options {
  id?: number;
  username?: string;
}

function createUser(options: Required<Options>) {
  console.log(options);
}

createUser({ id: 1, username: "JohnDoe" });
```

### **Answer:**

```
{ id: 1, username: 'JohnDoe' }
```

**Why:** `Required<T>` makes all properties required, enforcing their presence.

---

---

## **4. Type Guards and Advanced Type Inference**

### **4.1 Type Guards with `typeof`**

```typescript
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(`ID as string: ${id.toUpperCase()}`);
  } else {
    console.log(`ID as number: ${id}`);
  }
}

printId(123);
printId("abc");
```

### **Answer:**

```
ID as number: 123
ID as string: ABC
```

**Why:** TypeScript uses `typeof` to narrow down the type within the function.

---

### **4.2 Discriminated Unions**

```typescript
type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; side: number };

type Shape = Circle | Square;

function calculateArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
  }
}

console.log(calculateArea({ kind: "circle", radius: 5 }));
```

### **Answer:**

```
78.53981633974483
```

**Why:** The discriminated union uses the `kind` property to differentiate between types.

---

---

## **5. Decorators and Metadata**

### **5.1 Class Decorators**

```typescript
function LogClass(target: Function) {
  console.log(`Class ${target.name} initialized.`);
}

@LogClass
class Service {
  constructor() {
    console.log("Service instance created.");
  }
}

const service = new Service();
```

### **Answer:**

```
Class Service initialized.
Service instance created.
```

**Why:** The class decorator `@LogClass` is called when the class is defined.

---

---

## **6. Miscellaneous TypeScript Features**

### **6.1 Enum Basics**

```typescript
enum Status {
  Active,
  Inactive,
  Pending,
}

const currentStatus = Status.Active;
console.log(currentStatus);
```

### **Answer:**

```
0
```

**Why:** Enums in TypeScript default to numeric values starting from `0`.

---

---

## **Contributing**

Feel free to open an issue or submit a pull request if you'd like to add more exercises or improve the answers.

---

Let me know if you'd like additional sections or more detailed explanations for specific topics! 🚀

## **7. Advanced Generics and Constraints**

### **7.1 Generic Constraints with `extends`**

```typescript
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

console.log(getLength("Hello"));
console.log(getLength([1, 2, 3, 4]));
console.log(getLength({ length: 10 }));
```

### **Answer:**

```
5
4
10
```

**Why:** The constraint `T extends { length: number }` ensures that `T` must have a `length` property.

---

### **7.2 Generic Function with Default Type**

```typescript
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}

console.log(createArray(3, "TypeScript"));
console.log(createArray<number>(2, 42));
```

### **Answer:**

```
['TypeScript', 'TypeScript', 'TypeScript']
[42, 42]
```

**Why:** If no type is specified, the default type `string` is used.

---

---

## **8. Mapped Types in Depth**

### **8.1 Readonly Mapped Type**

```typescript
interface Todo {
  title: string;
  completed: boolean;
}

type ReadonlyTodo = Readonly<Todo>;

const todo: ReadonlyTodo = { title: "Learn TypeScript", completed: false };
// todo.completed = true;  // What happens here?
```

### **Answer:**

```
TypeScript Error: Cannot assign to 'completed' because it is a read-only property.
```

**Why:** The `Readonly<T>` utility type makes all properties in `T` immutable.

---

### **8.2 Custom Mapped Type**

```typescript
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

type Task = {
  readonly title: string;
  readonly completed: boolean;
};

const task: Mutable<Task> = { title: "Practice TypeScript", completed: false };
task.completed = true;
console.log(task);
```

### **Answer:**

```
{ title: 'Practice TypeScript', completed: true }
```

**Why:** The custom type `Mutable<T>` removes the `readonly` modifier from all properties.

---

---

## **9. Conditional Types (Advanced Usage)**

### **9.1 Conditional Types Basics**

```typescript
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>;
type B = IsString<number>;
```

### **Answer:**

```
A = "yes"
B = "no"
```

**Why:** The conditional type checks whether `T` extends `string` and returns "yes" or "no."

---

### **9.2 Nested Conditional Types**

```typescript
type TypeCheck<T> = T extends number
  ? "number"
  : T extends string
  ? "string"
  : "unknown";

type Result1 = TypeCheck<42>;
type Result2 = TypeCheck<"Hello">;
type Result3 = TypeCheck<boolean>;
```

### **Answer:**

```
Result1 = "number"
Result2 = "string"
Result3 = "unknown"
```

**Why:** The type system evaluates each conditional type in sequence.

---

---

## **10. Template Literal Types and String Manipulation**

### **10.1 Basic Template Literal Types**

```typescript
type Greeting = `Hello, ${string}!`;

const msg: Greeting = "Hello, John!"; // Is this allowed?
```

### **Answer:**

```
Yes
```

**Why:** The type `Greeting` accepts any string that matches the pattern `"Hello, ${string}!"`.

---

### **10.2 String Manipulation in Types**

```typescript
type CapitalizeWord<T extends string> = Capitalize<T>;

type Example1 = CapitalizeWord<"typescript">;
type Example2 = CapitalizeWord<"hello world">;
```

### **Answer:**

```
Example1 = "Typescript"
Example2 = "Hello world"
```

**Why:** The `Capitalize<T>` utility type capitalizes the first letter of the string.

---

---

## **11. Type Manipulation with `infer` and Recursive Types**

### **11.1 Extract Return Type with `infer`**

```typescript
type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;

function greet(name: string): string {
  return `Hello, ${name}`;
}

type GreetReturn = ReturnTypeOf<typeof greet>;
```

### **Answer:**

```
GreetReturn = string
```

**Why:** `infer R` extracts the return type from the function type.

---

### **11.2 Recursive Types**

```typescript
type NestedArray<T> = T | NestedArray<T>[];

const example: NestedArray<number> = [1, [2, [3, 4]], 5];
console.log(example);
```

### **Answer:**

```
[1, [2, [3, 4]], 5]
```

**Why:** Recursive types allow defining types that contain themselves.

---

---

## **12. Module Augmentation and Declaration Merging**

### **12.1 Module Augmentation**

```typescript
// Assume a library exports the following:
declare module "library" {
  interface Config {
    setting: boolean;
  }
}

// Extend the module
declare module "library" {
  interface Config {
    customSetting: string;
  }
}

const config: Config = { setting: true, customSetting: "advanced" };
console.log(config);
```

### **Answer:**

```
{ setting: true, customSetting: 'advanced' }
```

**Why:** Module augmentation allows extending third-party module definitions.

---

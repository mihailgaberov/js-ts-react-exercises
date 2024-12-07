Here's the complete `README.md` file with all sections included:

---

# 📚 Advanced TypeScript Exercises with Answers

An advanced collection of TypeScript exercises covering types, generics, mapped types, utility types, and more. Each exercise includes the answer and a detailed explanation.

---

## **Table of Contents**

1. [Type Inference and Type Annotations](#1-type-inference-and-type-annotations)
2. [Interfaces, Types, and Generics](#2-interfaces-types-and-generics)
3. [Utility Types and Conditional Types](#3-utility-types-and-conditional-types)
4. [Type Guards and Advanced Type Inference](#4-type-guards-and-advanced-type-inference)
5. [Decorators and Metadata](#5-decorators-and-metadata)
6. [Enums and Literal Types](#6-enums-and-literal-types)
7. [Advanced Generics and Constraints](#7-advanced-generics-and-constraints)
8. [Mapped Types in Depth](#8-mapped-types-in-depth)
9. [Conditional Types (Advanced Usage)](#9-conditional-types-advanced-usage)
10. [Template Literal Types and String Manipulation](#10-template-literal-types-and-string-manipulation)
11. [Type Manipulation with `infer` and Recursive Types](#11-type-manipulation-with-infer-and-recursive-types)
12. [Module Augmentation and Declaration Merging](#12-module-augmentation-and-declaration-merging)

---

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

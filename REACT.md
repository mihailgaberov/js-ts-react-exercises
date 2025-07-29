# Questions and Answers

1. What is the difference between Component and PureComponent?
   Give an example where it might break my app.

   `PureComponent` is a React component that is optimized for performance. It does a shallow comparison of props and
   state, and only re-renders if the props or state have changed. This is done in `shouldComponentUpdate` method,
   whereas the regular component doesn't implement this method by default
   and will re-render every time when its parent re-renders. PureComponent can break the app when we pass props that are not primitive
   data types. For example objects or arrays, like here:

   ```javascript
   import React, { PureComponent } from 'react';

    class MyPureComponent extends PureComponent {
        render() {
            return <div>{this.props.data.value}</div>;
        }
    }

    export default function App() {
        const [data, setData] = React.useState({ value: 0 });

        const increment = () => {
            data.value++; // Mutating the object
            setData(data); // State reference remains the same
        };

        return (
            <div>
                <button onClick={increment}>Increment</button>
                <MyPureComponent data={data} />
            </div>
        );
    }
   }
   ```

   Since PureComponent uses a shallow comparison, it doesn't detect changes to the data object because its reference hasn't changed.
   As a result, the component doesn't re-render, even though `data.value` has been updated.

2. `Context` + `ShouldComponentUpdate` might be dangerous. Why is
   that?

   It is not a good idea to use these two together, because the `Context` updates don't respect the `shouldComponentUpdate` and will re-render all subscribed components any time the context changes. This can potentially cause unexpected behavior. The way to go around this is to use `useContext` hook inside functional components and avoid using `shouldComponentUpdate` with context dependent components.

3. Describe 3 ways to pass information from a component to its
   PARENT.

   The most common and direct way to pass information is via callback functions. The parent pass the callback function as a prop to the child component and the child calls the callback function with the information it needs. Other methods would be by using React Context API or a 3rd party state management library (e.g. Redux, Jotai, Zustand). Both methods allows parent and child components to access shared store/state and call functions to update it. There are also some not that famouse methods for passing data from child to parent, like using refs (which is more imperative way, where the child exposes methods or data to the parent through a ref) or event bubbling (standard DOM events that use the `window` object's `dispatchEvent` method).

4. Give 2 ways to prevent components from re-rendering.

By using `React.memo` to prevent unnecessary re-renders for functional components based on props. And also by using `useMemo` to cache expensive calculations and `useCallback` to memoize functions. With `useMemo` we make sure the reference to our object doesn't change, i.e. we don't create a new object every time and hence the component doesn't re-render. With `useCallback` we make sure the function reference remains stable, so the child component doesn't re-render unnecessarily.

And as a rule of thumb we should avoid using inline functions and objects when passing props in JSX because they are getting recreated every time the component re-renders.

useCallback example:

```javascript
const Child = React.memo(({ onClick }) => {
  console.log(">>> render Child");
  return <button onClick={onClick}>Click Me</button>;
});

function Parent() {
  const [count, setCount] = React.useState(0);

  const handleClick = React.useCallback(() => {
    console.log(">>> click");
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <Child onClick={handleClick} />
    </div>
  );
}
```

useMemo example:

```javascript
const Child = React.memo(({ data }) => {
  console.log(">>> render Child");
  return <div>{data.value}</div>;
});

function Parent() {
  const [count, setCount] = React.useState(0);

  const data = React.useMemo(() => ({ value: "Hello" }), []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <Child data={data} />
    </div>
  );
}
```

5. What is a fragment and why do we need it? Give an example where it might break my app.

Fragment is a special wrapper element that we can use in React JSX to group elements without adding any extra DOM nodes to the page and thus polute the DOM with redundant container elements such as `<div>` or `<span>`. It looks like this `<></>` or `<Fragment></Fragment>`. Since React components must return a single element, using a fragment allows us to return multiple elements from a component without needing to use tags like `<div>` just to wrap them and satifsy this rule.

For example, instead of using this:

```javascript
return (
  <div>
    <h1>My App</h1>
    <p>Some text</p>
  </div>
);
```

We can use this:

```javascript
return (
  <>
    <h1>My App</h1>
    <p>Some text</p>
  </>
);
```

Fragments cannot have attributes such as `className` or `id`, and if we need to use such on wrapper level we need to use a tag instead or it will break our app. Also if we use loops in our render we can't go with fragments because JSX doesn't know how to resolve them. We should mention here that the long syntax, `<Fragment></Fragment>`, supports key attributes. I.e. if we need to use keys we could to something like:

```javascript
return items.map((item) => (
  <React.Fragment key={item}>
    <li>{item}</li>
  </React.Fragment>
));
```

And this will work in a loop.

6. Give 3 examples of the HOC pattern.

   HOC is a design pattern that allows us to reuse component logic by wrapping it in another component. It is a way to add new behavior to an existing component without modifying its code. Examples of HOC could be:
   useAuthorization, useLoading, useLogging - all of these add functionality to the existing component by wrapping it and 'attaching' the new behavior to it.

   For example we can use HOC to create a protected route that only authorized users can access. We could do something like this:

   ```javascript
   const withAuthorization = (WrappedComponent) => {
     return (props) => {
       if (!props.isAuthenticated) {
         return <div>Please log in to access this page.</div>;
       }
       return <WrappedComponent {...props} />;
     };
   };

   const Dashboard = () => <div>Welcome to the Dashboard!</div>;
   const ProtectedDashboard = withAuthorization(Dashboard);

   <ProtectedDashboard isAuthenticated={true} />;
   ```

7. What's the difference in handling exceptions in promises,
   callbacks and async…await?

   Promises provide built-in mechanism for handling async operations and errors using .then() and .catch() methods - error thrown inside .then() block or rejected promises are caught by .catch() block. Example would be:

```javascript
fetchDataPromise()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
```

Callbacks are older mechanism for handling async operations where error handling is typically done manually by catching the error as a first argument (Node.js style) in a if() statement. The callback's arguments are usually called `err` and `data`, where the first one is the error and then is the result. Simple example would be:

```javascript
fetchDataCallback((err, data) => {
  if (err) {
    console.error("Caught in callback:", err);
  } else {
    console.log(data);
  }
});
```

`async/await` is a syntax sugar over promises, it makes asynchronous code look like synchronous and it uses `try/catch` blocks to handle errors. Example would be:

```javascript
async function fetchData() {
  try {
    const data = await fetchDataPromise();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

8. How many arguments does `setState` take and why is it async.

`setState` takes two arguments - the state update (which may be an object or a function) and an optional callback function that will be called after the state is updated. The callback function is optional and can be used to perform additional actions after the state has been updated and the component has been re-rendered.

Example of using it with both arguments (it must be in class component, as useState and useReducer hooks don't support the second callback argument):

```javascript
this.setState({ count: this.state.count + 1 }, console.log(">>> Kaboooom"));
```

It is async because of the way React does the updates during its re-render cycles - for better performance it batches multiple setState calls together and applies them in a single re-render cycle. This also contributes to avoid race conditions and ensure consistency of the state.

9. List the steps needed to migrate a Class to Function
   Component.

   Here are the steps I will follow (not mandatory in this order):

- Change the class signature to a function signature.
- Remove the `constructor`, `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` methods.
- Remove the `this` keyword from the class methods and replace it with the function names.
- Use `useEffect` hooks instead of `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.
- Use `setState` for managing the state instead of `this.setState`.
- Replace `React.createRef()` and ref usage in class components with the `useRef` hook.
- Remove the `render` method and replace it with a return statement containing the JSX.

10. List a few ways styles can be used with components.

I am familiar with the following styling techniques:

- Inline styles
- Plain CSS
- SASS/SCSS
- CSS modules
- CSS-in-JS (Styled Components or Emotion)
- Utility-First CSS Frameworks (such as Tailwind CSS)
- Global CSS Frameworks (such as Bootstrap or Foundation)
- Theme Providers (Styled Components, Emotion, MUI)
- Atomic CSS (BEM or OOCSS Methodology)
- Component Libraries (e.g., Material-UI, Chakra UI)

11. How to render an HTML string coming from the server.

    By deserialize and sanitize it first - the html from the server often comes as part of a JSON or plain text and we must make sure to parse it properly and avoid any security issues. This is so because HTML strings can contain malicious code and should be sanitized before being rendered. We can use the `dangerouslySetInnerHTML` prop to render the HTML string safely. Example:

```javascript
const htmlString = "<h1>Hello, world!</h1>";
return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
```

We should always sanitize the HTML string before rendering, especially if it comes from an untrusted source.

If we control the server we may use another approach - instead of sending raw HTML we send JSON that we could map through in a JSX component.

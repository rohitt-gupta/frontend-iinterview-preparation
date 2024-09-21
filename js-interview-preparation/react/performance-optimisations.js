import React, { lazy, Suspense } from "react";

/**
 * Different ways to increase performance of a react application.
 */

// 1. Dynamic imports, Lazy and Suspense
// Code Splitting with React.lazy and Suspense
// -> whenever the component is required then only load ther component and render it.
// use Lazy to import and Suspense to generate a fallback.

// const RenderTodos = lazy(() => import("./render-todos"));
// const App = () => {
// 	return (
// 		<Suspense fallback={<div> Loading ...</div>}>
// 			<RenderTodos />
// 		</Suspense>
// 	);
// };

// export default App

/**
 * 2. UseBrowser level Lazy loading
 * Fetch images/load images dynamically wehn we scroll to that image
 */

// const App = () => {
// 	return (
// 		<div>
// 			<h1>Show image</h1>
// 			<img loading='lazy' src='./profile.png' alt='Profile picture image' />
// 		</div>
// 	);
// };

/**
 * 3.Use memo
 * It works similar to a caching mechanism
 * It caches your result or return value of a function
 * Useful when computiing a complex function
 *
 * IT CACHES THE RETURN VALUE OF A FUNCTION
 */

// for JS
// const calculation = useMemo(() => expensiveCalculation(count), [count]);

// const expensiveCalculation = (num) => {
// 	for (let index = 0; index < 100000000; index++) {
// 		num += 1;
// 	}
// 	return num;
// };

// FOR REACT:
// React.memo is a higher-order component that prevents unnecessary re-renders by memoizing the rendered output of a component when its props haven't changed.

// import React, { memo } from "react";
// // memoized function
// const MyComponent = memo(({ data }) => {
// 	return <div>{data}</div>;
// });

// export default MyComponent;

/**
 * 4. useCallback
 * IT CACHES THE WHOLE FUNCTION
 * These hooks memoize expensive calculations and function instances respectively, preventing unnecessary computations and re-renders.
 */

import React, { useMemo, useCallback } from "react";

const ExpensiveComponent = ({ compute, data }) => {
	const computedValue = useMemo(() => compute(data), [compute, data]);

	const handleClick = useCallback(() => {
		console.log("Button clicked");
	}, []);

	return (
		<div>
			<div>{computedValue}</div>
			<button onClick={handleClick}>Click me</button>
		</div>
	);
};

export default ExpensiveComponent;

/**
 * 5. Properly Using Keys in Lists
Description:
Using unique and stable keys helps React identify which items have changed, preventing unnecessary re-renders.
 */

const ItemList = ({ items }) => {
	<ul>
		{items.map((item) => {
			<li key={item.id}>{item}</li>;
		})}
	</ul>;
};

/**
 * 9. Efficient State Management
Description:
* Managing state effectively reduces re-renders and ensures components only update when necessary. Consider using state management libraries like Redux or Context API wisely.
Tips:
* Lift State Up Only When Necessary: Avoid unnecessary state lifting which can lead to excessive re-renders.
* Minimize Global State: Store only essential data in global state to reduce the complexity and improve performance.
* Use Selectors: Implement selectors to prevent components from re-rendering when unrelated parts of the state change.
 */

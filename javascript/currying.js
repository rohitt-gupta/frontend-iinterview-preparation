/**
 * What is currying?
 * Currying is a functional programming technique where a function with multiple arguments is transformed into a sequence of functions, each taking a single argument. This allows you to create new functions by pre-filling some of the arguments, leading to more modular and reusable code.
Benefits of Currying:
1. Code Reusability: You can create specialized functions from a general function by fixing some arguments. For example, if you have a function that adds two numbers, you can create a new function that always adds a specific number.
2. Improved Readability: Currying can make your code more readable by breaking down complex functions into simpler, unary functions. This modularity helps in understanding the flow of data and logic.
3. Performance Optimization: By using currying, you can avoid redundant calculations. For instance, if a function requires an expensive operation (like a database call) to retrieve some data, you can curry that function to only perform the operation once and reuse the result in subsequent calls.
4. Context Injection: Currying allows you to inject context into functions cleanly. For example, if you have a function that processes data based on certain rules, you can create a curried version that retains those rules, reducing the need to pass them repeatedly.
 */

/**
 * Convert f(a,b) into f(a)(b)
 */

function fun(a) {
	return function (b) {
		console.log(a, b);
	};
}

fun(5)(6);

/**
 * Q1. sum(2)(6)(1)
 */

function sum(a) {
	return function (b) {
		return function (c) {
			return a + b + c;
		};
	};
}

console.log(sum(2)(6)(1));

/**
 * Q2. -
 * evaluate("sum")(4)(2) => 6
 * evaluate("multiply")(4)(2) => 8
 * evaluate("divide")(4)(2) => 2
 * evaluate("subtract")(4)(2) => 2
 */

function evaluate(operation) {
	return function (a) {
		return function (b) {
			switch (operation) {
				case "sum":
					return a + b;
				case "multiply":
					return a * b;
				case "divide":
					return a / b;
				case "sub":
					return a - b;
				default:
					return "Invalid operation";
			}
		};
	};
}

const mul = evaluate("multiply");
mul(3)(4);
mul(3)(4);

console.log(
	evaluate("sum")(4)(2),
	evaluate("multiply")(4)(2),
	evaluate("divide")(4)(2),
	evaluate("sub")(4)(2)
);

/**
 * 3. Infinite currying
 * Using recursion
 */

function add(a) {
	return function (b) {
		if (b) return add(a + b);
		return a;
	};
}

console.log(add(1)(3)(6)());

/**
 * 4. Difference between currying and Partial application
 * currying means number of functions returned is equal to number of arguments
 * partial application means dividing application into multiple function or smaller functions
 */

// this is partial application
function sum(a) {
	return function (b, c) {
		return a + b + c;
	};
}

// this is currying
function sum(a) {
	return function (b) {
		return function (c) {
			return a + b + c;
		};
	};
}

/**
 * 5. Give a real world application to use currying:
 * We can use currying to manipulate DOM as well as shown below
 We
 */

// we can use this function to update the id content again and again just by initializing it once.
function updateHeadingById(id) {
	return function (content) {
		document.querySelector("#" + id).textContent = content;
	};
}

// for eg:
const updateHeader = updateHeadingById("heading");

updateHeader("FOllow me on twitter @whyrohitwhy");

/**
 * curry() implementation
 * convert f(a,b,c) into f(a)(b)(c)
 */

function curry(func) {
	return function curriedFn(...args) {
		if (args.length >= func.length) {
			return func(...args);
		} else {
			return function (...next) {
				return curriedFn(...args, ...next);
			};
		}
	};
}

const sum = (a, b, c, d) => a + b + c + d;
const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)(4)); // 10

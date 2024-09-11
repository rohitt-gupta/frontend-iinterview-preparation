// 1. what is function declaration
function square(num) {
	return num * num;
}

// Q2. What is function expression?
// store function inside an variable
const square = function (num) {
	return num * num;
};

// Q3. What are first class functions?
/**
 * Functions in JS are treated as first class citizens. which means functions can be:
 * Assigned to variables
 * Passed as argu,ments to other functions
 * returned from functions
 * stored in DS
 */
const square = function (num) {
	return num * num;
};

function printSquare(square) {
	console.log(square(5));
}

printSquare(square);

/**
 * Q4. What is IIFE?
 * Immediately invoked function expression.
 * (function (y) {
		console.log(x);
	})(2)
 */
// Q5.
(function (x) {
	console.log(x);
	console.log(y);
	return (function (y) {})(2);
})(4);

/**
 * Q. 6 Function scope
 *
 */

/**
 * Q7. Function scope O/P question
 * if var going to print 5 5 5 5 5 and if let then 0 1 2 3 4
 */

for (var i = 0; i < 5; i++) {
	setTimeout(function () {
		console.log(i);
	}, i * 1000);
}

/**
 * Q8. Function hoisting
 * functions are hoisted differently
 */

/**
 * Q9. Output based questions
 * answer is undefined. because it created a seperate execution context for that function or local scope
 */
var x = 21;
var fun = function () {
	console.log(x);
	var x = 20;
};

fun();

/**
 * Q10. Spread vs rest operator.
 */

function multiply(num1, num2) {
	console.log(num1 * num2); // 30
}

function multiply(...nums) {
	// rest operator ...nums in parameter
	console.log(nums); // [5,6]
}

var arr = [5, 6];
multiply(arr[0], arr[1]); // one way
multiply(...arr); // second way -> spread operator

/**
 * Q11. params vs args
 * rest and spread operators are always present in the end
 */

const fn = (a, x, y, ...numbers) => {
	console.log(x, y, numbers);
};

fn(5, 6, 3, 7, 8, 9);

/**
 * Q12. Callback functions
 * when we are passing a function inside of another function and then it is being manipulated inside of that.
 */

/**
 * Q13 Arrow functions vs Normal functions Differences
 */
// 1. syntax
function square(num) {
	return num * num;
}

const square = () => {
	return num * num;
};

// 2. Implicit return keyword
// we can also write arrow function as
const squareArrow = (num) => num * num;

// 3. Argument keyword
// you can access arguments even without explicitly passing the paramenters by using "argument keywork"
function fn() {
	console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3 }
}
fn(1, 2, 3);

const fnArr = () => {
	console.log(arguments);
};

fnArr(1, 2, 3);

// 4. "this" keyword differences in normal and arrow functions

let profile = {
	name: "rohit",
	fun1: () => {
		console.log("Hello there!, welcome", this.name); // undefined here this refers to global context or scopr
	},
	fun2() {
		console.log("Hellp there!, welcome", this.name); // "rohit" here this refers to local scope
	},
};

profile.fun1();
profile.fun2();

// Q1. What is a closure
// A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives a function access to its outer scope. In JavaScript, closures are created every time a function is created, at function creation time.
// eg:

// global scope
const username = "rohit";
function init() {
	// local scope
	console.log(username);
}
init();

// lexical scope of init fun = local + global scope

// eg:2
// global scope
function init() {
	var name = "rohit";
	//inner scope 2
	function displayName() {
		// display name is a closure
		// inner scope
		console.log(name);
	}
	displayName();
}

init();

/**
 * 2. closure Scope chaining, example provided below
 */

// global scope
const e = 10;
function sum(a) {
	return function (b) {
		return function (c) {
			// outer functions scope
			return function (d) {
				// local scope
				return a + b + c + d + e;
			};
		};
	};
}

console.log(sum(1)(2)(3)(4)); // 20

/**
 * Q1. What will be logged to the console
 */
let count = 0;
(function printCount() {
	if (count === 0) {
		let count = 1; // shadowing
		console.log(count); // 1
	}
	console.log(count); //0
})();

/**
 * 2. Write a function to do this
 */

function createBase(num) {
	return function (closureParam) {
		console.log(closureParam + num);
	};
}

var addSix = createBase(6);
addSix(10); // returns 16
addSix(21); // returns 27

/**
 * 3. Time Otmisitation: optimise time with closre
 */

function find() {
	let a = [];
	for (let i = 0; i < 1000000; i++) {
		a[i] = i * i;
	}
	return function (index) {
		console.log(a[index]);
	};
}

const closure = find();
console.time("6");
closure(6);
console.timeEnd("6");

console.time("12");
closure(12);
console.timeEnd("12");

// console
// 36
// 6: 9.127ms
// 144
// 12: 0.443ms

/**
 * 4. setTimeout output
 * for var it will be 3 3 3, why? var is functional scope so when the for loop ran we will have refrence to same i variable in all the 3 loops and it just updates that reference value. Here after the 3 for loops the settimeout runs printing same i which is equal to 3 now
 *
 * for let it will be 0 1 2, why? because it is block scope and after the loop runs one time
 *
 * setTimeout will run after all the code is run, so does the cb function inside it
 */

// it is like this for all the 3 loops
/**
 * FOR VAR, when i gets updated all the is are updated since it all has same ref of the value
 * {i=3, setTimeout}{i=3, setTimeout}{i=3, settimeout} , i became 3 but no setimeout pushed into to the queue
 *
 *
 * FOR LET:
 *  {i=0, setTimeout}{i=1, setTimeout}{i=2, settimeout} , i became 3 but no setimeout pushed into to the queue.
 * This time since let is block scope so for every block a new i will be defined with different reference address, so it will not be updated.
 */

function a() {
	for (var i = 0; i < 3; i++) {
		setTimeout(function log() {
			console.log(i);
		}, i * 1000);
	}
}

a();

/**
 * 5. For the same code above get 0 1 2 using var only.
 * ANS: Use closure to make var into local function which is called inner and it will have a separate memory space.
 */

for (var i = 0; i < 3; i++) {
	function inner(i) {
		setTimeout(function log() {
			console.log(i);
		}, i * 1000);
	}
	inner(i);
}

/**
 * 6. How can you create a private counter using closures?
 */

function counter(initialValue) {
	var _counter = initialValue || 0;
	function add(increment) {
		_counter += increment;
	}
	function subtract(decrement) {
		_counter -= decrement;
	}
	function retrieve() {
		return _counter;
	}

	return {
		subtract,
		add,
		retrieve,
	};
}

const counter1 = counter(5);
const counter2 = counter(15);

counter1.add(10);
console.log(counter1.retrieve()); //15

counter2.add(15);
console.log(counter2.retrieve()); //30

/**
 * Q 6 What is Module pattern
 * It is a way to make  public methods and private functions and variables but being accessible using public methods.
 */

var Module = (function () {
	function privateMethod() {
		// do something
		console.log("private");
	}

	return {
		publicMethod: function () {
			// call private variables or methods here and make them accessible to general public
			console.log("public");
		},
	};
})();

Module.publicMethod(); // print public
Module.privateMethod(); // ref error

/**
 * 7. Make this run only once
 */

// SIMPLE WAY
let profile;
function starThisRepo() {
	profile = "rohitt-gupta";
	let called = 0;
	return function () {
		if (called > 0) {
			console.log("Already following!");
		} else {
			console.log("Follow me on github: ", profile);
			called++;
		}
	};
}
const hitFollow = starThisRepo();

hitFollow();
hitFollow();
hitFollow();
hitFollow();
hitFollow();
hitFollow();

// MORE GENERIC WAY
/**
 * 8 Make a polyfill for the ONCE functionality.
 */

// ONCE POLYFILL

function once(func, context) {
	let ran;

	return function () {
		if (func) {
			ran = func.apply(context || this, arguments);
			func = null;
		}
		return ran;
	};
}

const hello = once((a, b, c) => {
	console.log("Hello", a, b, c);
});

hello(1, 2, 3);
hello(1, 2, 3);
hello(1, 2, 3);
hello(1, 2, 3);
hello(1, 2, 3);

/**
 * 9 Implement Caching or memoize function in javascript
 * if the parameters of the function are same then cache the result and use the same cached result
 */

function myMemoize(fn, context) {
	let res = {};
	return function (...args) {
		let stringCache = JSON.stringify(args);
		if (!res[stringCache]) {
			res[stringCache] = fn.call(context || this, ...args);
		}
		return res[stringCache];
	};
}

function calculateExpensive(num1, num2) {
	for (let i = 0; i < 10000000; i++) {}
	return num1 * num2;
}

const memoizedCalaulation = myMemoize(calculateExpensive);

console.time("first");
console.log(memoizedCalaulation(67672, 8787));
console.timeEnd("first");

// 94633864
// first: 11.127ms

console.time("second");
console.log(memoizedCalaulation(67672, 8787));
console.timeEnd("second");

// 594633864
// second: 0.14ms

console.time("third");
console.log(memoizedCalaulation(67672, 8787));
console.timeEnd("third");

// 594633864
// third: 0.117ms

// this keyword
// explain this keyword

const user = {
	name: "Rohit",
	greet() {
		return `Hello, ${this.name}!`;
	},
	farewell: () => {
		return `GoodBye, ${this.name}!`;
	},
};

console.log(user.greet());
console.log(user.farewell());
// Hello, Rohit!
// GoodBye, undefined!

/**
 * 5. Create an object calculator
 */

let calculator = {
	read() {
		this.a = +prompt("a = ", 0);
		this.b = +prompt("b = ", 0);
	},

	sum() {
		return this.a + this.b;
	},
	mul() {
		return this.a * this.b;
	},
};

console.log(calculator.sum());
console.log(calculator.mul());

/**
 * Q what is the output
 */

var length = 4;

function callback() {
	console.log(this);
}

const object = {
	length: 5,
	method(fn) {
		fn();
	},
};

object.method(callback); // undefined

/**
 * q
 * it will print 3 as the arguments itself is an object so the callback function inside the arguments object will be pointing towards length of arguments object
 */

var length = 4;

function callback() {
	console.log(this.length);
}

const object = {
	length: 5,
	method() {
		console.log(arguments.length); // 3
		arguments[0]();
	},
};

object.method(callback, 1, 2); // 3 , whi

/**
 * Q implement the calc function or object
 *
 */

const calc = {
	total: 0,
	add(a) {
		this.total = this.total + a;
		return this;
	},
	multiply(a) {
		this.total = this.total * a;
		return this;
	},
	subtract(a) {
		this.total = this.total - a;
		return this;
	},
};

const result = calc.add(10).multiply(5).subtract(30).add(10);

console.log(result.total);

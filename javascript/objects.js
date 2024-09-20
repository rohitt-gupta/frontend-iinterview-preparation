// Objects in Js

const user = {
	name: "ROhit",
	age: 59,
	"fowwlow on twitter": true,
};
console.log(user["fowwlow on twitter"]);

console.log(user.age);
user.age = 29;
console.log(user.age);
delete user.age;
console.log(user);

/**
 * result?
 * Delete property will only be used when you wan to delete a property from an object and not an local variable
 */

const func = (function (a) {
	delete a;
	return a;
})(5);

console.log(func);

/**
 * Dynamic values in the object
 */
const property = "name";
const name = "Rohit gupta";

const user = {
	[property]: name,
};

console.log(user);

/**
 * Iterate through an object
 */

const user = {
	name: "Rohit",
	age: 59,
	"fowlow on twitter": "@whyrohitwhy",
};

for (key in user) {
	console.log(key + ": " + user[key]);
}

// INTERVIEW QUESTIONS ON OBJECTS IN JS
/**
 * Q.1 What is the output
 * Added later while printing will be used
 */

const obj = {
	a: "one",
	b: "two",
	a: "three",
};

console.log(obj); //{ a: 'three', b: 'two' }

/**
 * 2. Creating a function multiplybyTwo(obj) that multiplies all numeric properties values of nums by 2
 */

let nums = {
	a: 100,
	b: 200,
	title: "My Nums",
};

function multiplyNumeric(obj) {
	for (key in obj) {
		if (typeof obj[key] === "number") {
			obj[key] *= 2;
		}
	}
}
console.log(nums);

multiplyNumeric(nums);
console.log(nums);

/**
 * 3. WHat's the output?
 * THe object will be assigned as "[Object] [Object]" in a as it should be converted into string.
 * therefore c will also be the same
 */

const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a[b]); // 456

/**
 * 4. WHat is JSON stringify and JSON.parse
 * One of the use cases: when we try to store item in localStorage then we need to make it as stringified
 */

const user = {
	name: "Rohit",
	twitter: "whyrohitwhy",
};

const stringUser = JSON.stringify(user);
console.log(stringUser);
localStorage.setItem("test", stringUser);

const normalUser = JSON.parse(localStorage.getItem("test"));
console.log(normalUser);

/**
 * 5. What is the output
 */

console.log([..."Lydia"]);  ['l', 'y' ...]

/**
 * 6 whats the output
 */

const user = { name: "Lydia", age: 21 };
const admin = { admin: true, ...user };

console.log(admin);

/**
 * 7 whats the output
 * only stringify level and health
 */

const settings = {
	username: "Piyush",
	level: 19,
	health: 90,
};

const data = JSON.stringify(settings, ["level", "health"]);
console.log(data);

/**
 * 8 whats the output
 * Arrow function "this" references to the window object not on the locla object
 */

const shape = {
	radius: 10,
	diameter() {
		return this.radius * 2;
	},
	perimeter: () => 2 * Math.PI * this.radius,
};

console.log(shape.perimeter()); // NaN
console.log(shape.diameter()); //20

/**
 * 9. What is destructuring in objects
 */

let user = {
	name: "Rohit",
	age: 40,
	fullName: {
		firstName: "Rohit",
		lastName: "Gupta",
	},
};

const name = "Raj Gupta";

const {
	name: myName,
	fullName: { firstName, lastName },
} = user;

console.log(firstName + lastName);

/**
 * 10. What's the output?
 */

function getItems(fruitList, favFruit, ...args) {
	return [...fruitList, ...args, favFruit];
}

console.log(getItems(["banana", "apple"], "pear", "orange", "mango"));
// [ 'banana', 'apple', 'orange', 'mango', 'pear' ]

/**
 * 11. What's the output
 * When we do d=c, or assign any variable exisiting object, we just don't copy all the elements from obj1 to obj2 . but instead we provide reference to obj1 to variable.
 * if we change anything in obj1 or obj2, it will simply change from the ref, which will reflect in both the objects
 */

let c = { greeting: "Hey!" };
let d;

d = c;
c.greeting = "hello";

console.log(d.greeting); // hello

/**
 * FOLLOW UP QUESTION:
 * how to do deep copy then so that if i change anything of obj2 it doesnot affect on obj1
 */

let c = { greeting: "Hey!" };
let d;

d = { ...c };
c.greeting = "hello";

console.log(d.greeting); // Hey!

/**
 * 12 What's the output
 * Ob jects are only equal when they are referencing same location/space in the memory
 * Right now both the objkects are different , occupies different space in the memory
 */

console.log({ a: 1 } == { a: 1 }); // false
console.log({ a: 1 } === { a: 1 }); // false

/**
 * Q13. What is the output
 */

let person = { name: "Lydia" };
const members = [person];

person = null;

console.log(members); // [ { name: 'Lydia' } ] as we are setting members[0] = person. Now if person changes it doesnot matterbecause we have given separate location to members[0]
console.log(person);

person.name = null; // not it is going to affect the membrrs array because we only set the location of object to members[0] not the object's properties

/**
 * 14 output
 */
const value = { number: 10 };

const multiply = (x = { ...value }) => {
	console.log((x.number *= 2));
};

multiply(); // 20
multiply(); // 20
multiply(value); // 20
multiply(value); // 40

/**
 * 15. What is the output
 */

function changeAgeAndReference(person) {
	person.age = 25;
	person = {
		name: "john",
		age: 50,
	};
	return person;
}

const personObj1 = {
	name: "Alex",
	age: 30,
};

const personObj2 = changeAgeAndReference(personObj1);

console.log(personObj1); // { name: 'Alex', age: 25 }

console.log(personObj2); //   { name: 'john', age: 50 }

/**
 *
 */

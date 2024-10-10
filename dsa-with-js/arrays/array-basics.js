// declaration

// 1st way to declare÷
// const arr = new Array()

// 2nd way is to

const person = {
	name: "rohit",
	age: 29,
};
const arr = ["apple", "banana", "cherry", person];

// 1: Get the length of an array arr.length
// 2. push anything at the last

// Add anything to the last of the array
// arr.push("orange");
// arr.pop();

// add anything to the top of the array
arr.unshift("orange");

// remove anything from the top of the Array
arr.shift();

const nums = [1, 2, 3, 4, 5, 6, 7];

// map in arrays
const nums2 = nums.map((number, index, array) => number * index);

// filter in array
const nums3 = nums.filter((number, index, array) => number > 3);

// reduce
const sum = nums.reduce((prev, curr) => {
	return prev + curr;
}, 0);

// some return if any of the item matches the condition ( good to find the values)
const someReturn = nums.some((number) => number === 4); // === 4 => true, but ==9  retursns false

// every => if every item in array follows the condition then it is true othewise false
const everyReturn = nums.every((number) => number >= 5);

// find => return the first value that matches the ocndition, if it finds, it returns the value otherwise undefined
const findValue = nums.find((number) => number >= 10);

// spread and rest operators

const num1 = [1, 2, 3, 4];
const num2 = [5, 6, 7, 8];

// spread operator
const finalNums = [...num1, ...num2];

// using rest operator we can have unknown number of arguments into a function
function merge(...numbers) {
	return numbers; // [ [ 1, 2, 3, 4 ], [ 5, 6, 7, 8 ] ]
}

// concat => combines mulitple arrays and returns a new aray wth all the elements
const newArr = arr.concat(num1, num2, finalNums, merge(num1, num2));

// slice => takes in start and end index and return that sliced array, includes the first index but excludes the last index

const arr1 = [1, 2, 3, 4];

const res = arr1.slice(1, 3); // [2,3]
const res2 = arr1.slice(-2); // [3,4]

/**
 * Splice function
 * removes items from startIndex to endIndex and adds new _value to their place
 * doesnot return anything, it changes the original array
 * @param startIndex
 * @param endIndex
 * @param new_value
 */

// arr1.splice(2, 3, "apple", "organe", "hello", "good luck", "nice");
// [ 1, 2, 'apple', 'organe', 'hello', 'good luck', 'nice' ]

/**
 * @name Fill
 * it replaces all the values in the array with the given value
 * by default  it take sin one arg which is value.
 * if given 2nd startInddex paramenter, it will start from that index and replace everyting with that value
 * @param value
 * @param startIndex
 */

// arr1.fill(5, 2);

/**
 * findIndex
 * returns the first match of the value
 */
console.log(arr1);
const index = arr1.findIndex((item) => item === 4);

/**
 * @name Falt
 * flats the nested arrays which can be used with out any parameters and if you want to flaten all of the array pass the levels
 */

const flatEx = [1, [2, 3], [3, 4, 5], 6];
const flattenedArr = flatEx.flat();

// reverse an array
// flattenedArr.reverse();

// sort an array
/**
 * @name sort
 * For asending order  (a,b)=> a-b
 * takes in a callback function
 * For asending order  (a,b)=> a-b
 * For decending order  (a,b)=> b-a
 *
 */
console.log(flattenedArr);

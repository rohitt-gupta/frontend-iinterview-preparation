var createCounter = function (init) {
	let value = init;
	const increment = function () {
		value++;
	};

	const decrement = function () {
		value--;
	};

	const reset = function () {
		value = init;
	};

	const retrieve = function () {
		return value;
	};

	return { increment, decrement, reset, retrieve };
};

const counter = createCounter(2);
// counter.increment();

console.log(counter.retrieve());

console.log(counter.increment());
console.log(counter.retrieve());

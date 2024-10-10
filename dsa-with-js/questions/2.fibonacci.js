// 0 1 1 2 3
function fib(x) {
	if (x === 0) return 0;
	if (x === 1) return 1;

	return fib(x - 1) + fib(x - 2);
}

const fib2 = (x) => (x < 2 ? x : fib(x - 1) + fib(x - 2));
console.time("time taken: ");
console.log(fib2(47));
console.timeEnd("time taken: ");

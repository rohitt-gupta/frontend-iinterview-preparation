const nums = [1, 2, 3, 4];

// 1.map polyfill
Array.prototype.myMap = function (cb) {
	let result = [];
	for (let i = 0; i < this.length; i++) {
		result.push(cb(this[i], i, this));
	}
	return result;
};

const mysum = nums.myMap((num, i, arr) => {
	return num * 2;
});

// 2. Filter polyfill
Array.prototype.myFilter = function (cb) {
	let result = [];
	for (let i = 0; i < this.length; i++) {
		if (cb(this[i], i, this)) {
			result.push(this[i]);
		}
	}
	return result;
};

const myres = nums.myFilter((num, i, arr) => {
	return num > 2;
});

// 3. Reduce
Array.prototype.myReduce = function (cb, init) {
	let acc = init;
	for (let i = 0; i < this.length; i++) {
		console.log("acc", acc);
		if (acc === null || acc === undefined) {
			acc = this[i];
		}
		acc = cb(acc, this[i], i, this);
	}
	return acc;
};

const myres = nums.myReduce((acc, curr, i, arr) => {
	return acc * curr;
}, 1);

var twoSum = function (nums, target) {
	const obj = {};

	for (let i = 0; i < nums.length; i++) {
		const currValue = nums[i];

		if (obj[target - currValue] !== undefined) {
			return [i, obj[target - currValue]];
		} else {
			obj[currValue] = i;
		}
	}
	console.log("obj", obj);
};

console.log(twoSum([2, 7, 11, 15], 9));

/**
 * Rotate the array to the right by k steps.
 * big solution, TLE on leetcode
 * @param {R} arr
 * @param {*} k
 */
function rotateArray1(arr, k) {
	while (k--) {
		const last = arr.pop();
		arr.unshift(last);
	}
	return arr;
}

// this is optimised and is accepted on leetcode
function rotateArray2(arr, k) {
	let size = arr.length;

	k = k % size;

	const rotated = arr.splice(size - k, size);
	arr.unshift(...rotated);
	return arr;
}

const nums1 = [1, 2, 3, 4, 5, 6, 7];

console.log(rotateArray2(nums1, 3)); // 5,6,7,1,2,3,4

const nums2 = [-1, -100, 3, 99];
console.log(rotateArray2(nums2, 2)); // 3,99,-1,-100

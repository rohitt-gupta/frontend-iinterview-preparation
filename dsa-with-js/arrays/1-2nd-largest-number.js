/**
 * Time complexity = O(NLogN)
 * @param {*} arr
 * @returns
 */
const secondLargestNumber = (arr) => {
	const uniqueArr = Array.from(new Set(arr));
	uniqueArr.sort();
	if (uniqueArr.length >= 2) {
		return uniqueArr[uniqueArr.length - 2];
	} else {
		return -1;
	}
};

// O(N)
function optimisedSecondLargest(arr) {
	let largest = -1;
	let second = -1;
	for (let i = 0; i < arr.length; i++) {
		const curr = arr[i];
		if (curr > largest) {
			second > largest;
			largest = curr;
		}
		if (curr != largest && curr > second) {
			second = curr;
		}
	}
	return second;
}

console.log(optimisedSecondLargest([12, 35, 1, 10, 34, 1])); // 34
console.log(optimisedSecondLargest([10, 5, 10])); //5

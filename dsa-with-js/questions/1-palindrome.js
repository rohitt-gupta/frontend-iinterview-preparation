function isPalindrome1(str) {
	console.log(typeof str);
	if (typeof str === "number") {
		console.log("helpo");
		str = str.toString();
	}
	const size = str.length;
	let i = 0,
		j = size - 1;

	while (i <= j) {
		if (str[i] === str[j]) {
			i++;
			j--;
		} else {
			return false;
		}
	}
	return true;
}

function isPalindrome2(num) {
	return num === +num.toString().split("").reverse().join("");
}

const result = isPalindrome2(12121);
console.log(result);

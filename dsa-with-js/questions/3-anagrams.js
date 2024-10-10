const isAnagram1 = (s, t) => {
	return s.length !== t.length
		? false
		: s.split("").sort().join("") === t.split("").sort().join("");
};

const isAnagram2 = (s, t) => {
	if (s.length !== t.length) return false;

	const obj1 = {};
	const obj2 = {};

	for (let i = 0; i < s.length; i++) {
		obj1[s[i]] = (obj1[s[i]] || 0) + 1;
		obj2[t[i]] = (obj2[t[i]] || 0) + 1;
	}

	for (const key in obj1) {
		if (obj1[key] !== obj2[key]) {
			return false;
		}
	}

	// console.log(obj1);

	// console.log(obj2);
	return true;
};

console.log(isAnagram2("anagram", "nagaraa"));

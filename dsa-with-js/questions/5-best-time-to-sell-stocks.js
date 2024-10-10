var getMaxProfit = function (prices) {
	let minStart = prices[0];
	let maxProfit = 0;

	for (let i = 0; i < prices.length; i++) {
		const currPrice = prices[i];

		if (currPrice < minStart) {
			minStart = currPrice;
		}

		if (maxProfit < currPrice - minStart) {
			maxProfit = currPrice - minStart;
		}
	}

	return maxProfit;
};

console.log(getMaxProfit([7, 1, 5, 3, 6, 9]));

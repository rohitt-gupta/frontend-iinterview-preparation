var isValidSudoku = function (board) {
	const colMap = new Map();
	const rowMap = new Map();

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			const currValue = board[row][col]; // get current value

			if (!colMap.has(row)) {
				// check if colMap has a hashset with key col(number), if not create one
				colMap.set(row, new Set());
			}
			const currColSet = colMap.get(row); // get the col: hashset
			if (currColSet.has(currValue)) {
				console.log("current currColSet", currColSet);
				console.log("currValue before false", currValue);
				// check if colHashSet has this value already present, then return false, as this is invalid sudoku
				return false;
			} else {
				// if not , add that value
				if (currValue !== ".") currColSet.add(currValue);
			}

			if (!rowMap.has(col)) {
				rowMap.set(col, new Set());
			}
			const currRowSet = rowMap.get(col); // get the rowNum: currRowSet
			if (currRowSet.has(currValue)) {
				console.log("current currRowSet", currRowSet);
				console.log("currValue before false", currValue);
				return false;
			} else {
				currRowSet.add(currValue);
			}
		}
	}
	return true;
};

board = [
	["5", "3", ".", ".", "7", ".", ".", ".", "."],
	["6", ".", ".", "1", "9", "5", ".", ".", "."],
	[".", "9", "8", ".", ".", ".", ".", "6", "."],
	["8", ".", ".", ".", "6", ".", ".", ".", "3"],
	["4", ".", ".", "8", ".", "3", ".", ".", "1"],
	["7", ".", ".", ".", "2", ".", ".", ".", "6"],
	[".", "6", ".", ".", ".", ".", "2", "8", "."],
	[".", ".", ".", "4", "1", "9", ".", ".", "5"],
	[".", ".", ".", ".", "8", ".", ".", "7", "9"],
];
console.log(isValidSudoku(board));

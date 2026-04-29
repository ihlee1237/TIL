//https://leetcode.com/problems/minimum-operations-to-make-a-uni-value-grid/description/?envType=daily-question&envId=2026-04-28
function minOperations(grid: number[][], x: number): number {
	const flattenArr = grid.flat().sort((a, b) => a - b);
	const length = flattenArr.length;
	const midIndex = length % 2 === 0 ? length / 2 : (length - 1) / 2;
	const targetNumber = flattenArr.at(midIndex) ?? flattenArr[0];
	let count = 0;

	for (const num of flattenArr) {
		const diff = targetNumber - num;
		const _count = diff / x;
		if (!Number.isInteger(_count)) {
			count = -1;
			break;
		} else {
			count += Math.abs(_count);
		}
	}

	return count;
}

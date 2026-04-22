// https://leetcode.com/problems/number-of-provinces/description/?envType=study-plan-v2&envId=leetcode-75
function findCircleNum(isConnected: number[][]): number {
    let numOfProvince = 0;
    const visited: { [key: number]: boolean } = {};
    isConnected.forEach((c, i) => {
        if (!visited[i]) {
            ++numOfProvince;
            visit(i);
        }
    });

    function visit(index: number): void {
        visited[index] = true;
        isConnected[index].forEach((e, i) => {
            if (e && !visited[i]) visit(i);
        });
    }

    return numOfProvince;
};
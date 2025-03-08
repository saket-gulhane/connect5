export interface cellTYpe {
  x: number;
  y: number;
  state: number;
  winner: boolean;
}
const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
];

function handleBfs(
  grid: Array<Array<cellTYpe>>,
  dir: Array<number>,
  reqLen: number,
  x: number,
  y: number,
  reqState: number,
  gridLen: number
): boolean {
  if (x < 0 || y < 0 || x >= gridLen || y >= gridLen) return false;

  if (grid[x][y].state !== reqState) return false;

  if (grid[x][y].state === reqState) {
    if (reqLen - 1 === 0) {
      return true;
    }
    if (
      handleBfs(
        grid,
        dir,
        reqLen - 1,
        x + dir[0],
        y + dir[1],
        reqState,
        gridLen
      )
    ) {
      return true;
    }
  }

  return false;
}

export const checkState = (
  grid: Array<Array<cellTYpe>>,
  cell: cellTYpe,
  reqLen: number,
  gridLen: number
): Array<number> | null => {
  const { x, y } = cell;

  for (let i = 0; i < 8; i++) {
    if (
      handleBfs(
        grid,
        dirs[i],
        reqLen - 1,
        x + dirs[i][0],
        y + dirs[i][1],
        cell.state,
        gridLen
      )
    ) {
      return dirs[i];
    }
  }

  return null;
};

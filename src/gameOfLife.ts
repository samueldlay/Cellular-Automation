export type Board = number[][];

export function generateBoard (
  rows: number,
  columns: number,
  random?: boolean,
): Board {
  const board: Board = [];
  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; c < columns; c++) {
      board[r][c] = random ? Math.floor(Math.random() * 2) : 0;
    }
  }
  return board;
}

export function cloneBoard (board: Board): Board {
  return board.map(row => [...row]);
}

function aliveCount (neighbors: number[]): number {
  return neighbors.filter(Boolean).length;
  // return neighbors.filter((n) => n === 1).length;
}

function shouldReproduce (neighbors: number[]): boolean {
  return aliveCount(neighbors) === 3;
}

function shouldSurvive (neighbors: number[]): boolean {
  const count = aliveCount(neighbors);
  return [2, 3].includes(count);
  // return aliveCount(neighbors) === 2 || aliveCount(neighbors) === 3;
}

export function getNextBoard (currentBoard: Board): Board {
  const nextBoard: Board = [];

  for (let currentRow = 0; currentRow < currentBoard.length; currentRow++) {
    const nextRow: number[] = [];
    nextBoard[currentRow] = nextRow;

    for (
      let currentColumn = 0;
      currentColumn < currentBoard[0].length;
      currentColumn++
    ) {
      const currentCell = currentBoard[currentRow][currentColumn];
      const aboveNeighbor = currentBoard[currentRow - 1]?.[currentColumn];
      const aboveLeft = currentBoard[currentRow - 1]?.[currentColumn - 1];
      const aboveRight = currentBoard[currentRow - 1]?.[currentColumn + 1];
      const belowNeighbor = currentBoard[currentRow + 1]?.[currentColumn];
      const belowLeft = currentBoard[currentRow + 1]?.[currentColumn - 1];
      const belowRight = currentBoard[currentRow + 1]?.[currentColumn + 1];
      const leftNeighbor = currentBoard[currentRow][currentColumn - 1];
      const rightNeighbor = currentBoard[currentRow][currentColumn + 1];

      const neighbors = [
        aboveNeighbor,
        aboveLeft,
        aboveRight,
        belowNeighbor,
        belowLeft,
        belowRight,
        leftNeighbor,
        rightNeighbor
      ]
      .filter(neighbor => typeof neighbor === 'number');
      // .filter(Boolean);

      if (currentCell === 0) {
        // it's dead
        if (shouldReproduce(neighbors)) {
          nextRow[currentColumn] = 1;
        } 
        else nextRow[currentColumn] = currentCell;
      }
      else {
        // it's alive
        if (shouldSurvive(neighbors)) {
          nextRow[currentColumn] = currentCell;
        } 
        else nextRow[currentColumn] = 0;
      }
    }
  }

  return nextBoard;
}

console.clear();

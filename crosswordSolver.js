export const crosswordSolver = (puzzle, words) => {};

export const parsePuzzle = (puzzleString) => {
  if (puzzleString.length === 0) {
    return '';
  }

  // Split puzzleString by \n to get each row
  const rows = puzzleString.split('\n');

  // Convert each row to an array of characters
  const puzzleGrid = rows.map((row) => row.split(''));
  return puzzleGrid;
};

/*
const emptyPuzzle = `2001\n0..0\n1000\n0..0`;
const grid = parsePuzzle(emptyPuzzle);
*/

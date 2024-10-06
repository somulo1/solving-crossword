export const crosswordSolver = (puzzle, words) => {
  // Parse the puzzle into a 2D grid
  const puzzleGrid = parsePuzzle(puzzleString);

  // Find word positions based on numbers in the puzzle
  const wordPositions = findWordPositions(puzzleGrid);

  // Try to fill the words in the puzzle grid
  const filledGrid = fillWordsInPuzzle(puzzleGrid, wordPositions, words);

  if (!filledGrid) {
    console.log('Error');
  } else {
    // Convert the grid back to a string for output
    const result = filledGrid.map((row) => row.join('')).join('\n');
    console.log(result);
  }
};

export const parsePuzzle = (puzzle) => {
  if (puzzle.length === 0) {
    return '';
  }

  // Split puzzle by \n to get each row
  const rows = puzzle.split('\n');

  // Convert each row to an array of characters
  const puzzleGrid = rows.map((row) => row.split(''));
  return puzzleGrid;
};

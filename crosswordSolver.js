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

export const findWordPositions = (puzzleGrid) => {
  const wordPositions = [];

  for (let row = 0; row < puzzleGrid.length; row++) {
    for (let col = 0; col < puzzleGrid[row].length; col++) {
      const char = puzzleGrid[row][col];

      if (!isNaN(char) && char > 0) {
        const wordCount = parseInt(char, 10);

        // Check if words can be placed horizontally
        if (col + wordCount <= puzzleGrid[row].length) {
          wordPositions.push({
            direction: 'horizontal',
            row,
            col,
            length: wordCount,
          });
        }
        // Check if words can be placed vertically
        if (row + wordCount <= puzzleGrid.length) {
          wordPositions.push({
            direction: 'vertical',
            row,
            col,
            length: wordCount,
          });
        }
      }
    }
  }
  return wordPositions;
};

const grid = parsePuzzle('');
const wordSpots = findWordPositions(grid);
console.log(wordSpots);

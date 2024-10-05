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

const fillWordsInPuzzle = (puzzleGrid, wordPositions, words) => {
  // Sort words by their length to match them with positions
  words.sort((a, b) => a.length - b.length);

  for (let i = 0; i < wordPositions.length; i++) {
    const direction = wordPositions[i];
    const row = wordPositions[i];
    const col = wordPositions[i];
    const length = wordPositions[i];
    const word = words.find((w) => w.length === length);

    if (!word) {
      console.log('Error');
      return;
    }

    // Remove word from list to avoid reusing it
    words = words.filter((w) => w !== word);

    // Place word in the grid
    if (direction === 'horizontal') {
      for (let j = 0; j < length; j++) {
        if (puzzleGrid[row][col + j] !== '.') {
          puzzleGrid[row][col + j] = word[j];
        }
      }
    } else if (direction === 'vertical') {
      for (let j = 0; j < length; j++) {
        if (puzzleGrid[row + j][col] !== '.') {
          puzzleGrid[row + j][col] = word[j];
        }
      }
    }
  }
  return puzzleGrid;
};

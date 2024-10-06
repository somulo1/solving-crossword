const crosswordSolver = (puzzle, words) => {
  // Parse the puzzle into a 2D grid
  const puzzleGrid = parsePuzzle(puzzle);

  // Find word positions based on numbers in the puzzle
  const wordPositions = findWordPositions(puzzleGrid);

  // Fill the words in the puzzle grid
  const filledGrid = fillWordsInPuzzle(puzzleGrid, wordPositions, words);

  // Output the result or an error message
  console.log(filledGrid ? formatGrid(filledGrid) : 'Error');
};

// Parses the puzzle into a 2D grid of characters
const parsePuzzle = (puzzle) => {
  if (!puzzle) return []; // Return an empty grid if the input is empty

  return puzzle.split('\n').map((row) => row.split(''));
};

// Finds possible positions for words based on numbers in the puzzle
const findWordPositions = (puzzleGrid) => {
  const wordPositions = [];

  for (let row = 0; row < puzzleGrid.length; row++) {
    for (let col = 0; col < puzzleGrid[row].length; col++) {
      const char = puzzleGrid[row][col];

      if (!isNaN(char) && char > 0) {
        const wordCount = parseInt(char, 10);
        addWordPositions(wordPositions, puzzleGrid, row, col, wordCount);
      }
    }
  }
  return wordPositions;
};

// Helper function to add word positions
const addWordPositions = (wordPositions, puzzleGrid, row, col, wordCount) => {
  if (col + wordCount <= puzzleGrid[row].length) {
    wordPositions.push({ direction: 'horizontal', row, col, length: wordCount });
  }
  if (row + wordCount <= puzzleGrid.length) {
    wordPositions.push({ direction: 'vertical', row, col, length: wordCount });
  }
};

// Fills words in the puzzle grid based on identified positions
const fillWordsInPuzzle = (puzzleGrid, wordPositions, words) => {
  // Sort words by their length to match them with positions
  words.sort((a, b) => a.length - b.length);

  for (const { direction, row, col, length } of wordPositions) {
    const word = words.find((w) => w.length === length);

    if (!word) {
      return null; // Return null if no suitable word is found
    }

    // Remove word from list to avoid reusing it
    words = words.filter((w) => w !== word);

    placeWordInGrid(puzzleGrid, word, row, col, length, direction);
  }
  return puzzleGrid;
};

// Places the word in the grid based on direction
const placeWordInGrid = (puzzleGrid, word, row, col, length, direction) => {
  for (let j = 0; j < length; j++) {
    if (direction === 'horizontal') {
      puzzleGrid[row][col + j] = word[j]; // Place word horizontally
    } else if (direction === 'vertical') {
      puzzleGrid[row + j][col] = word[j]; // Place word vertically
    }
  }
};

// Formats the grid back to a string for output
const formatGrid = (grid) => grid.map((row) => row.join('')).join('\n');

module.exports = {
  crosswordSolver,
  parsePuzzle,
  findWordPositions,
  fillWordsInPuzzle,
  formatGrid,
};

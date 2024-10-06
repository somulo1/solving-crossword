const crosswordSolver = (puzzle, words) => {
  // Parse the puzzle into a 2D grid
  const puzzleGrid = parsePuzzle(puzzle);
  console.log('Parsed Puzzle Grid:', puzzleGrid);

  // Find word positions based on numbers in the puzzle
  const wordPositions = findWordPositions(puzzleGrid);
  console.log('Found Word Positions:', wordPositions);

  // Try to fill the words in the puzzle grid
  const filledGrid = fillWordsInPuzzle(puzzleGrid, wordPositions, words);
  console.log('Filled Grid:', filledGrid);

  if (!filledGrid) {
    console.log('Error: Unable to fill the puzzle.');
  } else {
    // Convert the grid back to a string for output
    const result = filledGrid.map((row) => row.join('')).join('\n');
    console.log('Final Result:\n', result);
  }
};

const parsePuzzle = (puzzle) => {
  if (puzzle.length === 0) {
    console.log('Input puzzle is empty.');
    return '';
  }

  // Split puzzle by \n to get each row
  const rows = puzzle.split('\n');
  console.log('Rows from Puzzle:', rows);

  // Convert each row to an array of characters
  const puzzleGrid = rows.map((row) => row.split(''));
  return puzzleGrid;
};

const findWordPositions = (puzzleGrid) => {
  const wordPositions = [];

  for (let row = 0; row < puzzleGrid.length; row++) {
    for (let col = 0; col < puzzleGrid[row].length; col++) {
      const char = puzzleGrid[row][col];

      if (!isNaN(char) && char > 0) {
        const wordCount = parseInt(char, 10);
        console.log(`Found number ${char} at (${row}, ${col}) indicating ${wordCount} words.`);

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
  console.log('Sorted Words:', words);

  for (let i = 0; i < wordPositions.length; i++) {
    const { direction, row, col, length } = wordPositions[i];
    const word = words.find((w) => w.length === length);

    if (!word) {
      console.log('Error: No suitable word found for position:', wordPositions[i]);
      return null;
    }

    // Remove word from list to avoid reusing it
    words = words.filter((w) => w !== word);
    console.log(`Placing word '${word}' at (${row}, ${col}) direction: ${direction}`);

    // Place word in the grid
    if (direction === 'horizontal') {
      for (let j = 0; j < length; j++) {
        if (puzzleGrid[row][col + j] === '.') {
          puzzleGrid[row][col + j] = word[j];
        }
      }
    } else if (direction === 'vertical') {
      for (let j = 0; j < length; j++) {
        if (puzzleGrid[row + j][col] === '.') {
          puzzleGrid[row + j][col] = word[j];
        }
      }
    }
  }
  return puzzleGrid;
};

module.exports = {
  crosswordSolver,
  parsePuzzle,
  findWordPositions,
  fillWordsInPuzzle,
};

// Test Case 5
const words5 = ["ABC", "DEF", "GHI", "JKL"]; // Updated words
const puzzle5 = `3.\n.\n3.`; // Updated puzzle
console.log("Test Case 5:");
crosswordSolver(puzzle5, words5);


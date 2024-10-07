export const crosswordSolver = (puzzleString, words) => {
  // Check if the puzzleString and words are valid
  if (!isValidPuzzle(puzzleString) || !isValidWordList(words)) {
    // If either of the two are invalid, return an error message
    return 'Error';
  }

  // Parse the puzzle string into a 2D array
  const grid = parsePuzzle(puzzleString);

  // Identify the empty slots in the puzzle grid
  const slots = identifyWordSlots(grid);

  // Check if the number of words matches the number of slots
  if (slots.length !== words.length) {
    // If the number of words does not match the number of slots, return an error message
    return 'Error';
  }

  // Sort the slots by length in descending order
  slots.sort((a, b) => b.length - a.length);

  // Attempt to solve the puzzle
  const solution = solveGrid(grid, slots, words);

  // If the puzzle is solved, convert the solution to a string and return it
  // Otherwise, return an error message
  return solution ? solutionToString(solution) : 'Error';
};

export const identifyWordSlots = (grid) => {
  /**
   * This function takes a 2D array grid and returns an array of objects
   * where each object represents a slot in the grid where a word can fit.
   * The object has the following properties:
   *   - row: the row index of the slot
   *   - col: the column index of the slot
   *   - length: the length of the slot
   *   - isHorizontal: a boolean indicating whether the slot is horizontal or vertical
   */

  const slots = [];

  // Iterate over the grid, cell by cell
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex];

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const cell = row[colIndex];

      // Check if the cell is a valid starting point for a word
      if (/[12]/.test(cell)) {
        // Check for horizontal slots
        if (
          // Make sure the cell is not on the left edge of the grid
          (colIndex === 0 || row[colIndex - 1] === '.') &&
          // Make sure the cell is not on the right edge of the grid
          colIndex + 1 < row.length &&
          // Make sure the cell after this one is not empty
          row[colIndex + 1] !== '.'
        ) {
          // Find the horizontal slot
          const horizontalSlot = findHorizontalSlot(grid, rowIndex, colIndex);
          // If the slot is valid, add it to the array of slots
          if (horizontalSlot) slots.push(horizontalSlot);
        }

        // Check for vertical slots
        if (
          // Make sure the cell is not on the top edge of the grid
          (rowIndex === 0 || grid[rowIndex - 1][colIndex] === '.') &&
          // Make sure the cell is not on the bottom edge of the grid
          rowIndex + 1 < grid.length &&
          // Make sure the cell below this one is not empty
          grid[rowIndex + 1][colIndex] !== '.'
        ) {
          // Find the vertical slot
          const verticalSlot = findVerticalSlot(grid, rowIndex, colIndex);
          // If the slot is valid, add it to the array of slots
          if (verticalSlot) slots.push(verticalSlot);
        }
      }
    }
  }

  return slots;
};

export const findHorizontalSlot = (grid, rowIndex, columnIndex) => {
  // Start by setting the length of the slot to 0
  let length = 0;

  // Loop through the row of the grid from the current column index to the right
  while (
    // Make sure we don't go out of bounds of the row
    columnIndex + length < grid[rowIndex].length &&
    // Make sure the cell we're looking at is not empty
    grid[rowIndex][columnIndex + length] !== '.'
  ) {
    // Increment the length of the slot for each non-empty cell we find
    length++;
  }

  // If the length of the slot is greater than 1, return the slot details
  // Otherwise, return null
  return length > 1
    ? {
        // The row index of the slot
        row: rowIndex,
        // The column index of the slot
        col: columnIndex,
        // The length of the slot
        length,
        // Whether the slot is horizontal or not
        isHorizontal: true,
      }
    : null;
};

export const findVerticalSlot = (grid, rowIndex, columnIndex) => {
  // Start by setting the length of the slot to 0
  let length = 0;

  // Loop through the column of the grid from the current row index down
  while (
    // Make sure we don't go out of bounds of the grid
    rowIndex + length < grid.length &&
    // Make sure the cell we're looking at is not empty
    grid[rowIndex + length][columnIndex] !== '.'
  ) {
    // Increment the length of the slot for each non-empty cell we find
    length++;
  }

  // If the length of the slot is greater than 1, return the slot details
  // Otherwise, return null
  return length > 1
    ? {
        // The row index of the slot
        row: rowIndex,
        // The column index of the slot
        col: columnIndex,
        // The length of the slot
        length,
        // Whether the slot is horizontal or not
        isHorizontal: false,
      }
    : null;
};

export const isValidPuzzle = (puzzleString) => {
  // Split the puzzle string into an array of strings, one for each line
  const lines = puzzleString.trim().split('\n');

  // Get the length of the first line
  const firstLineLength = lines[0].length;

  // Check that the puzzle string is not empty
  // and that each line has the same length as the first line
  // and that each line contains only the characters '0', '1', '2', and '.'
  // and that each line contains at least one character
  return (
    lines.length > 0 &&
    lines.every(
      (line, index) =>
        line.length === firstLineLength &&
        /^[012.\n]+$/.test(line) &&
        (index === 0 || line.length === lines[index - 1].length)
    )
  );
};

export const isValidWordList = (wordList) => {
  // Check that the wordList is an array
  // and that it has at least one element
  // and that each element is unique
  // and that each element is a string containing only letters
  return (
    Array.isArray(wordList) &&
    wordList.length > 0 &&
    new Set(wordList).size === wordList.length &&
    wordList.every((word) => /^[a-zA-Z]+$/u.test(word))
  );
};

/**
 * Takes a puzzle string and parses it into a 2D array.
 * The puzzle string is expected to be a string of newline-separated
 * strings, where each string represents a row in the puzzle grid.
 * Each character in the string represents a cell in the puzzle grid,
 * where '0' represents a filled-in cell, '1' represents a cell that
 * is part of a word, '2' represents a cell that is part of a word
 * that has already been solved, and '.' represents an empty cell.
 * The function returns a 2D array, where each element is an array
 * of characters representing a row in the puzzle grid.
 * @param {String} puzzleString - The puzzle string to be parsed
 * @returns {Array<Array<String>>} - The parsed 2D array
 */
export const parsePuzzle = (puzzleString) =>
  puzzleString
    .trim() // Remove any whitespace from the start and end of the string
    .split('\n') // Split the string into an array of strings, one for each line
    .map((row) => row.split('')); // Split each string into an array of characters

const solveGrid = (grid, slots, words) => {
  // The number of solutions we've found so far
  let solutionCount = 0;

  // The final solution we find
  let finalSolution = null;

  // A set of the words we've already used
  const usedWords = new Set();

  // A function to recursively explore the possible solutions
  const explore = (slotIndex) => {
    // If we've reached the end of the slots, we've found a solution
    if (slotIndex === slots.length) {
      // Increment the solution count
      solutionCount++;

      // If this is the first solution we've found, save it
      if (solutionCount === 1) {
        finalSolution = JSON.parse(JSON.stringify(grid));
      }

      // Return true if we've found more than one solution
      return solutionCount > 1;
    }

    // The current slot we're looking at
    const currentSlot = slots[slotIndex];

    // For each word in the word list
    for (const word of words) {
      // If we've already used this word, or if it's not the right length, skip it
      if (usedWords.has(word) || word.length !== currentSlot.length) continue;

      // If we can place the word in the current slot
      if (canPlaceWord(grid, currentSlot, word)) {
        // Place the word in the current slot
        placeWord(grid, currentSlot, word);

        // Add the word to the set of used words
        usedWords.add(word);

        // Recursively explore the next slot
        if (explore(slotIndex + 1)) return true;

        // If we didn't find a solution, remove the word from the current slot
        removeWord(grid, currentSlot);

        // Remove the word from the set of used words
        usedWords.delete(word);
      }
    }

    // If we didn't find a solution, return false
    return false;
  };

  // Start the exploration
  explore(0);

  // Return the final solution if we found one, otherwise return null
  return solutionCount === 1 ? finalSolution : null;
};

export const canPlaceWord = (grid, slot, word) => {
  const { row, col, isHorizontal, length } = slot;
  // Iterate over each character in the word
  for (let i = 0; i < length; i++) {
    // Get the row and column indices of the current cell in the grid
    // Depending on whether the slot is horizontal or vertical, we increment
    // either the row or column index
    const rowIndex = isHorizontal ? row : row + i;
    const colIndex = isHorizontal ? col + i : col;

    // Get the current value of the cell in the grid
    const currentCellValue = grid[rowIndex][colIndex];

    // Get the value of the current character in the word
    const wordValue = word[i];

    // If the current cell value is not a "blank" cell (i.e. a '.')
    // and the current cell value does not match the value of the current
    // character in the word, then we can't place the word in this slot
    if (currentCellValue !== '.' && currentCellValue !== wordValue) {
      return false;
    }
  }

  // If we've reached this point, then we can place the word in the slot
  return true;
};

export const placeWord = (grid, { row, col, isHorizontal }, word) => {
  // Iterate over each character in the word
  for (let i = 0; i < word.length; i++) {
    // Get the row and column indices of the current cell in the grid
    // Depending on whether the slot is horizontal or vertical, we increment
    // either the row or column index
    const rowIndex = isHorizontal ? row : row + i;
    const colIndex = isHorizontal ? col + i : col;

    // Place the current character in the word into the current cell in the grid
    grid[rowIndex][colIndex] = word[i];
  }
};

export const removeWordFromGrid = (grid, { row, col, length, isHorizontal }) => {
  // This function takes a grid and a slot object, and removes the word from
  // the grid. It does this by iterating over each cell in the slot, and
  // setting the value of each cell to either the length of the word (if it's
  // the first cell in the slot) or '0' (if it's not the first cell in the slot)

  // Iterate over each cell in the slot
  for (let i = 0; i < length; i++) {
    // Depending on whether the slot is horizontal or vertical, calculate the
    // row and column indices of the current cell in the grid
    const currentRow = isHorizontal ? row : row + i;
    const currentCol = isHorizontal ? col + i : col;

    // Set the value of the current cell in the grid to either the length of
    // the word (if it's the first cell in the slot) or '0' (if it's not the
    // first cell in the slot)
    grid[currentRow][currentCol] = i === 0 ? length.toString() : '0';
  }
};

export const solutionToString = (grid) => {
  // This function takes a 2D array of strings (where each string represents a row
  // in the grid) and returns a string representing the solution.
  // To do this, it:
  // 1. Maps over each row in the grid, and for each row, it:
  //    a. Joins all the strings in the row together with a space in between
  //    b. Returns the resulting string
  // 2. Joins all the strings returned by the map function together with a newline
  //    character in between
  // 3. Returns the resulting string

  return grid.map((row) => row.join('')).join('\n');
};

const puzzle = '2001\n0..0\n1000\n0..0';
const words = ['casa', 'alan', 'ciao', 'anta'];
console.log(crosswordSolver(puzzle, words));

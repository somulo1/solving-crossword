export const crosswordSolver = (puzzleString, words) => {
  // Check if the puzzleString and words are valid
  if (!isValidPuzzle(puzzleString) || !isValidWordList(words)) {
    return 'Error';
  }

  // Parse the puzzle string into a 2D array
  const grid = parsePuzzle(puzzleString);

  // Identify the empty slots in the puzzle grid
  const slots = identifyWordSlots(grid);

  // Check if the number of words matches the number of slots
  if (slots.length !== words.length) {
    return 'Error';
  }

  // Sort the slots by length in descending order
  slots.sort((a, b) => b.length - a.length);

  // Attempt to solve the puzzle
  const solution = solveGrid(grid, slots, words);

  // If the puzzle is solved, convert the solution to a string and return it otherwise, return an error message
  return solution ? solutionToString(solution) : 'Error';
};

export const identifyWordSlots = (grid) => {
  const slots = [];

  // Iterate over the grid, cell by cell
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const cell = row[colIndex];

      // Check if the cell is a valid starting point for a word
      if (/[12]/.test(cell)) {
        if (
          // Make sure the cell is not on the left edge or right edge of the grid and the next cell is not empty
          (colIndex === 0 || row[colIndex - 1] === '.') &&
          colIndex + 1 < row.length &&
          row[colIndex + 1] !== '.'
        ) {
          const horizontalSlot = findHorizontalSlot(grid, rowIndex, colIndex);
          if (horizontalSlot) slots.push(horizontalSlot);
        }

        if (
          // Make sure the cell is not on the top edge or bottom edge of the grid and the cell below is not empty
          (rowIndex === 0 || grid[rowIndex - 1][colIndex] === '.') &&
          rowIndex + 1 < grid.length &&
          grid[rowIndex + 1][colIndex] !== '.'
        ) {
          const verticalSlot = findVerticalSlot(grid, rowIndex, colIndex);
          if (verticalSlot) slots.push(verticalSlot);
        }
      }
    }
  }

  return slots;
};

export const findHorizontalSlot = (grid, rowIndex, columnIndex) => {
  let length = 0;

  // Loop through the row of the grid from the current column index to the right
  while (
    // Esure we don't go out of bounds of the row and that the cell we are looking for is not empty
    columnIndex + length < grid[rowIndex].length &&
    grid[rowIndex][columnIndex + length] !== '.'
  ) {
    // Increment the length of the slot for each non-empty cell
    length++;
  }

  // If the length of the slot is greater than 1, return the slot details otherwise, return null
  return length > 1
    ? {
        row: rowIndex,
        col: columnIndex,
        length,
        isHorizontal: true,
      }
    : null;
};

export const findVerticalSlot = (grid, rowIndex, columnIndex) => {
  let length = 0;

  // Loop through the column of the grid from the current row index down
  while (
    // Make sure we don't go out of bounds of the grid and the cell we're looking for is not empty
    rowIndex + length < grid.length &&
    grid[rowIndex + length][columnIndex] !== '.'
  ) {
    // Increment the length of the slot for each non-empty cell we find
    length++;
  }

  // If the length of the slot is greater than 1, return the slot details otherwise, return null
  return length > 1
    ? {
        row: rowIndex,
        col: columnIndex,
        length,
        isHorizontal: false,
      }
    : null;
};

export const isValidPuzzle = (puzzleString) => {
  // Split the puzzle string into an array of strings, one for each line
  const lines = puzzleString.trim().split('\n');
  const firstLineLength = lines[0].length;

  // Check that the puzzle string is not empty, each line has the same length as the first line, each line contains only the characters '0', '1', '2', and '.' and that each line contains at least one character
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
  // Check that the wordList is an array, it has at least one element, each element is unique and each element is a string containing only letters
  return (
    Array.isArray(wordList) &&
    wordList.length > 0 &&
    new Set(wordList).size === wordList.length &&
    wordList.every((word) => /^[a-zA-Z]+$/u.test(word))
  );
};

export const parsePuzzle = (puzzleString) =>
  puzzleString
    .trim()
    .split('\n')
    .map((row) => row.split(''));

const solveGrid = (grid, slots, words) => {
  let solutionCount = 0;
  let finalSolution = null;

  // A set of the words already used
  const usedWords = new Set();

  // Function to recursively explore the possible solutions
  const explore = (slotIndex) => {
    // If we've reached the end of the slots, we've found a solution
    if (slotIndex === slots.length) {
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
        removeWordFromGrid(grid, currentSlot);

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
  for (let i = 0; i < length; i++) {
    // Get the row and column indices of the current cell in the grid depending on whether the slot is horizontal or vertical
    const rowIndex = isHorizontal ? row : row + i;
    const colIndex = isHorizontal ? col + i : col;

    // Get the current value of the cell in the grid
    const currentCellValue = grid[rowIndex][colIndex];

    // Get the value of the current character in the word
    const wordValue = word[i];

    if (
      currentCellValue !== '.' &&
      currentCellValue !== wordValue &&
      !/^[012]$/.test(currentCellValue)
    ) {
      return false;
    }
  }

  return true;
};

export const placeWord = (grid, { row, col, isHorizontal }, word) => {
  for (let i = 0; i < word.length; i++) {
    // Get the row and column indices of the current cell in the grid depending on whether the slot is horizontal or vertical
    const rowIndex = isHorizontal ? row : row + i;
    const colIndex = isHorizontal ? col + i : col;

    // Place the current character in the word into the current cell in the grid
    grid[rowIndex][colIndex] = word[i];
  }
};

export const removeWordFromGrid = (
  grid,
  { row, col, length, isHorizontal }
) => {
  // This function takes a grid and a slot object, and removes the word from the grid.

  for (let i = 0; i < length; i++) {
    // Calculate the row and column indices of the current cell in the grid
    const currentRow = isHorizontal ? row : row + i;
    const currentCol = isHorizontal ? col + i : col;

    // Set the value of the current cell in the grid to either the length of the word or '0'
    grid[currentRow][currentCol] = i === 0 ? length.toString() : '0';
  }
};

export const solutionToString = (grid) => {
  return grid.map((row) => row.join('')).join('\n');
};

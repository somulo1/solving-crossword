function crosswordSolver(emptyPuzzle, words) {

  // Check for invalid emptyPuzzle type
  if (typeof emptyPuzzle !== 'string') {
      console.log('Error');
      return;
  }

  let i = 0; j = i+1;
  let validity = true;

  while (i < words.length && j < words.length) {
    if (words[i] !== words[j]) {
      j++
    } else {
      validity = false;
      break
    }
    if (i === words.length - 1) {
      i++
    }
  }

  if (!validity) {
    console.log('Error');
    return
  }

  // Check for invalid words length, emptyPuzzle characters, and words type 
  if (words.length < 3 || !/^[.\n012]+$/.test(emptyPuzzle) || !Array.isArray(words)) {
      console.log('Error');
      return;
  }

  // Check if any element in 'words' is not a string
let foundInvalidWord = false;

for (let i = 0; i < words.length; i++) {
    if (typeof words[i] !== "string") {
        foundInvalidWord = true;
        break;
    }
}

// Pint error message if invalid, exit
if (foundInvalidWord) {
    console.log("Error");
    return;
}

// Sort 'words' from longest to shortest
words.sort((a, b) => b.length - a.length);
const shortest = words[words.length-1].length;
const wordStarts = [];
let tag = 0; // To track the number of placed words

// Render 'emptyPuzzle into 2D array (array of array of string)
const grid = emptyPuzzle.split('\n').map(line => line.split(''));
const height = grid.length;
const width = grid[0].length;

  // Identify potential starting points for placement
  for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
          if (grid[i][j] === '2') {
              tag += 2;
          } else if (grid[i][j] === '1') {
              tag += 1;
          }
          if (grid[i][j] === '1' || grid[i][j] === '2') {
              // Check horizontally
              if (j === 0 || grid[i][j-1] === '0' || grid[i][j-1] === '.') {
                  let k = j;
                  while (k < width && (grid[i][k] === '0' || grid[i][k] === '1' || grid[i][k] === '2')) {
                      k++;
                  }
                  if (k - j >= shortest) { 
                      wordStarts.push({ row: i, col: j, direction: 'horizontal' });
                  }
              }
              // Check vertically
              if (i === 0 || grid[i-1][j] === '0' || grid[i-1][j] === '.') {
                  let m = i;
                  while (m < height && (grid[m][j] === '0' || grid[m][j] === '1' || grid[m][j] === '2')) {
                      m++;
                  }
                  if (m - i >= shortest) { 
                      wordStarts.push({ row: i, col: j, direction: 'vertical' });
                  }
              }
          }
      }
  }

  // Check if 'tag' matches number of words
  if (tag !== words.length) {
      console.log('Error');
      return;
  }

  // Recursively solves the puzzle
  function solve(index) {

    // Exit function if all words have been placed
      if (index === words.length) {
          return true; 
      }


      // try placing each word on grid
      const word = words[index];
      for (const start of wordStarts) {
          if (canPlace(word, start)) {
              place(word, start);
              
              if (solve(index + 1)) {
                  return true;
              }
              remove(word, start);
          }
      }

      return false;
  }

  // Check if a word can be placed at the given start position
  function canPlace(word, start) {
      let { row, col, direction } = start;
      for (let i = 0; i < word.length; i++) {
          if (row >= height || col >= width) return false;
          if (grid[row][col] !== '0' && grid[row][col] !== '1' && grid[row][col] !== '2' && grid[row][col] !== word[i]) {
              return false;
          }

          // Proceed to next cell depending on direction
          if (direction === 'horizontal') {
            col++
          } else {
            row++
          }

      }
      return true;
  }

  // Place the word at the start position
  function place(word, start) {
      let { row, col, direction } = start;
      for (let i = 0; i < word.length; i++) {
          grid[row][col] = word[i];
          direction === 'horizontal' ? col++ : row++;
      }
  }

  // Remove the word from the puzzle (used for backtracking)
  function remove(word, start) {
  
      let { row, col, direction } = start;
      for (let i = 0; i < word.length; i++) {
          grid[row][col] = '0';

            // Proceed to next cell depending on direction
            if (direction === 'horizontal') {
              col++
            } else {
              row++
            }
      }
  }

  // Attempt to solve the puzzle and output result
  if (solve(0)) {
      console.log(grid.map(row => row.join('')).join('\n'));
  } else {
      console.log('Error');
  }
};
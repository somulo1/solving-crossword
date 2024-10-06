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
}

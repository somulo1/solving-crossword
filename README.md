# Crossword Solver

This project implements a function, crosswordSolver, which solves an empty crossword puzzle by filling it with provided words. The function takes two arguments:

    A string representing an empty puzzle.
    A list of words to fill in the puzzle (no duplicate words allowed).

## Puzzle Format

    The puzzle string contains:
        Numbers that represent the number of characters in the word starting at that position (either horizontally or vertically).
        . which represents a space that does not need to be filled.
        \n to indicate the end of a row in the puzzle grid.

If the provided puzzle and words do not guarantee a unique solution or do not meet the conditions specified, the function will print "Error".
Example

## javascript

```bash
const emptyPuzzle = `2001
0..0
1000
0..0`;

const words = ['casa', 'alan', 'ciao', 'anta'];

crosswordSolver(emptyPuzzle, words);

Output:

css

casa
i..l
anta
o..n
 ```
## Project Setup

### Clone the repository:

```bash

git clone https://learn.zone01kisumu.ke/git/johnodhiambo0/crossword.git 
```

### Navigate to the project directory:

``` bash

cd crossword
```
Usage

### Run the crosswordSolver.js file:

```bash

node crosswordSolver.js
```
Make sure your puzzle string and words array follow the specified format to avoid errors.
Function Behavior

The crosswordSolver function reads the input puzzle and words list.
    It fills the puzzle with the given words based on the numbers in the puzzle.
    If there is any issue with filling the words (e.g., multiple solutions or incompatible words), the function will print Error.

## Authers

this project was done by SAMUEL OKOTH OMULO and JOHN ODHIAMBO
## Contribution

Feel free to fork this repository, create a feature branch, and open a pull request if you'd like to contribute.


import { expect, test } from 'vitest';
import { crosswordSolver } from './crosswordSolver.js';
import { parsePuzzle } from './crosswordSolver.js';

test('checks if puzzleString is empty and return empty string', () => {
  const puzzleString = '';
  const expectedOutput = '';
  const result = parsePuzzle(puzzleString);
  expect(result).toEqual(expectedOutput);
});

test('converts puzzleString into 2D array', () => {
  const puzzleString = 'AB\nCD';
  const expectedOutput = [
    ['A', 'B'],
    ['C', 'D'],
  ];
  const result = parsePuzzle(puzzleString);
  expect(result).toEqual(expectedOutput);
});

/*
test('returns 3 empty arrays if puzzleString is \n\n\n', () => {
  const puzzleString = '\n\n\n';
  const expectedOutput = [[], [], []];
  const result = parsePuzzle(puzzleString);
  expect(result).toEqual(expectedOutput);
});
*/

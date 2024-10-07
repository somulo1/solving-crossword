import { expect, test } from 'vitest';

import {
  crosswordSolver,
  identifyWordSlots,
  findHorizontalSlot,
  findVerticalSlot,
  isValidPuzzle,
  isValidWordList,
  parsePuzzle,
  canPlaceWord,
  placeWord,
  removeWordFromGrid,
} from './crosswordSolver.js';

test('should return "Error" when given an empty puzzle string', () => {
  const puzzle = '';
  const words = ['cat', 'dog', 'bat'];
  const result = crosswordSolver(puzzle, words);
  expect(result).toBe('Error');
});

test('should identify horizontal word slots when grid contains valid horizontal slots', () => {
  const grid = [
    ['1', '1', '.', '2', '2'],
    ['.', '.', '.', '.', '.'],
    ['1', '1', '1', '.', '.'],
  ];
  const expectedSlots = [
    { row: 0, col: 0, length: 2, isHorizontal: true },
    { row: 0, col: 3, length: 2, isHorizontal: true },
    { row: 2, col: 0, length: 3, isHorizontal: true },
  ];
  const result = identifyWordSlots(grid);
  expect(result).toEqual(expectedSlots);
});

test('should return correct slot object when a valid horizontal word is present', () => {
  const grid = [
    ['A', 'B', 'C', '.'],
    ['.', '.', '.', '.'],
    ['D', 'E', 'F', 'G'],
  ];
  const result = findHorizontalSlot(grid, 0, 0);
  expect(result).toEqual({ row: 0, col: 0, length: 3, isHorizontal: true });
});

test('should return slot details when vertical slot length is greater than one', () => {
  const grid = [
    ['A', 'B', 'C'],
    ['D', 'E', 'F'],
    ['G', 'H', 'I'],
  ];
  const result = findVerticalSlot(grid, 0, 1);
  expect(result).toEqual({ row: 0, col: 1, length: 3, isHorizontal: false });
});

test('should return true for a valid puzzle string with uniform line lengths and allowed characters', () => {
  const puzzle = '012\n.12\n012';
  const result = isValidPuzzle(puzzle);
  expect(result).toBe(true);
});

test('should return true for a list of unique alphabetic words', () => {
  const words = ['apple', 'banana', 'cherry'];
  const result = isValidWordList(words);
  expect(result).toBe(true);
});

test('should return a 2D array when given a well-formatted puzzle string', () => {
  const puzzle = 'abc\ndef\nghi';
  const expectedOutput = [
    ['a', 'b', 'c'],
    ['d', 'e', 'f'],
    ['g', 'h', 'i'],
  ];
  const result = parsePuzzle(puzzle);
  expect(result).toEqual(expectedOutput);
});

test('should return true when the word ftests horizontally in an empty slot', () => {
  const grid = [
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['.', '.', '.'],
  ];
  const slot = { row: 1, col: 0, isHorizontal: true };
  const word = 'cat';
  const result = canPlaceWord(grid, slot, word);
  expect(result).toBe(true);
});

test('should place a word horizontally in the grid when given a horizontal slot', () => {
  const grid = [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-'],
  ];
  const slot = { row: 1, col: 0, isHorizontal: true };
  const word = 'cat';
  placeWord(grid, slot, word);
  expect(grid[1]).toEqual(['c', 'a', 't']);
});

test('should remove a word from a horizontal slot in the grid', () => {
  const grid = [
    ['.', '.', '.', '.'],
    ['.', 'H', 'E', 'L'],
    ['.', '.', '.', '.'],
  ];
  const slot = { row: 1, col: 1, length: 3, isHorizontal: true };
  removeWordFromGrid(grid, slot);
  expect(grid).toEqual([
    ['.', '.', '.', '.'],
    ['.', '3', '0', '0'],
    ['.', '.', '.', '.'],
  ]);
});

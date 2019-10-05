const fs = require('fs');

let matrix, pattern;

fs.readFile('./text.txt', (err, data) => {
  if (err) console.log(err);

  matrix = data
    .toString()
    .trim()
    .split('\n')
    .map(line => line.split(''));

  fs.readFile('./pattern.txt', (err, data) => {
    if (err) console.log(err);
    pattern = data.toString().trim();

    function buildPatternTable(str) {
      const patternTable = [0];
      let j = 0, i = 1;
      while (i < str.length) {
        if (str[j] === str[i]) {
          patternTable[i] = j + 1;
          j++;
          i++;
        } else if (j === 0) {
          patternTable[i] = j;
          i++;
        } else {
          j = patternTable[j - 1];
        }
      }
      return patternTable;
    }

    function scanVertically(word, matrix, column, patternTable) {
      let textIndex = 0;
      let wordIndex = 0;

      while (textIndex < matrix.length) {
        if (matrix[textIndex][column] === word[wordIndex]) {
          if (wordIndex === word.length - 1) {
            return true;
          }
          wordIndex += 1;
          textIndex += 1;
        } else if (wordIndex > 0) {
          wordIndex = patternTable[wordIndex - 1];
        } else {
          wordIndex = 0;
          textIndex += 1;
        }
      }
    }

    function scanHorizontally(word, matrix, row, patternTable) {
      let textIndex = 0;
      let wordIndex = 0;

      while (textIndex < matrix[row].length) {
        if (matrix[row][textIndex] === word[wordIndex]) {
          if (wordIndex === word.length - 1) {
            return true;
          }
          wordIndex += 1;
          textIndex += 1;
        } else if (wordIndex > 0) {
          wordIndex = patternTable[wordIndex - 1];
        } else {
          wordIndex = 0;
          textIndex += 1;
        }
      }
    }

    function wordSearch(matrix, word) {
      const patternTable = buildPatternTable(word);
      for (let i = 0; i < matrix.length; i++) {
        if (scanHorizontally(word, matrix, i, patternTable)) return true;
      }

      for (let i = 0; i < matrix[0].length; i++) {
        if (scanVertically(word, matrix, i, patternTable)) return true;
      }
      return false;
    }

    console.log(wordSearch(matrix, pattern));
  });
});




function getWinningPatternsInColumns(squaresGrid) {
    const lines = [];

    for (let i = 0; i < squaresGrid; i++) {

      const line = [];

      for (let j = 0; j < squaresGrid; j++) {

        const squareId = i+squaresGrid*j;
        line.push(squareId);
      }

      lines.push(line);
    } 

    return lines;
  }

function getWinningPatternsInRows(squaresGrid) {
const lines = [];

for (let i = 0; i < squaresGrid; i++) {

    const line = [];

    for (let j = 0; j < squaresGrid; j++) {

    const squareId = i*squaresGrid+j;
    line.push(squareId);
    }

    lines.push(line);
} 

return lines;
}

function getWinningPatternsInDiagonals(squaresGrid) {
const forwardDiagonal = [];
const backwardDiagonal = [];

for (let i = 0; i < squaresGrid; i++) {
    forwardDiagonal.push(i*squaresGrid+i);
}

for (let i = 1; i <= squaresGrid; i++) {
    backwardDiagonal.push(i*squaresGrid-i);
}

return [forwardDiagonal, backwardDiagonal];
}


export function calculateWinner(squaresGrid, squares) {

const winningInRows = getWinningPatternsInRows(squaresGrid);
const winningInColumns = getWinningPatternsInColumns(squaresGrid);
const winningInDiagonals = getWinningPatternsInDiagonals(squaresGrid);

const lines = [].concat(winningInRows, winningInColumns, winningInDiagonals);

for (let i = 0; i < lines.length; i++) {

    const lineToCheck = [];

    for (const num of lines[i]) {
    lineToCheck.push(squares[num]);
    }

    const allArrayIsEqual = lineToCheck.every((elem, i, arr) => elem === arr[0]);

    if (allArrayIsEqual && lineToCheck[0] !== null) {

      return {
        winnerTeam: lineToCheck[0],
        winnerSquares: lines[i],
      };
    }
}

if (!squares.includes(null)) {
    return {
      winnerTeam: 'TIE',
      winnerSquares: null,
    };
}

return {
  winnerTeam: null,
  winnerSquares: null,
};;

}

  
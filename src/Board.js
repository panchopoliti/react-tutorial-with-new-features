import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

function Square(props) {

  

    return (
        <button className={`square ${(props.winner) ? 'highlight': ''}`} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends Component {

  renderSquare(i) {
    const { squares, onClick, winnerSquares } = this.props;

    return (
      <Square 
          key={i}
          value={squares[i]}
          winner={winnerSquares && winnerSquares.includes(i)}
          onClick={() => onClick(i)}
      />
    );
  }

  render() {

    const { gridNumber } = this.props;
    let squares = [];

    for (let step = 0; step < gridNumber; step++) {

      let row = [];

      for (let i = 0; i < gridNumber; i++) {
        
        const rowValues = gridNumber*step;

        row.push(this.renderSquare(i+rowValues));

      }
    
    squares.push(<div key={step} className="board-row">{row}</div>)

    }
  
    return (
    <div>{ squares }</div>
    );
  }
}

Board.propTypes = {
    gridNumber: PropTypes.number,
    onClick: PropTypes.func,
    squares: PropTypes.array,
    winnerSquares: PropTypes.array,
};

export default Board;
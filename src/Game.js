import React, { Component } from 'react';
import Board from './Board.js';
import PropTypes from 'prop-types';
import { calculateWinner } from './logicGameFunctions.js';
import './index.css';

  
  class Game extends Component {
    constructor(props) {
        super(props);

        const { gridNumber } = this.props;

        this.state = {
            isAscending: true,
            history: [{
                squares: Array(gridNumber*gridNumber).fill(null),
                latestMovedSquare: null,
            }],
            stepNumber: 0,
            xisNext: true,
        };
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xisNext: (step % 2) === 0,
        });
    };

    handleClick(i) {
        const { xisNext } = this.state;
        const { gridNumber } = this.props;

        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        const winnerObj = calculateWinner(gridNumber, squares)

        if (winnerObj.winnerTeam || squares[i]) {
            return;
        }

        squares[i] = xisNext ? 'X' : 'O';
        this.setState({ 
            history: history.concat([{ 
              squares,
              latestMovedSquare: i,
             }]),
            stepNumber: history.length,
            xisNext: !xisNext,
         });
    };

    handleMovesToggle = () => this.setState({ isAscending: !this.state.isAscending });

    restartGame = () => {

        const { gridNumber } = this.props;

      this.setState({
        history: [{
          squares: Array(gridNumber*gridNumber).fill(null),
          latestMovedSquare: null,
        }],
        stepNumber: 0,
        xisNext: true,
       });
    };

    componentDidUpdate(prevProps) {

        if (prevProps.gridNumber !== this.props.gridNumber) {

            this.restartGame();
        }

        const gameInProcess = Boolean(this.state.stepNumber);

        if (gameInProcess !== this.props.gameHasStarted) {

            this.props.setStartOfGame();
        }
    }

    render() {
        const { xisNext, history, stepNumber, isAscending } = this.state;
        const { gridNumber } = this.props;
        
        const current = history[stepNumber];
        const winnerObj = calculateWinner(gridNumber, current.squares);

        const moves = history.map((step, move) => {
            const latestMovedSquare = step.latestMovedSquare;
            const col = 1 + latestMovedSquare % gridNumber;
            const row = 1 + Math.floor(latestMovedSquare / gridNumber);

            const desc = move ?
            `Go to Move # ${move} (${col};${row})` :
            'Go to game start';
            
            return (
            <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{ desc }</button>
            </li>
            );
        });

        if (!isAscending) {
            moves.reverse();
        }

        let status;
        const {winnerTeam, winnerSquares} = winnerObj;
  
        if (winnerTeam && winnerTeam !== 'TIE') {
            status = `Winner is: ${winnerTeam}`;
        } else if (winnerTeam === 'TIE') {
          status = 'Match finished in Tie';
        }
         else {
            status = `Next player: ${xisNext ? 'X' : 'O'}`;
        }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
                gridNumber={gridNumber}
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
                winnerSquares={(winnerSquares) ? winnerSquares : []}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            <div>
                <button onClick={this.handleMovesToggle}>{(isAscending) ? 'Order moves in Descending Way' : 'Order moves in Ascending way'}</button>
            </div>
          </div>
        </div>
      );
    }
  }
  
  Game.propTypes = {
    gridNumber: PropTypes.number,
    gameHasStarted: PropTypes.bool,
    setStartOfGame: PropTypes.func, 
  };
  
  export default Game;
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// assign squares as buttons with properties, class and value
function Square(props){
    return (
        <button 
            className="square" 
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}
  
// class which sets the gameboard and handles logic
class Board extends React.Component {
    // constructor that holds array of gamearea
    constructor(props){
        // initializes props so they can be used
        super(props);
        this.state = {
            // make an array and anull it
            squares : Array(9).fill(null),
            // var to check which player goes next
            xIsNext : true
        };
    }

    // object that handles onClick for i-th square
    handleClick(i){
        // make copy of an array so we can manipulate it easier
        const squares = this.state.squares.slice();
        // stop changing square value if the game is over or it holds value already
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        // checks which value to input into the array
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        // update the state of the square
        this.setState({
            squares: squares,
            // alternate the player's input value
            xIsNext: !this.state.xIsNext
        });
    }

    // object that renders i-th square and appends value and onClick event listener to it
    renderSquare(i) {
        return (
            <Square 
                value={this.state.squares[i]} 
                onClick={() => this.handleClick(i)}
            />
        );
    }
  
    // object that renders gamearea
    render() {        
        // check if any player won the game
        const winner = calculateWinner(this.state.squares);
        // if winner is true, write the txt out, otherwise show who plays next
        let status;
        if(winner){
            status = 'Winner: ' + winner;
        }else{
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        
        // render the actual gamearea 3x3
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
            </div>
        );
    }
}

// class that renders divs into html
class Game extends React.Component {
    render() {
        return (
            <div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
            </div>
            </div>
        );
    }
}

// function that calculates if there is a winner
function calculateWinner(squares){
    // winning combinations
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    // compare passed array with any of the winning combinations
    for(let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}
  
  // ========================================

// function ran first
ReactDOM.render(
    // renders Game class inside element with id root 
    <Game />,
    document.getElementById('root')
);  
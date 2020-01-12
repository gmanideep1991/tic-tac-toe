import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  createSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="board">
        <div className="board-row">
          {this.createSquare(0)}
          {this.createSquare(1)}
          {this.createSquare(2)}
        </div>
        <div className="board-row">
          {this.createSquare(3)}
          {this.createSquare(4)}
          {this.createSquare(5)}
        </div>
        <div className="board-row">
          {this.createSquare(6)}
          {this.createSquare(7)}
          {this.createSquare(8)}
        </div>
      </div>
    );
  }
}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moves: [{ squares: Array(9).fill(null) }],
      isUserX: true,
      stepNumber: 0
    };
  }

  handleClick(i) {
    ///let moves = this.state.moves;
    //const history = this.state.history.slice(0, this.state.stepNumber + 1);
    let moves = this.state.moves.slice(0, this.state.stepNumber + 1);
    const current = moves[moves.length - 1];
    let squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.isUserX ? "X" : "O";
    this.setState({
      moves: moves.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: moves.length,
      isUserX: !this.state.isUserX
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      isUserX: step % 2 === 0
    });
  }

  render() {
    let moves = this.state.moves;
    const current = moves[this.state.stepNumber];
    let winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = "Winner is " + winner;
    } else {
      status = "Next Player is: " + (this.state.isUserX ? "X" : "O");
    }

    const history = moves.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    return (
      <div>
        <div>{status}</div>
        <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        <div class="moves">{history}</div>
      </div>
    );
  }
}

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
ReactDOM.render(<Game />, document.getElementById("root"));

import createShip from "./Ship.js";

export default function createGameboard() {
  let board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));

  let missedAttackRecord = [];
  let shipsOnBoard = [];

  const reset = () => {
    board = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));

    missedAttackRecord = [];

    shipsOnBoard = [];
  };

  const placeShip = ({ ship, xAxis, yAxis, isVertical = false }) => {
    // out of bounds
    if (xAxis < 0 || xAxis > 9 || yAxis < 0 || yAxis > 9) return false; // x or y is less or greater than
    if (isVertical && yAxis + ship.length > 10) return false; // vertical placement should not exceed 10 length
    if (!isVertical && xAxis + ship.length > 10) return false; // horizontal placement shoul not exceed 10 length

    // overlap
    for (let i = 0; i < ship.length; i++) {
      const checkY = isVertical ? yAxis + i : yAxis; // if true, move in vertical if not lock y
      const checkX = isVertical ? xAxis : xAxis + i; // if true, move in horizontal if not lock x

      if (board[checkY][checkX] !== null) return false;
    }

    const newShip = createShip({ name: ship.name, length: ship.length });

    shipsOnBoard = [...shipsOnBoard, newShip];

    board = board.map((row, y) => {
      return row.map((cell, x) => {
        // vertical: lock x, and y must greater than or equal yAxis, and y should less than yAxis plus  ship.length

        // horizontal: lock y, and x must greather than or equal of xAxis, and x should less than xAxis + ship.length
        const shipPath = isVertical
          ? // lock x, put ship in static x on dynamic y
            x === xAxis && y >= yAxis && y < yAxis + ship.length
          : // lock y, put ship in dynamic x on static y
            y === yAxis && x >= xAxis && x < xAxis + ship.length;

        return shipPath ? newShip : cell;
      });
    });

    return true;
  };

  const receiveAttack = (xAxis, yAxis) => {
    if (xAxis < 0 || xAxis > 9 || yAxis < 0 || yAxis > 9) return;

    let attackResult = false;

    board = board.map((row, y) => {
      return row.map((cell, x) => {
        if (xAxis === x && yAxis === y) {
          if (cell === "miss" || cell === "hit") {
            return cell;
          } else if (cell !== null) {
            cell.hit();
            attackResult = true;
            return "hit"; // return cell if true
          } else {
            attackResult = true;
            return "miss"; // return cell if false
          }
        } else {
          return cell; // everthing that happens
        }
      });
    });

    return attackResult;
  };

  const allShipsSunk = () => shipsOnBoard.every((ship) => ship.isSunk());

  return {
    getBoard: () => board,
    getMissedAttacks: () => missedAttackRecord,
    getShipsOnBoard: () => shipsOnBoard,
    reset,
    placeShip,
    receiveAttack,
    allShipsSunk,
  };
}

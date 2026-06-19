import createShip from "./Ship.js";

export default function createGameboard() {
  let board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));

  let missedAttackRecord = [];
  let shipsOnBoard = [];

  const placeShip = ({ shipLength, xAxis, yAxis, isVertical = false }) => {
    // out of bounds
    if (xAxis < 0 || xAxis > 9 || yAxis < 0 || yAxis > 9) return false; // x or y is less or greater than
    if (isVertical && yAxis + shipLength > 10) return false; // vertical placement should not exceed 10 length
    if (!isVertical && xAxis + shipLength > 10) return false; // horizontal placement shoul not exceed 10 length

    // overlap
    for (let i = 0; i < shipLength; i++) {
      const checkY = isVertical ? yAxis + i : yAxis; // if true, move in vertical if not lock y
      const checkX = isVertical ? xAxis : xAxis + i; // if true, move in horizontal if not lock x

      if (board[checkY][checkX] !== null) return false;
    }

    const newShip = createShip(shipLength);

    shipsOnBoard = [...shipsOnBoard, newShip];

    board = board.map((row, y) => {
      return row.map((cell, x) => {
        // vertical: lock x, and y must greater than or equal yAxis, and y should less than yAxis plus  shipLength

        // horizontal: lock y, and x must greather than or equal of xAxis, and x should less than xAxis + shiplength
        const shipPath = isVertical
          ? // lock x, put ship in static x on dynamic y
            x === xAxis && y >= yAxis && y < yAxis + shipLength
          : // lock y, put ship in dynamic x on static y
            y === yAxis && x >= xAxis && x < xAxis + shipLength;

        return shipPath ? newShip : cell;
      });
    });

    return true;
  };

  const receiveAttack = (xAxis, yAxis) => {
    if (xAxis < 0 || xAxis > 9 || yAxis < 0 || yAxis > 9) return;

    let attackResult;

    board = board.map((row, y) => {
      return row.map((cell, x) => {
        if (xAxis === x && yAxis === y) {
          if (cell !== null && cell !== "miss") {
            cell.hit();
            attackResult = { isHit: true, coordinate: [xAxis, yAxis] };

            return cell; // return cell if true
          } else if (cell === "miss") {
            return cell;
          } else {
            cell = "miss";
            missedAttackRecord = [...missedAttackRecord, [xAxis, yAxis]];
            attackResult = { isHit: false, coordinate: [xAxis, yAxis] };

            return cell; // return cell if false
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
    placeShip,
    receiveAttack,
    allShipsSunk,
  };
}

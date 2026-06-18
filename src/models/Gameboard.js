import createShip from "./Ship.js";

export default function createGameboard() {
  let board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));

  let missedAttackRecord = [];
  let shipsOnBoard = [];

  const placeShip = ({ shipLength, xAxis, yAxis, isVertical = false }) => {
    // out of bounds
    if (xAxis < 0 || xAxis > 9 || yAxis < 0 || yAxis > 9) {
      return false;
    }

    // overlap

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

  return {
    getBoard: () => board,
    getMissedAttacks: () => missedAttackRecord,
    placeShip,
  };
}

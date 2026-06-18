import createShip from "./Ship.js";

export default function createGameboard() {
  let board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));

  let missedAttackRecord = [];
  let shipsOnBoard = [];

  const placeShip = ({ shipLength, xAxis, yAxis, isVertical = false }) => {
    const newShip = createShip(shipLength);

    shipsOnBoard = [...shipsOnBoard, newShip];


    const updatedBoard = board.map((row, y) => {
      return row.map((cell, x) => {
        const shipPath = isVertical ? x === xAxis:;
        })
      });

    board = updatedBoard;

  };

  return {
    getBoard: () => board,
    getMissedAttacks: () => missedAttackRecord,
  };
}

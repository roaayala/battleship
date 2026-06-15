import createShip from "./Ship";

export default function createGameboard() {
  const boardData = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));

  const missedAttackRecord = [];

  const placeShip = (length, x, y, isVertical = false) => {
    const newShip = createShip(length);

    if (isVertical) {
      // vertical placement
      for (let i = 0; i < length; i++) {
        boardData[y + i][x] = newShip;
      }
    } else {
      // horizontal placement
      for (let i = 0; i < length; i++) {
        boardData[y][x + i] = newShip;
      }
    }
  };

  const receiveAttack = (x, y) => {
    const tile = boardData[y][x];

    if (tile === null) {
      missedAttackRecord.push([x, y]);
      boardData[y][x] = "miss";
      return false;
    } else if (tile === "miss") {
      return false;
    } else {
      tile.hit();
      return true;
    }
  };

  return {
    getBoard: () => boardData,
    placeShip,
    receiveAttack,
    getMissedAttacks: () => missedAttackRecord,
  };
}

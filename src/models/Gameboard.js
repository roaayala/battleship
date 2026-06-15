import createShip from "./Ship";

export default function createGameboard() {
  const boardData = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));

  let missedAttack = 0;

  const missedAttackRecord = () => missedAttack;

  const placeShip = (length, startX, startY, isVertical = false) => {
    const newShip = createShip(length);

    if (isVertical) {
      // vertical placement
      for (let i = 0; i < length; i++) {
        boardData[startY + i][startX] = newShip;
      }
    } else {
      // horizontal placement
      for (let i = 0; i < length; i++) {
        boardData[startY][startX + i] = newShip;
      }
    }
  };

  const receiveAttack = (x, y) => {};

  return { getBoard: () => boardData, placeShip };
}

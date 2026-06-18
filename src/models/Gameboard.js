import createShip from "./Ship.js";

export default function createGameboard() {
  const board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));

  const placeShip = (shipLength) => {
    const newShip = createShip(shipLength);
  };

  return {
    getBoard: () => board,
  };
}

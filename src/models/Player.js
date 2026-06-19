import createGameboard from "./Gameboard";

export default function createPlayer({ name, isHuman = true }) {
  const board = createGameboard();

  // for non human player
  let availableMoves = [];

  if (!isHuman) {
  }

  return { name, isHuman, getGameboard: () => board };
}

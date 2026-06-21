import createGameboard from "./Gameboard";

export default function createPlayer({ name, isHuman = true }) {
  const board = createGameboard();

  // for non human player
  const availableMoves = [];

  if (!isHuman) {
    for (let y = 0; y < board.getBoard().length; y++) {
      for (let x = 0; x < board.getBoard()[y].length; x++) {
        availableMoves.push([x, y]);
      }
    }
  }

  const randomizeAttack = (enemyGameboard) => {
    const rIndex = Math.floor(Math.random() * availableMoves.length);

    const [x, y] = availableMoves.splice(rIndex, 1)[0];

    enemyGameboard.receiveAttack(x, y);
  };

  // for human player
  const attack = (enemyGameboard, x, y) => {
    enemyGameboard.receiveAttack(x, y);
  };

  return {
    name,
    isHuman,
    getGameboard: () => board,
    randomizeAttack,
    attack,
  };
}

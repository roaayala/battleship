import createGameboard from "./Gameboard";

export default function createPlayer({ name, isComputer = false }) {
  const playerGameboard = createGameboard();

  const availableMoves = [];

  if (isComputer) {
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        availableMoves.push([x, y]);
      }
    }
  }

  const randomAttack = (enemyGameboard) => {
    if (!isComputer) return;

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const [x, y] = availableMoves.splice(randomIndex, 1)[0];
    enemyGameboard.receiveAttack(x, y);

    return [x, y];
  };

  return {
    playerGameboard,
    name,
    isComputer,
    randomAttack,
  };
}

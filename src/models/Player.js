import createGameboard from "./Gameboard";

export default function createPlayer({ name, isHuman = true }) {
  const board = createGameboard();

  // for non human player
  const availableMoves = [];
  const recommendedMoves = [];

  if (!isHuman) {
    for (let y = 0; y < board.getBoard().length; y++) {
      for (let x = 0; x < board.getBoard()[y].length; x++) {
        availableMoves.push([x, y]);
      }
    }
  }

  const randomizeAttack = (enemyGameboard) => {
    const getValidCoordinate = (cx, cy) => {
      const potentialMoves = [];

      if (cx > 0) potentialMoves.push([cx - 1, cy]);
      if (cx < 9) potentialMoves.push([cx + 1, cy]);
      if (cy > 0) potentialMoves.push([cx, cy - 1]);
      if (cy < 9) potentialMoves.push([cx, cy + 1]);

      // only return not attacked coordinate
      return potentialMoves.filter(([px, py]) => {
        return availableMoves.some(([ax, ay]) => {
          if (ax === px && ay === py) {
            return true;
          }
          return false;
        });
      });
    };

    let currentX, currentY;

    if (recommendedMoves.length > 0) {
      // hunt
      const rIndex = Math.floor(Math.random() * recommendedMoves.length);

      const [hx, hy] = recommendedMoves.splice(rIndex, 1)[0];
      currentX = hx;
      currentY = hy;

      // remove coordinate from availableMoves when coordinate from recommendedMoves used
      const compIndex = availableMoves.findIndex(
        ([ciX, ciY]) => ciX === currentX && ciY === currentY,
      );

      if (compIndex !== -1) availableMoves.splice(compIndex, 1);
    } else {
      // target
      const rIndex = Math.floor(Math.random() * availableMoves.length);

      const [x, y] = availableMoves.splice(rIndex, 1)[0];
      currentX = x;
      currentY = y;
    }

    const attackResult = enemyGameboard.receiveAttack(currentX, currentY);

    if (attackResult.isHit) {
      const generateRecommendations = getValidCoordinate(currentX, currentY);

      generateRecommendations.forEach((newRec) => {
        const isAlreadyRecommended = recommendedMoves.some(
          (rx, ry) => rx === newRec[0] && ry === newRec[1],
        );

        if (!isAlreadyRecommended) {
          recommendedMoves.push(newRec);
        }
      });
    }

    return attackResult;
  };

  // for human player
  const attack = (enemyGameboard, x, y) => {
    return enemyGameboard.receiveAttack(x, y);
  };

  return {
    name,
    isHuman,
    getGameboard: () => board,
    randomizeAttack,
    attack,
  };
}

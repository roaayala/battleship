import createGameboardUI from "../components/GameboardUI";

export default function createBattleScreen({
  playerBoard,
  enemyBoard,
  attackFn,
}) {
  const battleScreen = document.createElement("div");
  battleScreen.className = "battle-screen";

  const leftScreen = document.createElement("div");
  leftScreen.className = "battle-screen-left";

  console.log(playerBoard);
  console.log(enemyBoard);

  const leftBoardUI = createGameboardUI({
    playerBoard: playerBoard,
    isRadar: false,
  });

  leftScreen.append(leftBoardUI);

  const rightScreen = document.createElement("div");
  rightScreen.className = "battle-screen-right";

  const rightBoardUI = createGameboardUI({
    playerBoard: enemyBoard,
    isRadar: true,
    onTileSelect: (x, y) => {
      attackFn(x, y);
    },
  });

  rightScreen.append(rightBoardUI);

  battleScreen.append(leftScreen, rightScreen);

  return battleScreen;
}

import createButton from "../components/Button";
import createScreenTitle from "../components/ScreenTitle";

export default function createShipPlacementScreen(
  player,
  readyFn,
  randomizeFn,
  backFn,
) {
  const shipPlacementScreen = document.createElement("div");
  shipPlacementScreen.className = "ship-placement-screen";

  const shipPlacementScreenTitle = createScreenTitle({
    text: `Arrange your ship ${player.name}!`,
    style: "ship-placement-screen__title",
  });

  const playerBoard = player.getGameboard().getBoard();

  const playerGameboard = document.createElement("main");
  playerGameboard.className = "player-gameboard";

  playerBoard.forEach((row, y) => {
    row.forEach((cell, x) => {
      const tile = document.createElement("div");
      tile.className = "player-gameboard__tile";
      tile.dataset.x = x;
      tile.dataset.y = y;

      if (cell !== null) {
        tile.classList.add("ship-tile");
      }

      playerGameboard.append(tile);
    });
  });

  playerGameboard.addEventListener("click", (e) => {});

  const shipPlacementScreenFooter = document.createElement("footer");
  shipPlacementScreenFooter.className = "ship-placement-screen__footer";

  const readyButton = createButton({
    text: "Ready to Fight",
    fn: () => {
      readyFn(player);
    },
  });

  const randomizeButton = createButton({
    text: "Randomize",
    fn: () => {
      randomizeFn();
    },
  });

  const backButton = createButton({
    text: "Back to Player Setup",
    fn: () => {
      backFn();
    },
  });

  shipPlacementScreenFooter.append(backButton, randomizeButton, readyButton);

  shipPlacementScreen.append(
    shipPlacementScreenTitle,
    playerGameboard,
    shipPlacementScreenFooter,
  );

  return shipPlacementScreen;
}

import createButton from "../components/Button";
import createGameboardUI from "../components/GameboardUI";
import createScreenTitle from "../components/ScreenTitle";
import createShipGarage from "../components/ShipGarage";

export default function createShipPlacementScreen(
  player,
  { readyFn, randomizeFn, placeShipFn, resetFn, backFn },
) {
  const shipPlacementScreen = document.createElement("div");
  shipPlacementScreen.className = "ship-placement-screen";

  const shipPlacementScreenTitle = createScreenTitle({
    text: `Arrange your ship ${player.name}!`,
    style: "ship-placement-screen__title",
  });

  let selectedShip = null;
  const placedShips = player.getGameboard().getShipsOnBoard();
  const placedShipNames = placedShips.map((ship) => ship.name);
  let isVertical = false;

  const shipGarage = createShipGarage({
    placedShipNames,
    onSelectShip: (ship) => {
      selectedShip = ship;
    },
    onAxisToggle: (verticalState) => {
      isVertical = verticalState;
    },
  });

  const playerBoard = player.getGameboard().getBoard();

  const playerGameboard = createGameboardUI({
    playerBoard,
    onTileSelect: (x, y) => {
      if (selectedShip === null) {
        return;
      }

      placeShipFn(selectedShip, x, y, isVertical);
    },
  });

  const shipPlacementScreenFooter = document.createElement("footer");
  shipPlacementScreenFooter.className = "ship-placement-screen__footer";

  const readyButton = createButton({
    text: "Ready to Fight",
    fn: () => {
      readyFn(player);
    },
  });

  if (placedShips.length < 5) {
    readyButton.disabled = true;
  }

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

  const resetButton = createButton({
    text: "Reset Board",
    fn: () => {
      resetFn();
    },
  });

  shipPlacementScreenFooter.append(
    backButton,
    randomizeButton,
    resetButton,
    readyButton,
  );

  shipPlacementScreen.append(
    shipPlacementScreenTitle,
    shipGarage,
    playerGameboard,
    shipPlacementScreenFooter,
  );

  return shipPlacementScreen;
}

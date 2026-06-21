import createButton from "../components/Button";
import createScreenTitle from "../components/ScreenTitle";
import createShipGarage from "../components/ShipGarage";

export default function createShipPlacementScreen(
  player,
  { readyFn, randomizeFn, placeShipFn, backFn },
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

  const updateGameboard = (e) => {
    if (!e.target.classList.contains("player-gameboard__tile")) {
      return;
    }

    if (selectedShip === null) {
      return;
    }

    const x = Number(e.target.dataset.x);
    const y = Number(e.target.dataset.y);

    placeShipFn(selectedShip, x, y, isVertical);
  };

  playerGameboard.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  playerGameboard.addEventListener("dragenter", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("player-gameboard__tile")) {
      e.target.classList.add("hover-preview");
    }
  });

  playerGameboard.addEventListener("dragleave", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("player-gameboard__tile")) {
      e.target.classList.remove("hover-preview");
    }
  });

  playerGameboard.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("player-gameboard__tile")) {
      e.target.classList.remove("hover-preview");
    }

    updateGameboard(e);
  });

  playerGameboard.addEventListener("click", (e) => {
    updateGameboard(e);
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

  shipPlacementScreenFooter.append(backButton, randomizeButton, readyButton);

  shipPlacementScreen.append(
    shipPlacementScreenTitle,
    shipGarage,
    playerGameboard,
    shipPlacementScreenFooter,
  );

  return shipPlacementScreen;
}

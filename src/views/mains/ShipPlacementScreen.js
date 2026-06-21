import createButton from "../components/Button";
import createScreenTitle from "../components/ScreenTitle";
import { SHIP_CONFIGS } from "../../utilities/constants";

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

  const shipGarage = document.createElement("aside");
  shipGarage.className = "ship-garage";

  const garageTitle = document.createElement("h3");
  garageTitle.className = "ship-garage__title";
  garageTitle.textContent = "Available Ships";
  shipGarage.append(garageTitle);

  let currentSelectedShip = null;

  const placedShips = player.getGameboard().getShipsOnBoard();

  const placedShipNames = placedShips.map((ship) => ship.name);

  SHIP_CONFIGS.forEach((ship) => {
    if (placedShipNames.includes(ship.name)) {
      return;
    }

    const shipCard = document.createElement("div");
    shipCard.className = "ship-card";
    shipCard.textContent = `${ship.name} (Length: ${ship.length})`;

    shipCard.addEventListener("click", () => {
      currentSelectedShip = ship;

      const allShip = shipGarage.querySelectorAll(".ship-card");

      // remove active state to others button
      allShip.forEach((btn) => btn.classList.remove("active"));

      // add active state to clicked button
      shipCard.classList.add("active");
    });

    shipGarage.append(shipCard);
  });

  let isVertical = false;
  const axisToggleButton = createButton({
    text: "Axis: Horizontal",
    style: "axis-toggle-btn",
    fn: () => {
      isVertical = !isVertical;
      axisToggleButton.textContent = `Axis: ${isVertical ? "Vertical" : "Horizontal"}`;
    },
  });

  shipGarage.append(axisToggleButton);

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

  playerGameboard.addEventListener("click", (e) => {
    if (!e.target.classList.contains("player-gameboard__tile")) {
      return;
    }

    if (currentSelectedShip === null) {
      return;
    }

    const x = Number(e.target.dataset.x);
    const y = Number(e.target.dataset.y);

    placeShipFn(currentSelectedShip, x, y, isVertical);
  });

  const shipPlacementScreenFooter = document.createElement("footer");
  shipPlacementScreenFooter.className = "ship-placement-screen__footer";

  const readyButton = createButton({
    text: "Ready to Fight",
    fn: () => {
      readyFn(player);
    },
  });

  if (placedShips < 5) {
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

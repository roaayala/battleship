import createButton from "../components/Button";

export default function createShipPlacementScreen(
  player,
  shipPlacementScreenFn,
  goBackFn,
) {
  const boardData = player.playerGameboard.getBoard();

  const availableShips = [
    { name: "Carrier", length: 5 },
    { name: "Battleship", length: 4 },
    { name: "Destroyer", length: 3 },
    { name: "Submarine", length: 3 },
    { name: "Patrol Boat", length: 2 },
  ];

  const shipPlacementScreen = document.createElement("div");
  shipPlacementScreen.className = "ship-placement";

  const title = document.createElement("h2");
  title.className = "ship-placement__title";
  title.textContent = ` Arrange Yours Ship ${player.name}!`;

  const shipsList = document.createElement("ol");

  availableShips.forEach((ship) => {
    const shipsListItem = document.createElement("li");
    shipsListItem.textContent = ship.name;
    shipsList.append(shipsListItem);
  });

  const boardContainer = document.createElement("div");
  boardContainer.className = "ship-placement__container";

  boardData.forEach((row, y) => {
    row.forEach((cell, x) => {
      const tile = document.createElement("div");
      tile.className = "ship-placement__tile";
      tile.dataset.x = x;
      tile.dataset.y = y;

      boardContainer.append(tile);
    });
  });

  boardContainer.addEventListener("click", (e) => console.log(e.target));

  const playButton = createButton({
    text: "Play Game",
    fn: shipPlacementScreenFn,
  });

  const backButton = createButton({
    text: "Back To Start Screen",
    fn: goBackFn,
  });

  shipPlacementScreen.append(
    title,
    shipsList,
    boardContainer,
    playButton,
    backButton,
  );

  return shipPlacementScreen;
}

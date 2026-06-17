import createButton from "../components/Button";

export default function createShipPlacementScreen(
    player,
    shipPlacementScreenFn,
    goBackFn,
) {
    const boardData = player.playerGameboard.getBoard();

    const shipPlacementScreen = document.createElement("div");
    shipPlacementScreen.className = "ship-placement";

    const title = document.createElement("h2");
    title.className = "ship-placement__title";
    title.textContent = ` Arrange Yours Ship ${player.name}!`;

    const boardContainer = document.createElement("div");
    boardContainer.className = "ship-placement__container";

    boardData.forEach((row, y) => {
        row.forEach((cell, x) => {
            const tile = document.createElement("div");
            tile.className = "ship-placement__tile";
            tile.dataset.x = x;
            tile.dataset.y = y;
            tile.textContent = `${x},${y}`;

            boardContainer.append(tile);
        });
    });

    const playButton = createButton({
        text: "Play Game",
        fn: shipPlacementScreenFn,
    });

    const backButton = createButton({
        text: "Back To Start Screen",
        fn: goBackFn,
    });

    shipPlacementScreen.append(title, boardContainer, playButton, backButton);

    return shipPlacementScreen;
}

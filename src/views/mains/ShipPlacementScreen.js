import createButton from "../components/Button";

export default function createShipPlacementScreen(
    player,
    shipPlacementScreenFn,
) {
    const boardData = player.playerGameboard.getBoard();

    const shipPlacementScreen = document.createElement("div");
    shipPlacementScreen.className = "ship-placement";

    const title = document.createElement("h2");
    title.className = "ship-placement__title";
    title.textContent = "Arrange Yours Ship Commander!";

    const boardContainer = document.createElement("div");
    boardContainer.className = "ship-placement__container";

    boardData.forEach((row, y) => {
        row.forEach((cell, x) => {
            const tile = document.createElement("div");
            tile.className = "ship-placemenet__tile";
            tile.textContent = `${x},${y}`;

            boardContainer.append(tile);
        });
    });

    const playButton = createButton({
        text: "Play Game",
        fn: shipPlacementScreenFn,
    });

    shipPlacementScreen.append(title, boardContainer, playButton);

    return shipPlacementScreen;
}

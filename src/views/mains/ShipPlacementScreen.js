import createButton from "../components/Button";

export default function createShipPlacementScreen(
    player,
    shipPlacementScreenFn,
) {
    const boardData = player.playerGameboard.getBoard();
    console.log(boardData);

    const shipPlacementScreen = document.createElement("div");
    shipPlacementScreen.className = "ship-placement";

    const title = document.createElement("h2");
    title.className = "ship-placement__title";
    title.textContent = "Arrange Yours Ship Commander!";

    const boarContainer = document.createElement("div");

    const playButton = createButton({
        text: "Play Game",
        fn: shipPlacementScreenFn,
    });

    shipPlacementScreen.append(title, boarContainer, playButton);

    return shipPlacementScreen;
}

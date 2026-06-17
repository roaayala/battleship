import createButton from "../components/Button";

export default function createShipPlacementScreen(shipPlacementScreenFn) {
    const shipPlacementScreen = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent = "Arrange Yours Ship Commander!";

    const playButton = createButton({
        text: "Play Game",
        fn: () => {
            shipPlacementScreenFn();
        },
    });

    shipPlacementScreen.append(title, playButton);

    return shipPlacementScreen;
}

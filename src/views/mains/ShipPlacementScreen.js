import createButton from "../components/Button";

export default function createShipPlacementScreen(shipPlacementScreenFn) {
  const shipPlacementScreen = document.createElement("div");

  const playButton = createButton({
    text: "Play Game",
    fn: () => {
      shipPlacementScreenFn();
    },
  });

  shipPlacementScreen.append(playButton);

  return shipPlacementScreen;
}

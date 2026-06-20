import createScreenTitle from "../components/ScreenTitle";

export default function createShipPlacementScreen() {
  const shipPlacementScreen = document.createElement("div");
  shipPlacementScreen.className = "ship-placement-screen";

  const screenTitle = createScreenTitle({
    text: "Arrange your ship!",
    style: "ship-placement-screen__titel",
  });

  shipPlacementScreen.append(screenTitle);

  return shipPlacementScreen;
}

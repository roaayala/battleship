import createScreenTitle from "../components/ScreenTitle";

export default function createShipPlacementScreen() {
  const shipPlacementScreen = document.createElement("div");
  shipPlacementScreen.className = "ship-placement-screen";

  const screenTitle = createScreenTitle("Arrange your ship!");

  shipPlacementScreen.append(screenTitle);

  return shipPlacementScreen;
}

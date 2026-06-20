import createButton from "../components/Button";
import createScreenTitle from "../components/ScreenTitle";

export default function createShipPlacementScreen(readyFn, backFn) {
  const shipPlacementScreen = document.createElement("div");
  shipPlacementScreen.className = "ship-placement-screen";

  const shipPlacementScreenTitle = createScreenTitle({
    text: "Arrange your ship!",
    style: "ship-placement-screen__title",
  });

  const shipPlacementScreenFooter = document.createElement("footer");
  shipPlacementScreenFooter.className = "ship-placement-screen__footer";

  const readyButton = createButton({
    text: "Ready to Fight",
    fn: () => {
      readyFn();
    },
  });

  const backButton = createButton({
    text: "Back to Player Setup",
    fn: () => {
      backFn();
    },
  });

  shipPlacementScreenFooter.append(backButton, readyButton);

  shipPlacementScreen.append(
    shipPlacementScreenTitle,
    shipPlacementScreenFooter,
  );

  return shipPlacementScreen;
}

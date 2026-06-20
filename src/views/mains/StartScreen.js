import createButton from "../components/Button";

export default function createStartScreen() {
  const startScreen = document.createElement("div");
  startScreen.className = "start-screen";

  const startScreenTitle = document.createElement("h2");
  startScreenTitle.className = "start-screen__title";
  startScreenTitle.textContent = "Player Setup";

  const arrangeShipButton = createButton({
    text: "Arrange Ship",
    fn: () => {
      console.log("test");
    },
  });

  startScreen.append(startScreenTitle, arrangeShipButton);
  return startScreen;
}

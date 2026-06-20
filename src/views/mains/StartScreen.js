import createButton from "../components/Button";

export default function createStartScreen() {
  const startScreen = document.createElement("div");
  startScreen.className = "start-screen";

  const startScreenTitle = document.createElement("h2");
  startScreenTitle.className = "start-screen__title";
  startScreenTitle.textContent = "Player Setup";

  const startScreenMain = document.createElement("main");

  const startScreenFooter = document.createElement("footer");

  const arrangeShipButton = createButton({
    text: "Arrange Ship",
    fn: () => {
      console.log("test");
    },
  });

  startScreenFooter.append(arrangeShipButton);

  startScreen.append(startScreenTitle, startScreenMain, startScreenFooter);
  return startScreen;
}

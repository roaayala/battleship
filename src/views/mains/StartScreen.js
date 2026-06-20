export default function createStartScreen() {
  const startScreen = document.createElement("div");
  startScreen.className = "start-screen";

  const startScreenTitle = document.createElement("h2");
  startScreenTitle.className = "start-screen__title";
  startScreenTitle.textContent = "Player Setup";

  startScreen.append(startScreenTitle);
  return startScreen;
}

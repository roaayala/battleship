import { getValueById } from "../../utilities/helpers";
import createButton from "../components/Button";
import createScreenTitle from "../components/ScreenTitle";
import createSelectElement from "../components/SelectElement";

export default function createStartScreen(startScreenFn) {
  const startScreen = document.createElement("div");
  startScreen.className = "start-screen";

  const startScreenTitle = createScreenTitle({
    text: "Player Setup",
    style: "start-screen__title",
  });

  const startScreenMain = document.createElement("main");
  startScreenMain.className = "start-screen__main";

  const playerBehavior = ["Human", "Computer"];

  const playerOneSetup = createSelectElement({
    arr: playerBehavior,
    id: "playerOneBehavior",
    labelText: "Player One is",
  });

  const playerTwoSetup = createSelectElement({
    arr: playerBehavior,
    id: "playerTwoBehavior",
    labelText: "Player Two is",
  });

  startScreenMain.append(playerOneSetup, playerTwoSetup);

  const startScreenFooter = document.createElement("footer");
  startScreenFooter.className = "start-screen__footer";

  const arrangeShipButton = createButton({
    text: "Start Game",
    fn: () => {
      startScreenFn(
        getValueById("playerOneBehavior"),
        getValueById("playerTwoBehavior"),
      );
    },
  });

  startScreenFooter.append(arrangeShipButton);

  startScreen.append(startScreenTitle, startScreenMain, startScreenFooter);
  return startScreen;
}

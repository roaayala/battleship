import createButton from "../components/Button";
import createSelectPlayerBehavior from "../components/SelectPlayerBehavior";

export default function createStartScreen(startGameFn) {
  const startScreen = document.createElement("div");
  startScreen.className = "start-screen";

  const selectPlayerOneBehavior = createSelectPlayerBehavior({
    id: "selectBehaviorOne",
    labelText: "Player One Behavior",
  });

  const selectPlayerTwoBehavior = createSelectPlayerBehavior({
    id: "selectBehaviorTwo",
    labelText: "Player Two Behavior",
  });

  const startButton = createButton({
    text: "Start Game",
    fn: startGameFn,
  });

  startScreen.append(
    selectPlayerOneBehavior,
    selectPlayerTwoBehavior,
    startButton,
  );
  return startScreen;
}

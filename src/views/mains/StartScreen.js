import createButton from "../components/Button";
import createSelectPlayerBehavior from "../components/SelectPlayerBehavior";

export default function createStartScreen(startGameFn) {
  const startScreen = document.createElement("div");
  startScreen.className = "start-screen";

  const selectPlayerOneBehavior = createSelectPlayerBehavior({
    id: "playerOneBehavior",
    labelText: "Player One Behavior",
  });

  const selectPlayerTwoBehavior = createSelectPlayerBehavior({
    id: "playerTwoBehavior",
    labelText: "Player Two Behavior",
  });

  const startButton = createButton({
    text: "Start Game",
    fn: () => {
      const p1Behavior = document.getElementById("playerOneBehavior").value;
      const p2Behavior = document.getElementById("playerTwoBehavior").value;

      startGameFn(p1Behavior, p2Behavior);
    },
  });

  startScreen.append(
    selectPlayerOneBehavior,
    selectPlayerTwoBehavior,
    startButton,
  );
  return startScreen;
}

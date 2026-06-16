import createUI from "../views/DOM";

export default function startGame() {
  const UI = createUI();

  const handleStartGameClick = (p1Behavior, p2Behavior) => {
    if (p1Behavior === p2Behavior) {
      return;
    }

    console.log(p1Behavior, p2Behavior);
  };

  UI.init(handleStartGameClick);
}

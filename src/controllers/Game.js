import createPlayer from "../models/Player";
import createUI from "../views/DOM";

export default function startGame() {
  const UI = createUI();

  const handlePlayGameClick = (p1, p2) => {};

  const handleBackClick = () => {
    UI.renderStartScreen(handleStartGameClick);
  };

  const handleStartGameClick = (p1Behavior, p2Behavior) => {
    if (p1Behavior === p2Behavior) {
      UI.updateMessageBoard("Sorry, this feature currently not available!");
      return;
    }

    const isComputer = (behavior) => behavior === "Computer";

    const playerOne = createPlayer({
      name: "Player One",
      isComputer: isComputer(p1Behavior),
    });

    const playerTwo = createPlayer({
      name: "Player Two",
      isComputer: isComputer(p2Behavior),
    });

    const humanPlayers = [];

    if (isComputer(p1Behavior) === false) {
      humanPlayers.push(playerOne);
    }

    if (isComputer(p2Behavior) === false) {
      humanPlayers.push(playerTwo);
    }

    UI.renderShipPlacementScreen(
      humanPlayers[0],
      handlePlayGameClick,
      handleBackClick,
    );
  };

  UI.init(handleStartGameClick);
}

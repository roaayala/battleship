import createMessageBoard from "../views/components/MessageBoard";

export default function startGame(view, model) {
  const UI = view();

  const randomizeShipPlacement = (gameboard) => {};

  const onStartHandler = (p1, p2) => {
    if (p1 === p2) {
      // sent message
      const messageBoard = createMessageBoard({
        text: "This feature currently not available!",
      });

      UI.showMessageBoard(messageBoard);
      return;
    }

    const playerOne = model({ name: "Player One", isHuman: p1 === "human" });
    const playerTwo = model({ name: "Player Two", isHuman: p2 === "human" });

    console.log(playerOne, playerTwo);
  };

  const onReadyHandler = () => {
    // transition to BattleScreen
  };

  UI.initialRender();
  UI.renderStartScreen(onStartHandler);
}

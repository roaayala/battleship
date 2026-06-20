import createMessageBoard from "../views/components/MessageBoard";

export default function startGame(view, model) {
  const UI = view();

  const randomizeShipPlacement = (gameboard) => {
    const fleet = [
      { name: "Carrier", length: 5 },
      { name: "Battleship", length: 4 },
      { name: "Cruiser", length: 3 },
      { name: "Submarine", length: 3 },
      { name: "Destroyer", length: 2 },
    ];

    fleet.forEach((ship) => {
      let isPlaced = false;

      while (!isPlaced) {
        const randomX = Math.floor(Math.random() * 10);
        const randomY = Math.floor(Math.random() * 10);
        const randomDirection =
          Math.floor(Math.random() * 2) === 1 ? true : false;

        isPlaced = gameboard.placeShip({
          ship,
          xAxis: randomX,
          yAxis: randomY,
          isVertical: randomDirection,
        });
      }
    });
  };

  const onStartHandler = (p1, p2) => {
    if (p1 === p2) {
      // sent message
      const messageBoard = createMessageBoard({
        text: "This feature currently not available!",
      });

      UI.showMessageBoard(messageBoard);
      return;
    }

    const humanPlayers = [];

    const playerOne = model({ name: "Player One", isHuman: p1 === "human" });
    if (playerOne.isHuman) {
      humanPlayers.push(playerOne);
    } else {
      randomizeShipPlacement(playerOne.getGameboard());
    }

    const playerTwo = model({ name: "Player Two", isHuman: p2 === "human" });
    if (playerTwo.isHuman) {
      humanPlayers.push(playerTwo);
    } else {
      randomizeShipPlacement(playerTwo.getGameboard());
    }

    UI.renderShipPlacementScreen(onReadyHandler);
  };

  const onReadyHandler = (backFn) => {
    console.log("test");
    // transition to BattleScreen
  };

  UI.initialRender();
  UI.renderStartScreen(onStartHandler);
}

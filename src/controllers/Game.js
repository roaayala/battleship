import createMessageBoard from "../views/components/MessageBoard";
import { SHIP_CONFIGS } from "../utilities/constants";

export default function startGame(view, model) {
  const UI = view();

  const onRandomizeShipPlacement = (gameboard) => {
    gameboard.reset();

    const fleet = SHIP_CONFIGS;

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
      onRandomizeShipPlacement(playerOne.getGameboard());
    }

    const playerTwo = model({ name: "Player Two", isHuman: p2 === "human" });
    if (playerTwo.isHuman) {
      humanPlayers.push(playerTwo);
    } else {
      onRandomizeShipPlacement(playerTwo.getGameboard());
    }

    onShipPlacementPhase(humanPlayers, 0);
  };

  const onShipPlacementPhase = (humanPlayers, currentIndex) => {
    if (currentIndex >= humanPlayers.length) {
      // if human vs comp or comp vs human

      onReadyHandler(humanPlayers);
      return;
    }

    const currentPlayer = humanPlayers[currentIndex];

    UI.renderShipPlacementScreen(currentPlayer, {
      readyFn: () => {
        onShipPlacementPhase(humanPlayers, currentIndex + 1); // recursive, call this function for next human player
      },

      randomizeFn: () => {
        onRandomizeShipPlacement(currentPlayer.getGameboard());
        onShipPlacementPhase(humanPlayers, currentIndex);
      },

      placeShipFn: (ship, xAxis, yAxis, isVertical) => {
        const isPlaced = currentPlayer
          .getGameboard()
          .placeShip({ ship, xAxis, yAxis, isVertical });

        if (isPlaced) {
          onShipPlacementPhase(humanPlayers, currentIndex);
        } else {
          const messageBoard = createMessageBoard({
            text: "Fail to place ship",
          });

          UI.showMessageBoard(messageBoard);
        }
      },
      backFn: () => {
        UI.renderStartScreen(onStartHandler);
      },
    });
  };

  const onReadyHandler = (players) => {
    console.log(players[0].getGameboard().getBoard());
  };

  UI.initialRender();
  UI.renderStartScreen(onStartHandler);
}

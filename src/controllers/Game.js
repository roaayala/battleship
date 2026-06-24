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
        title: "Feature no available!",
        message: "This feature currently not available!",
      });

      UI.showMessageBoard(messageBoard);
      return;
    }

    const humanPlayers = [];
    const allPlayers = [];

    const playerOne = model({ name: "Player One", isHuman: p1 === "human" });
    allPlayers.push(playerOne);

    if (playerOne.isHuman) {
      humanPlayers.push(playerOne);
    } else {
      onRandomizeShipPlacement(playerOne.getGameboard());
    }

    const playerTwo = model({ name: "Player Two", isHuman: p2 === "human" });
    allPlayers.push(playerTwo);

    if (playerTwo.isHuman) {
      humanPlayers.push(playerTwo);
    } else {
      onRandomizeShipPlacement(playerTwo.getGameboard());
    }

    onShipPlacementPhase(humanPlayers, 0, allPlayers);
  };

  const onShipPlacementPhase = (humanPlayers, currentIndex, allPlayers) => {
    if (currentIndex >= humanPlayers.length) {
      // if human vs comp or comp vs human
      onBattlePhase(allPlayers[0], allPlayers[1]);

      return;
    }

    const currentPlayer = humanPlayers[currentIndex];

    UI.renderShipPlacementScreen(currentPlayer, {
      readyFn: () => {
        onShipPlacementPhase(humanPlayers, currentIndex + 1, allPlayers); // recursive, call this function for next human player
      },

      randomizeFn: () => {
        onRandomizeShipPlacement(currentPlayer.getGameboard());
        onShipPlacementPhase(humanPlayers, currentIndex, allPlayers);
      },

      resetFn: () => {
        currentPlayer.getGameboard().reset();
        onShipPlacementPhase(humanPlayers, currentIndex, allPlayers);
      },

      placeShipFn: (ship, xAxis, yAxis, isVertical) => {
        const isPlaced = currentPlayer
          .getGameboard()
          .placeShip({ ship, xAxis, yAxis, isVertical });

        if (isPlaced) {
          onShipPlacementPhase(humanPlayers, currentIndex, allPlayers);
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

  const onBattlePhase = (activePlayer, defendingPlayer) => {
    // winning condition
    if (defendingPlayer.getGameboard().allShipsSunk()) {
      alert(`${activePlayer.name} Win!`);
      return;
    }

    const humanPlayer = activePlayer.isHuman ? activePlayer : defendingPlayer;
    const enemyPlayer = activePlayer.isHuman ? defendingPlayer : activePlayer;

    const humanBoard = humanPlayer.getGameboard().getBoard();
    const enemyBoard = enemyPlayer.getGameboard().getBoard();

    // if computer
    if (!activePlayer.isHuman) {
      setTimeout(() => {
        activePlayer.randomizeAttack(defendingPlayer.getGameboard());

        onBattlePhase(defendingPlayer, activePlayer);
      }, 250);

      UI.renderBattleScreen({
        playerBoard: humanBoard,
        enemyBoard: enemyBoard,
        attackFn: () => {},
      });

      return;
    }

    // if human
    UI.renderBattleScreen({
      playerBoard: humanBoard,
      enemyBoard: enemyBoard,
      attackFn: (x, y) => {
        const isValid = activePlayer.attack(
          defendingPlayer.getGameboard(),
          x,
          y,
        );

        if (!isValid) {
          return;
        }

        onBattlePhase(defendingPlayer, activePlayer);
      },
    });
  };

  UI.initialRender();
  UI.renderStartScreen(onStartHandler);
}

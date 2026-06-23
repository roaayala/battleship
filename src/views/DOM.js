import createFooter from "./Footer";
import createHeader from "./Header";
import createBattleScreen from "./mains/BattleScreen";
import createShipPlacementScreen from "./mains/ShipPlacementScreen";
import createStartScreen from "./mains/StartScreen";

export default function renderUI() {
  const appContainer = document.getElementById("app");

  let main;
  let screenContainer;

  const resetContainer = () => {
    screenContainer.innerHTML = "";
  };

  const initialRender = () => {
    // header
    const header = createHeader();

    // footer
    const footer = createFooter();

    // main
    main = document.createElement("main");
    main.id = "main";
    main.className = "main";

    screenContainer = document.createElement("div");
    screenContainer.className = "container";

    main.append(screenContainer);

    appContainer.append(header, main, footer);

    renderStartScreen();
  };

  const renderStartScreen = (startScreenFn) => {
    resetContainer();

    const startScreen = createStartScreen(startScreenFn);

    screenContainer.append(startScreen);
  };

  const renderShipPlacementScreen = (players, handler) => {
    resetContainer();
    const shipReplacementScreen = createShipPlacementScreen(players, handler);

    screenContainer.append(shipReplacementScreen);
  };

  const renderBattleScreen = ({ playerBoard, enemyBoard, attackFn }) => {
    resetContainer();

    const battleScreen = createBattleScreen({
      playerBoard,
      enemyBoard,
      attackFn,
    });

    main.append(battleScreen);
  };

  const renderGameOverScreen = () => {};

  const showMessageBoard = (messageBoard) => {
    screenContainer.append(messageBoard);
    messageBoard.showModal();
  };

  return {
    initialRender,
    renderStartScreen,
    renderShipPlacementScreen,
    renderBattleScreen,
    renderGameOverScreen,
    showMessageBoard,
  };
}

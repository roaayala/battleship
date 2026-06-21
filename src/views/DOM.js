import createFooter from "./Footer";
import createHeader from "./Header";
import createShipPlacementScreen from "./mains/ShipPlacementScreen";
import createStartScreen from "./mains/StartScreen";

export default function renderUI() {
  const appContainer = document.getElementById("app");

  let main;

  const resetContainer = () => {
    main.innerHTML = "";
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

    appContainer.append(header, main, footer);

    renderStartScreen();
  };

  const renderStartScreen = (startScreenFn) => {
    resetContainer();

    const startScreen = createStartScreen(startScreenFn);

    main.append(startScreen);
  };

  const renderShipPlacementScreen = (
    players,
    onReadyFn,
    randomizeFn,
    placeShipFn,
    onBackFn,
  ) => {
    resetContainer();
    const shipReplacementScreen = createShipPlacementScreen(
      players,
      onReadyFn,
      randomizeFn,
      placeShipFn,
      onBackFn,
    );

    main.append(shipReplacementScreen);
  };

  const renderBattleScreen = () => {};

  const renderGameOverScreen = () => {};

  const showMessageBoard = (messageBoard) => {
    main.append(messageBoard);
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

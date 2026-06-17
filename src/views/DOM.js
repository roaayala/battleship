import createMessageBoard from "./components/MessageBoard";
import createFooter from "./Footer";
import createHeader from "./Header";
import createShipPlacementScreen from "./mains/ShipPlacementScreen";
import createStartScreen from "./mains/StartScreen";

export default function createUI() {
  const app = document.getElementById("app");

  let main;

  const emptyMain = () => {
    main.innerHTML = "";
  };

  const renderStartScreen = (startGameFn) => {
    emptyMain();
    const startScreen = createStartScreen(startGameFn);
    main.append(startScreen);
  };

  const init = (startGameFn) => {
    // static
    const header = createHeader();
    const footer = createFooter();

    // dynamic
    main = document.createElement("main");
    main.id = "main";
    main.className = "main";

    app.append(header, main, footer);
    renderStartScreen(startGameFn);
  };

  const renderShipPlacementScreen = (player, shipPlacementFn, goBackFn) => {
    emptyMain();

    const shipPlacementScreen = createShipPlacementScreen(
      player,
      shipPlacementFn,
      goBackFn,
    );

    main.append(shipPlacementScreen);
  };

  const updateGameboards = () => {
    emptyMain();
  };

  const updateMessageBoard = (text) => {
    const messageBoard = createMessageBoard({ text });

    app.append(messageBoard);
    messageBoard.showModal();
  };

  return {
    init,
    updateMessageBoard,
    updateGameboards,
    renderStartScreen,
    renderShipPlacementScreen,
  };
}

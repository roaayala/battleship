import createFooter from "./Footer";
import createHeader from "./Header";
import createStartScreen from "./mains/StartScreen";

export default function renderUI() {
  const appContainer = document.getElementById("app");

  let main;

  const resetContainer = (el) => (el.innerHTML = "");

  const initialRender = (startScreenFn) => {
    // header
    const header = createHeader();

    // footer
    const footer = createFooter();

    // main
    startScreenFn();

    appContainer.append(header, main, footer);
  };

  const renderStartScreen = () => {
    resetContainer(appContainer);

    main = document.createElement("main");
    main.className = "main";

    const startScreen = createStartScreen();

    main.append(startScreen);
  };

  const renderShipPlacementScreen = () => {};

  const renderBattleScreen = () => {};

  const renderGameOverScreen = () => {};

  return {
    initialRender,
    renderStartScreen,
    renderShipPlacementScreen,
    renderBattleScreen,
    renderGameOverScreen,
  };
}

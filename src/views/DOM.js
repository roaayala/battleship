import createFooter from "./Footer";
import createHeader from "./Header";
import createStartScreen from "./mains/StartScreen";

export default function renderUI() {
  const appContainer = document.getElementById("app");

  let main;

  const resetContainer = (el) => (el.innerHTML = "");

  const initialRender = () => {
    // header
    const header = createHeader();

    // footer
    const footer = createFooter();

    // main
    main = document.createElement("main");
    main.className = "main";

    appContainer.append(header, main, footer);

    renderStartScreen();
  };

  const renderStartScreen = () => {
    resetContainer(main);

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

import createFooter from "./Footer";
import createHeader from "./Header";
import createShipPlacementScreen from "./mains/ShipPlacementScreen";
import createStartScreen from "./mains/StartScreen";

export default function createUI() {
    const app = document.getElementById("app");

    let main;

    const init = (startGameFn) => {
        // static
        const header = createHeader();
        const footer = createFooter();

        // dynamic
        main = document.createElement("main");
        main.id = "main";

        const startScreen = createStartScreen(startGameFn);

        main.append(startScreen);
        app.append(header, main, footer);
    };

    const renderShipPlacementScreen = (shipPlacementFn) => {
        main.innerHTML = "";
        const shipPlacementScreen = createShipPlacementScreen(shipPlacementFn);

        main.append(shipPlacementScreen);
    };

    const updateGameboards = () => {
        main.innerHTML = "";
    };
    return {
        init,
        updateGameboards,
        renderShipPlacementScreen,
    };
}

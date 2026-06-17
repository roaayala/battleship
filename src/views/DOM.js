import createMessageBoard from "./components/MessageBoard";
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
        main.className = "main";

        const startScreen = createStartScreen(startGameFn);

        main.append(startScreen);
        app.append(header, main, footer);
    };

    const renderShipPlacementScreen = (player, shipPlacementFn) => {
        emptyMain();

        const shipPlacementScreen = createShipPlacementScreen(
            player,
            shipPlacementFn,
        );

        main.append(shipPlacementScreen);
    };

    const updateGameboards = () => {
        emptyMain();
    };

    const emptyMain = () => {
        main.innerHTML = "";
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
        renderShipPlacementScreen,
    };
}

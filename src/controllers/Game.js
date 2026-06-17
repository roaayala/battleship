import createUI from "../views/DOM";

export default function startGame() {
    const UI = createUI();

    const handlePlayGameClick = () => {
        console.log("To gameboard screen");
    };

    const handleStartGameClick = (p1Behavior, p2Behavior) => {
        if (p1Behavior === p2Behavior) {
            UI.updateMessageBoard();
            return;
        }

        UI.renderShipPlacementScreen(handlePlayGameClick);
    };

    UI.init(handleStartGameClick);
}

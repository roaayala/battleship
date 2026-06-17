import createPlayer from "../models/Player";
import createUI from "../views/DOM";

export default function startGame() {
    const UI = createUI();

    const handlePlayGameClick = () => {
        console.log("To gameboard screen");
    };

    const handleStartGameClick = (p1Behavior, p2Behavior) => {
        if (p1Behavior === p2Behavior) {
            UI.updateMessageBoard(
                "Sorry, this feature currently not available!",
            );
            return;
        }

        const isComputer = (behavior) => behavior === "Computer";

        const playerOne = createPlayer({
            name: "Player One",
            isComputer: isComputer(p1Behavior),
        });

        const playerTwo = createPlayer({
            name: "Player Two",
            isComputer: isComputer(p2Behavior),
        });

        console.log(playerOne, playerTwo);

        UI.renderShipPlacementScreen(handlePlayGameClick);
    };

    UI.init(handleStartGameClick);
}

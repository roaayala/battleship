import createUI from "../views/DOM";

export default function startGame() {
  const UI = createUI();

  const handleStartGameClick = () => {
    console.log("click");
  };

  UI.init(handleStartGameClick);
}

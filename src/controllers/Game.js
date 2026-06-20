export default function startGame(view, model) {
  const UI = view();

  const onStartHandler = (p1, p2) => {
    // transition to ShipPlacementScreen
    console.log(p1, p2);
  };

  const onReadyHandler = () => {
    // transition to BattleScreen
  };

  UI.initialRender();
  UI.renderStartScreen(onStartHandler);
}

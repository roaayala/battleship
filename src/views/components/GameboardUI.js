export default function createGameboardUI({
  playerBoard,
  onTileSelect,
  isRadar = false,
}) {
  const gameboard = document.createElement("main");
  gameboard.className = "player-gameboard";

  playerBoard.forEach((row, y) => {
    row.forEach((cell, x) => {
      const tile = document.createElement("div");
      tile.className = "player-gameboard__tile";
      tile.dataset.x = x;
      tile.dataset.y = y;

      if (cell !== null && typeof cell === "object" && !isRadar) {
        tile.classList.add("ship-tile");
      }

      if (cell === "miss") {
        tile.classList.add("miss");
      }

      if (cell === "hit") {
        tile.classList.add("hit");
      }

      gameboard.append(tile);
    });
  });

  const updateGameboard = (e) => {
    if (!e.target.classList.contains("player-gameboard__tile")) {
      return;
    }

    if (!onTileSelect) {
      return;
    }

    const x = Number(e.target.dataset.x);
    const y = Number(e.target.dataset.y);

    onTileSelect(x, y);
  };

  gameboard.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  gameboard.addEventListener("dragenter", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("player-gameboard__tile")) {
      e.target.classList.add("hover-preview");
    }
  });

  gameboard.addEventListener("dragleave", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("player-gameboard__tile")) {
      e.target.classList.remove("hover-preview");
    }
  });

  gameboard.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("player-gameboard__tile")) {
      e.target.classList.remove("hover-preview");
    }

    updateGameboard(e);
  });

  gameboard.addEventListener("click", (e) => {
    updateGameboard(e);
  });

  return gameboard;
}

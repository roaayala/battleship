import createGameboard from "../models/Gameboard";

test("board and getBoard", () => {
  const gameboard = createGameboard();

  expect(gameboard.getBoard().length).toBe(10);
  expect(gameboard.getBoard().length === 10).toBe(true);

  expect(gameboard.getBoard()[0].length).toBe(10);
  expect(gameboard.getBoard()[0].length === 10).toBe(true);
});

test("placeShip", () => {
  const gameboard = createGameboard();

  // vertical
  const shipVertical = gameboard.placeShip({
    shipLength: 5,
    xAxis: 1,
    yAxis: 5,
    isVertical: true,
  });

  const co1 = gameboard.getBoard()[5][1];
  const co2 = gameboard.getBoard()[4][1];
  expect(shipVertical).toBe(true);
  expect(co1).toBe(gameboard.getShipsOnBoard()[0]);
  expect(co2).toBe(null);

  const shipVertical1 = gameboard.placeShip({
    shipLength: 5,
    xAxis: 1,
    yAxis: 6,
    isVertical: true,
  });
  expect(shipVertical1).toBe(false);

  const shipVertical2 = gameboard.placeShip({
    shipLength: 6,
    xAxis: 1,
    yAxis: 5,
    isVertical: true,
  });
  expect(shipVertical2).toBe(false);

  // horizontal
  const shipHorizontal = gameboard.placeShip({
    shipLength: 5,
    xAxis: 5,
    yAxis: 1,
    isVertical: false,
  });
  expect(shipHorizontal).toBe(true);

  const shipHorizontal1 = gameboard.placeShip({
    shipLength: 5,
    xAxis: 6,
    yAxis: 1,
    isVertical: false,
  });
  expect(shipHorizontal1).toBe(false);

  const shipHorizontal2 = gameboard.placeShip({
    shipLength: 6,
    xAxis: 5,
    yAxis: 1,
    isVertical: false,
  });
  expect(shipHorizontal2).toBe(false);

  // overlap
  const shipVertical3 = gameboard.placeShip({
    shipLength: 5,
    xAxis: 4,
    yAxis: 4,
    isVertical: true,
  });
  expect(shipVertical3).toBe(true);

  const shipHorizontal3 = gameboard.placeShip({
    shipLength: 5,
    xAxis: 2,
    yAxis: 6,
    isVertical: false,
  });
  expect(shipHorizontal3).toBe(false);

  // oob
  const shipVertical4 = gameboard.placeShip({
    shipLength: 5,
    xAxis: 4,
    yAxis: -1,
    isVertical: true,
  });
  expect(shipVertical4).toBe(false);

  const shipHorizontal4 = gameboard.placeShip({
    shipLength: 5,
    xAxis: 11,
    yAxis: 4,
    isVertical: false,
  });
  expect(shipHorizontal4).toBe(false);
});

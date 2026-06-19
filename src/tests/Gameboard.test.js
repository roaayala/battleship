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

test("receiveAttack", () => {
  const gameboard = createGameboard();

  expect(gameboard.receiveAttack(-1, 1)).toBe(undefined);

  const att1 = gameboard.receiveAttack(1, 1);
  expect(att1.isHit).toBe(false);
  expect(att1.coordinate).toStrictEqual([1, 1]);
  expect(att1).toStrictEqual({ isHit: false, coordinate: [1, 1] });
  expect(gameboard.getMissedAttacks().length).toBe(1);
  expect(gameboard.getMissedAttacks()[0]).toStrictEqual([1, 1]);
  expect(gameboard.getBoard()[1][1]).toBe("miss");

  const att3 = gameboard.receiveAttack(1, 1);
  expect(gameboard.getMissedAttacks().length).toBe(1);

  const ship = gameboard.placeShip({
    shipLength: 3,
    xAxis: 3,
    yAxis: 3,
    isVertical: true,
  });
  const att2 = gameboard.receiveAttack(3, 3);
  expect(att2.isHit).toBe(true);
  expect(att2.coordinate).toStrictEqual([3, 3]);
  expect(att2).toStrictEqual({ isHit: true, coordinate: [3, 3] });
  expect(gameboard.getMissedAttacks().length).toBe(1);
  expect(gameboard.getMissedAttacks()[1]).toBe(undefined);
  expect(gameboard.getShipsOnBoard()[0].getHitCount()).toBe(1);

  gameboard.receiveAttack(3, 4);
  expect(gameboard.allShipsSunk()).toBe(false);
  gameboard.receiveAttack(3, 5);
  expect(gameboard.allShipsSunk()).toBe(true);
});

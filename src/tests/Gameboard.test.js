import createGameboard from "../models/Gameboard";

test("2 dimension array 10x10", () => {
  const gameboard = createGameboard();

  expect(gameboard.getBoard()).toStrictEqual([
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ]);
});

test("vertical ship placement", () => {
  const gameboard = createGameboard();

  gameboard.placeShip(2, 1, 0, true);

  const board = gameboard.getBoard();

  expect(board[0][1]).not.toBeNull();

  expect(board[0][1].length).toBe(2);

  expect(board[1][1]).not.toBeNull();

  // same ship
  expect(board[1][1]).toBe(board[0][1]);

  // check other tiles must be null
  expect(board[0][0]).toBeNull();
  expect(board[2][1]).toBeNull();
});

test("horizontal ship placement", () => {
  const gameboard = createGameboard();

  gameboard.placeShip(2, 1, 0, false);

  const board = gameboard.getBoard();

  expect(board[0][1]).not.toBeNull();

  expect(board[0][2].length).toBe(2);

  expect(board[0][1]).not.toBeNull();

  // same ship
  expect(board[0][1]).toBe(board[0][2]);

  // check other tiles must be null
  expect(board[0][0]).toBeNull();
  expect(board[0][3]).toBeNull();
});

test("receive attack", () => {
  const gameboard = createGameboard();

  gameboard.placeShip(2, 1, 0, false);
  const missedAttackRecord = gameboard.getMissedAttacks();

  expect(missedAttackRecord.length).toBe(0);

  expect(gameboard.receiveAttack(4, 4)).toBe(false);
  expect(missedAttackRecord.length).toBe(1);
  expect(missedAttackRecord[0]).toStrictEqual([4, 4]);

  // return true
  expect(gameboard.receiveAttack(2, 0)).toBe(true);
  expect(missedAttackRecord.length).toBe(1);
});

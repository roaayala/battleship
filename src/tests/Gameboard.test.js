import createGameboard from "../models/Gameboard";

test("board and getBoard", () => {
  const gameboard = createGameboard();

  expect(gameboard.getBoard().length).toBe(10);
  expect(gameboard.getBoard().length === 10).toBe(true);

  expect(gameboard.getBoard()[0].length).toBe(10);
  expect(gameboard.getBoard()[0].length === 10).toBe(true);
});

import createGameboard from "../models/Gameboard";
import createPlayer from "../models/Player";

test("create player object", () => {
  const playerOne = createPlayer({ name: "Player One", isComputer: false });
  const playerTwo = createPlayer({ name: "Player Two", isComputer: false });
  const computer = createPlayer({ name: "Computer", isComputer: true });

  // name
  expect(playerOne.name).toBe("Player One");
  expect(playerTwo.name).toBe("Player Two");
  expect(computer.name).toBe("Computer");

  // isComputer
  expect(playerOne.isComputer).toBe(false);
  expect(playerTwo.isComputer).toBe(false);
  expect(computer.isComputer).toBe(true);
});

test("random attack return correct object", () => {
  const computerPlayer = createPlayer({ name: "Computer", isComputer: true });
  const playerOne = createPlayer({ name: "Player", isComputer: false });

  const randomAttack = computerPlayer.randomAttack(playerOne.playerGameboard);

  expect(randomAttack).toHaveProperty("attack");
  expect(randomAttack).toHaveProperty("targetTile");

  const [x, y] = randomAttack.targetTile;

  expect(x).toBeGreaterThanOrEqual(0);
  expect(x).toBeLessThanOrEqual(9);

  expect(y).toBeGreaterThanOrEqual(0);
  expect(y).toBeLessThanOrEqual(9);
});

test("randomAttack shall excute receiveAttack on enemy board", () => {
  const computerPlayer = createPlayer({ name: "Computer", isComputer: true });
  const playerOne = createPlayer({ name: "Player", isComputer: false });

  const randomAttack = computerPlayer.randomAttack(playerOne.playerGameboard);

  const [x, y] = randomAttack.targetTile;

  const playerOneBoard = playerOne.playerGameboard.getBoard();
  expect(playerOneBoard[y][x]).toBe("miss");
});

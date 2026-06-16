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

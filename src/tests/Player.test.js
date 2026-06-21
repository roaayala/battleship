import createGameboard from "../models/Gameboard";
import createPlayer from "../models/Player";

test("player props", () => {
  const p1 = createPlayer({ name: "Player One", isHuman: true });
  const p2 = createPlayer({ name: "Player Two", isHuman: false });

  expect(p1.name).toBe("Player One");
  expect(p1.isHuman).toBe(true);
  expect(p1.getGameboard().getMissedAttacks().length).toBe(0);
});

test("randomizeAttack and attack", () => {
  const p2 = createPlayer({ name: "Player Two", isHuman: false });
  const computerTarget = createGameboard();
  p2.randomizeAttack(computerTarget);
  expect(computerTarget.getMissedAttacks().length).toBe(1);

  const p1 = createPlayer({ name: "Player One", isHuman: true });
  const humanTarget = createGameboard();
  p1.attack(humanTarget, 1, 1);
  expect(humanTarget.getMissedAttacks().length).toBe(1);
});

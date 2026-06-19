import createPlayer from "../models/Player";

test("player props", () => {
  const p1 = createPlayer({ name: "Player One", isHuman: true });
  const p2 = createPlayer({ name: "Player Two", isHuman: false });

  expect(p1.name).toBe("Player One");
  expect(p1.isHuman).toBe(true);
  expect(p1.getGameboard().getMissedAttacks().length).toBe(0);
});

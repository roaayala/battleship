import createShip from "../models/Ship";

test("length", () => {
  const ship = createShip({ name: "Destroyer", length: 5 });

  expect(ship.length).toBe(5);
});

test("hit and hitCount", () => {
  const ship = createShip(5);

  ship.hit();

  expect(ship.getHitCount()).toBe(1);
});

test("isSunk", () => {
  const ship = createShip({ name: "Destroyer", length: 5 });

  expect(ship.isSunk()).toBe(false);

  ship.hit();
  expect(ship.isSunk()).toBe(false);

  ship.hit();
  expect(ship.isSunk()).toBe(false);

  ship.hit();
  expect(ship.isSunk()).toBe(false);

  ship.hit();
  expect(ship.isSunk()).toBe(false);

  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

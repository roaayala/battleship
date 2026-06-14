import createShip from "../models/Ship.js";

// length
test("ship should have length same input and output", () => {
  const ship = createShip(5);

  expect(ship.length).toBe(5);
});

// .hit() must return corrent .hits()
test("hit() should change .hits() value", () => {
  const ship = createShip(5);

  ship.hit();

  expect(ship.hits()).toBe(1);
});

// isSunk() should return true
test("return true", () => {
  const ship = createShip(2);

  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(true);
});

// isSunk() should return false
test("return true", () => {
  const ship = createShip(2);

  ship.hit();

  expect(ship.isSunk()).toBe(false);
});

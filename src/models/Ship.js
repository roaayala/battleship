export default function createShip({ name, length }) {
  let hitCount = 0;

  const hit = () => hitCount++;

  const isSunk = () => hitCount >= length;

  return {
    get name() {
      return name;
    },
    get length() {
      return length;
    },
    getHitCount: () => hitCount,
    hit,
    isSunk,
  };
}

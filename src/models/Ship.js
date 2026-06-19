export default function createShip(length) {
  let hitCount = 0;

  const hit = () => hitCount++;

  const isSunk = () => hitCount >= length;

  return {
    getLength: () => length,
    getHitCount: () => hitCount,
    hit,
    isSunk,
  };
}

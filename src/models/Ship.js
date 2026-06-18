export default function createShip({ length }) {
  let hitCount = 0;

  const hit = () => hitCount++;

  const isSunk = () => length >= hitCount;

  return {
    getLength: () => length,
    getHitCount: () => hitCount,
    hit,
    isSunk,
  };
}

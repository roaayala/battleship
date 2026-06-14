export default function createShip(length) {
  let hitCount = 0;

  const hits = () => hitCount;

  const hit = () => {
    hitCount++;
  };

  const isSunk = () => hitCount >= length;

  return {
    length,
    hits,
    hit,
    isSunk,
  };
}

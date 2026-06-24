export default function createScreenTitle({ text }) {
  const screenTitle = document.createElement("h2");
  screenTitle.className = "screen-title";
  screenTitle.textContent = text;

  return screenTitle;
}

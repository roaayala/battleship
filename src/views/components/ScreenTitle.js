export default function createScreenTitle({ text, style }) {
  const screenTitle = document.createElement("h2");
  screenTitle.className = style;
  screenTitle.textContent = text;

  return screenTitle;
}

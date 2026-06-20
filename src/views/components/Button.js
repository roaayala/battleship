export default function createButton({ text, style = "button", fn }) {
  const button = document.createElement("button");
  button.className = style;
  button.textContent = text;

  button.addEventListener("click", () => {
    fn();
  });

  return button;
}

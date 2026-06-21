export default function createFooter() {
  const footer = document.createElement("footer");
  footer.className = "footer";

  const text = document.createElement("p");
  text.className = "footer__text";
  text.textContent = "Roaayala, 2026";

  footer.append(text);

  return footer;
}

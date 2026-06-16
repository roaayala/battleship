export default function createHeader() {
  const header = document.createElement("header");
  header.className = "header";

  const title = document.createElement("h1");
  title.className = "header__title";
  title.textContent = "Battleship";

  header.append(title);

  return header;
}

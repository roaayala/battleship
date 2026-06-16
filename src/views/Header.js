export default function createHeader() {
  const header = document.createElement("header");
  header.className = "header";

  const title = document.createElement("h1");
  title.className = "header__title";
  title.textContent = "Battleship";

  const titleInfo = document.createElement("span");
  titleInfo.className = "header__title-info";
  titleInfo.textContent = " by roaayala";

  title.append(titleInfo);

  header.append(title);

  return header;
}

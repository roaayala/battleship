import createFooter from "./Footer";
import createHeader from "./Header";

export default function createUI() {
  const app = document.getElementById("app");

  let main;

  const init = () => {
    // header
    const header = createHeader();
    const footer = createFooter();

    // main
    main = document.createElement("main");
    main.id = "main";
    main.textContent = "main";

    // footer

    app.append(header, main, footer);
  };

  const updateGameboards = () => {
    main.innerHTML = "";
  };
  return {
    init,
    updateGameboards,
  };
}

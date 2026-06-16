import createHeader from "./Header";

export default function createUI() {
  const app = document.getElementById("app");

  let main;

  const init = () => {
    // header
    const header = createHeader();

    // main
    main = document.createElement("main");
    main.id = "main";
    main.textContent = "main";

    // footer

    app.append(header, main);
  };

  const updateGameboards = () => {
    main.innerHTML = "";
  };
  return {
    init,
    updateGameboards,
  };
}

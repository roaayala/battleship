import createHeader from "./Header";

export default function createUI() {
  const app = document.getElementById("app");

  // header
  const header = createHeader();

  // main
  // footer
  //
  app.append(header);
}

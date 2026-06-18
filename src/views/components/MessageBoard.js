import createButton from "./Button";

export default function createMessageBoard({ text }) {
  const dialog = document.createElement("dialog");
  dialog.className = "dialog";
  dialog.textContent = text;

  // close button
  const closeButton = createButton({
    text: "Close",
    fn: () => {
      dialog.remove();
    },
  });

  // title
  // message element

  dialog.addEventListener("close", () => {
    dialog.remove();
  });

  dialog.append(closeButton);

  return dialog;
}

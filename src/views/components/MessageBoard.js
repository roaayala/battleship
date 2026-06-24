import createButton from "./Button";

export default function createMessageBoard({ title, message, onWin }) {
  const dialog = document.createElement("dialog");
  dialog.className = "dialog";

  // title
  const h3 = document.createElement("h3");
  h3.className = "dialog__title";
  h3.textContent = title;

  // message element
  const messageEl = document.createElement("p");
  messageEl.className = "dialog__message";
  messageEl.textContent = message;

  const closeContainer = document.createElement("div");
  closeContainer.className = "dialog__close-container";

  // close button
  const closeButton = createButton({
    text: "Close",
    fn: () => {
      dialog.remove();
    },
  });

  dialog.addEventListener("close", () => {
    if (onWin) {
      onWin();
    }

    dialog.remove();
  });

  closeContainer.append(closeButton);

  dialog.append(h3, messageEl, closeContainer);

  return dialog;
}

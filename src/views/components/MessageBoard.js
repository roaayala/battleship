export default function createMessageBoard({ text }) {
    const dialog = document.createElement("dialog");
    dialog.className = "dialog";
    dialog.textContent = text;

    dialog.addEventListener("close", () => {
        dialog.remove();
    });

    return dialog;
}

export default function createSelectPlayerBehavior({ id, labelText }) {
  const behaviors = ["Human", "Computer"];

  const container = document.createElement("div");
  container.className = "select-player";

  const label = document.createElement("label");
  label.htmlFor = id;
  label.textContent = labelText;

  const select = document.createElement("select");
  select.name = "behavior";
  select.id = id;

  behaviors.forEach((b) => {
    const option = document.createElement("option");
    option.value = b;
    option.textContent = b;

    select.append(option);
  });

  container.append(label, select);

  return container;
}

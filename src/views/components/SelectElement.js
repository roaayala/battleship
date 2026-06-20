export default function createSelectElement({ arr, id, labelText }) {
  const formGroup = document.createElement("div");
  formGroup.className = "form-group";

  const labelElement = document.createElement("label");
  labelElement.className = "form-label";
  labelElement.htmlFor = id;
  labelElement.textContent = labelText;

  const selectElement = document.createElement("select");
  selectElement.className = "form-select";
  selectElement.id = id;
  selectElement.name = id;

  arr.forEach((item) => {
    const optionElement = document.createElement("option");
    optionElement.className = "form-select__option";
    optionElement.value = item.toLowerCase();
    optionElement.textContent = item;

    selectElement.append(optionElement);
  });

  formGroup.append(labelElement, selectElement);

  return formGroup;
}

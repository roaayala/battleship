import { SHIP_CONFIGS } from "../../utilities/constants";
import createButton from "./Button";

export default function createShipGarage({
  placedShipNames,
  onSelectShip,
  onAxisToggle,
}) {
  const shipGarage = document.createElement("aside");
  shipGarage.className = "ship-garage";

  const shipGarageTitle = document.createElement("h3");
  shipGarageTitle.className = "ship-garage__title";
  shipGarageTitle.textContent = "Available Ships";

  const shipGarageContainer = document.createElement("div");
  shipGarageContainer.className = "ship-garage__container";

  SHIP_CONFIGS.forEach((ship) => {
    const isPlaced = placedShipNames.includes(ship.name);
    const setActiveState = () => {
      const allShip = shipGarageContainer.querySelectorAll(".ship-card");

      // remove active state to others button
      allShip.forEach((card) => card.classList.remove("active"));

      // add active state to clicked button
      shipCard.classList.add("active");
    };

    const shipCard = document.createElement("div");
    shipCard.className = "ship-card";

    const shipCardTitle = document.createElement("h4");
    shipCardTitle.className = "ship-card__title";
    shipCardTitle.textContent = ship.name;

    const shipCardInfo = document.createElement("p");
    shipCardInfo.className = "ship-card__info";
    shipCardInfo.textContent = `Length: ${ship.length}`;

    shipCard.append(shipCardTitle, shipCardInfo);

    if (isPlaced) {
      shipCard.classList.add("placed");
    } else {
      shipCard.draggable = true;

      shipCard.addEventListener("dragstart", () => {
        onSelectShip(ship);
        setActiveState();
      });

      shipCard.addEventListener("click", () => {
        onSelectShip(ship);
        setActiveState();
      });
    }

    shipGarageContainer.append(shipCard);
  });

  let localIsVertical = false;

  const axisToggleButton = createButton({
    text: "Axis: Horizontal",
    style: "axis-toggle-btn",
    fn: () => {
      localIsVertical = !localIsVertical;
      axisToggleButton.textContent = `Axis: ${localIsVertical ? "Vertical" : "Horizontal"}`;

      onAxisToggle(localIsVertical);
    },
  });

  shipGarage.append(shipGarageTitle, shipGarageContainer, axisToggleButton);

  return shipGarage;
}

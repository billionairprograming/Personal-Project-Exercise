//Main goal is to display what was selected and then to display the exercise in the lower section

//Display the body parts where and seperate them in each section and make them clickable

window.addEventListener("DOMContentLoaded", function () {
  const selectedBodyPartsDisplay = document.getElementById(
    "selectedBodyPartsDisplay"
  );

  if (selectedBodyPartsDisplay) {
    const selectedParts =
      JSON.parse(localStorage.getItem("selectedBodyParts")) || [];

    if (selectedParts.length === 0) {
      selectedBodyPartsDisplay.textContent = "No body parts selected yet!";
    } else {
      selectedParts.forEach((part) => {
        const div = document.createElement("div");
        div.textContent = part;
        selectedBodyPartsDisplay.appendChild(div);
      });
    }
  }
});

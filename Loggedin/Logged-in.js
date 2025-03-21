// the API will be added into this one
//add in axios [x]
//When the button is selected then the user can choose their work out
// im gonna have to create what is gonna be lower body and upper body based on the body parts

//Errors im noticing
// If the user clicks the same button more then once it will keep adding the body part in
// select/diselcet when the same button is clicked
//If the user closes and reopens the workout page it will add in a new array each time
//Make sure there is only one array

axios.defaults.baseURL = "https://exercisedb-api.vercel.app";

// Variables
const selectWorkout = document.getElementById("selectworkout");
const upperBodySelected = document.getElementById("upperbodyselected");
const lowerBodySelected = document.getElementById("lowerbodyselected");
const startWorkoutBtn = document.getElementById("startworkout");
const selectBodyPartModalContainer = document.getElementById(
  "selectBodyPartModalContainer"
);
const selectedBodyPartsContainer = document.getElementById(
  "selectedBodyPartsContainer"
);
const upperBodySelectionContainer = document.getElementById(
  "upperBodySelectionContainer"
);
const lowerBodySelectionContainer = document.getElementById(
  "lowerBodySelectionContainer"
);
const closeSelectBodyPartsModalContainer = document.getElementById(
  "closeSelectBodyPartsModalContainer"
);

// Body Part Lists
const upper = [
  "shoulders",
  "lower arms",
  "neck",
  "upper arms",
  "back",
  "chest",
];
const lower = ["waist", "upper legs", "lower legs"];

let selectedBodyParts =
  JSON.parse(localStorage.getItem("selectedBodyParts")) || [];

// Function to Create Selectable Buttons
function selectionMaker(bodyPart) {
  const button = document.createElement("button");
  button.textContent = bodyPart;
  button.setAttribute("data-bodypart", bodyPart);

  // Add 'selected' class for selected parts
  if (selectedBodyParts.includes(bodyPart)) {
    button.classList.add("selected");
  }

  button.onclick = function () {
    const selectBodyIndex = selectedBodyParts.indexOf(bodyPart);

    if (selectBodyIndex !== -1) {
      selectedBodyParts.splice(selectBodyIndex, 1);
      button.classList.remove("selected"); // Deselect
    } else {
      selectedBodyParts.push(bodyPart);
      button.classList.add("selected"); // Select
    }

    // Update display and save data
    selectedBodyPartsContainer.textContent = selectedBodyParts.join(", ");
    localStorage.setItem(
      "selectedBodyParts",
      JSON.stringify(selectedBodyParts)
    );
  };

  return button;
}

// Display Body Part Selection Modal
selectWorkout.onclick = function () {
  selectBodyPartModalContainer.showModal();

  // Clear containers first to avoid duplicates

  upper.forEach((upperBodyPart) => {
    upperBodySelectionContainer.appendChild(selectionMaker(upperBodyPart));
  });

  lower.forEach((lowerBodyPart) => {
    lowerBodySelectionContainer.appendChild(selectionMaker(lowerBodyPart));
  });
};

// Close Modal and Display Exercises
closeSelectBodyPartsModalContainer.onclick = async function () {
  console.log(selectedBodyParts);

  let exercises = {};
  for (let i = 0; i < selectedBodyParts.length; i++) {
    const response = await getExercisesByBodyPart(selectedBodyParts[i]);
    exercises = { ...exercises, ...response };
  }

  console.log(exercises);
  const pre = document.createElement("pre");
  pre.textContent = JSON.stringify(exercises, null, 2);
  upperBodySelected.appendChild(pre);

  selectBodyPartModalContainer.close();

  upperBodySelectionContainer.innerHTML = "";
  lowerBodySelectionContainer.innerHTML = "";
};

// API Request for Exercises
async function getExercisesByBodyPart(bodyPartName) {
  try {
    const res = await axios.get(`/api/v1/bodyparts/${bodyPartName}/exercises`);
    return {
      [bodyPartName]: res.data?.data?.exercises ?? [],
    };
  } catch (error) {
    console.error(`Error fetching exercises for ${bodyPartName}:`, error);
    return { [bodyPartName]: [] };
  }
}

// Start Workout Button — Navigates to New Page
startWorkoutBtn.addEventListener("click", function () {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  userInfo.userWorkouts = {
    upper: selectedBodyParts.filter((part) => upper.includes(part)),
    lower: selectedBodyParts.filter((part) => lower.includes(part)),
  };

  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  window.location.href = "../WorkoutPage/workouts.html";
});

// Show Selected Body Parts on Another Page

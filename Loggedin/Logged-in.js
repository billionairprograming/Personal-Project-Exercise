// the API will be added into this one
//add in axios [x]
//When the button is selected then the user can choose their work out
// im gonna have to create what is gonna be lower body and upper body based on the body parts

axios.defaults.baseURL = "https://exercisedb-api.vercel.app";

//Varibles

const selectWorkout = document.getElementById("selectworkout");
const upperBodySelected = document.getElementById("upperbodyselected");
const lowerBodySelectes = document.getElementById("lowerbodyselected");
const startWorkoutBtn = document.getElementById("startworkout");

//Functions & methods

//Functionallys
//{} Data is to be grabbed from the apis
//{} When the user selects a bodypart to work out it will show the exercises in the preview

// eventlisteners & inits

const upper = [
    "shoulders",
    "lower arms",
    "neck",
    "upper arms",
    "back",
    "chest",
  ],
  lower = ["waist", "upper legs", "lower legs"];

let selectedBodyParts = [];

function selectionMaker(bodyPart) {
  const button = document.createElement("button");
  button.textContent = bodyPart;
  button.onclick = function () {
    selectedBodyParts.push(bodyPart);
    selectedBodyPartsContainer.textContent = selectedBodyParts.join(", ");
  };
  return button;
}

// upper.forEach((upperBodyPart) =>
//   upperBodyDropdown.appendChild(optionMaker(upperBodyPart))
// );
// lower.forEach((lowerBodyPart) =>
//   lowerBodyDropdown.appendChild(optionMaker(lowerBodyPart))
// );

selectWorkout.onclick = function () {
  selectBodyPartModalContainer.showModal();
  upper.forEach((upperBodyPart) => {
    upperBodySelectionContainer.appendChild(selectionMaker(upperBodyPart));
  });
  lower.forEach((lowerBodyPart) =>
    lowerBodySelectionContainer.appendChild(selectionMaker(lowerBodyPart))
  );
};

closeSelectBodyPartsModalContainer.onclick = async function () {
  console.log(selectedBodyParts);
  let exercises = {};
  for (let i = 0; i < selectedBodyParts.length; i++) {
    const response = await getExercisesByBodyPart(selectedBodyParts[i]);
    exercises = {
      ...exercises,
      ...response,
    };
  }

  console.log(exercises);
  const pre = document.createElement("pre");
  pre.textContent = JSON.stringify(exercises, null, 2);
  upperbodyselected.appendChild(pre);
  selectedBodyParts = [];
  selectBodyPartModalContainer.close();
};

async function getExercisesByBodyPart(bodyPartName) {
  const res = await axios.get(`/api/v1/bodyparts/${bodyPartName}/exercises`);
  console.log(res);
  return {
    [bodyPartName]: res.data?.data?.exercises ?? [],
  };
}

// /api/v1/bodyparts/{bodyPartName}/exercises
// https://exercisedb-api.vercel.app
// {
//   "name": "shoulders"
// },
// {
//   "name": "lower arms"
// },
// {
//   "name": "cardio"
// },
// {
//   "name": "neck"
// },
// {
//   "name": "upper legs"
// },
// {
//   "name": "upper arms"
// },
// {
//   "name": "lower legs"
// },
// {
//   "name": "back"
// },
// {
//   "name": "chest"
// },
// {
//   "name": "waist"
// }

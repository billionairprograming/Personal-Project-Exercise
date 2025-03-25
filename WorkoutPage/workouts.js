//Main goal is to display what was selected and then to display the exercise in the lower section

//Display the body parts where and seperate them in each section and make them clickable
const displayExercise = document.getElementById("exerciseDisplay");
let currentExerciseIndex = 0;
const nameDiv = document.getElementById("name");
const stepDiv = document.getElementById("steps");
const equipmentDiv = document.getElementById("equipment");
const targetDiv = document.getElementById("target");
const nextButton = document.getElementById("nextBtn");
const prevButton = document.getElementById("prevBtn");
const finishButton = document.getElementById("finishBtn");

window.addEventListener("DOMContentLoaded", function () {
  const selectedBodyPartsDisplay = document.getElementById(
    "selectedBodyPartsDisplay"
  );

  const selectedParts =
    JSON.parse(localStorage.getItem("selectedBodyParts")) || [];

  if (selectedBodyPartsDisplay) {
    if (selectedParts.length === 0) {
      selectedBodyPartsDisplay.textContent = "No body parts selected yet!";
    } else {
      bodyParts = [selectedParts[0]];
      displayExercises();

      selectedParts.forEach((part) => {
        const button = document.createElement("button");
        button.textContent = part;
        selectedBodyPartsDisplay.appendChild(button);
        button.onclick = function () {
          bodyParts = [part];
          nameDiv.textContent = "";
          stepDiv.textContent = "";
          equipmentDiv.textContent = "";
          targetDiv.textContent = "";
          displayExercises();

          console.log("part to be displayed =", part);
        };
      });
    }
  }
});

// global vbariable
let allExercises = [];
let bodyParts = [];

function getUserInfo() {
  return JSON.parse(localStorage.getItem("userInfo")) || {};
}

//display the exercise in the lower section
function displayExercises() {
  const userExercises = getUserInfo().userWorkouts.exercises;
  //bodyParts = Object.keys(userExercises); // crate buttons when click button -> need to selected userExercises[<selectectedBodyPart>] assing that to allExercises

  console.log("userExercises =", userExercises);
  console.log("currentExericseIndex =", currentExerciseIndex);
  console.log("bodyParts =", bodyParts);

  if (bodyParts.length === 0) {
    console.error("No body part selected!");
    return;
  }

  const selectedBodyPart = bodyParts[0];

  allExercises = userExercises[selectedBodyPart];

  if (allExercises.length === 0) {
    console.error(`No exercises found for body part: ${selectedBodyPart}`);
    return;
  }

  /*
  {
    exerciseType : [{
     name: "",
     instructions: []
    
    }, 
    {}, 
    {}, 
    {}] 
  }

  
  
  */

  // for (const exerciseType in userExercises) {
  //   allExercises = [...allExercises, ...userExercises[exerciseType]];

  //   // console.log("exerciseType =", exerciseType);

  //   // const exercise = currentExercise(
  //   //   currentExerciseIndex,
  //   //   userExercises[exerciseType]
  //   // );
  //   // console.log("exercise", exercise);
  //   // const name = exercise?.name;

  //   // const steps = exercise?.instructions;
  //   // const equipment = exercise?.equipments;
  //   // const target = exercise?.targetMuscles;

  //   // console.log("steps", steps);

  //   // // name

  //   // nameDiv.textContent = name;

  //   // // instructions
  //   // // clear stepDiv before repopulating it
  //   // stepDiv.innerHTML = "";
  //   // for (let i = 0; i < steps.length; i++) {
  //   //   const eachStepDiv = document.createElement("div");
  //   //   eachStepDiv.textContent = steps[i];
  //   //   stepDiv.appendChild(eachStepDiv);
  //   // }

  //   // // equipment

  //   // equipmentDiv.textContent = equipment;

  //   // // target

  //   // targetDiv.textContent = target;
  // }
  currentExerciseIndex = 0;
  const current = allExercises[currentExerciseIndex];

  console.log("current =", current);

  nameDiv.textContent = current.name;
  stepDiv.innerHTML = "";
  for (let i = 0; i < current.instructions.length; i++) {
    const eachStepDiv = document.createElement("div");
    eachStepDiv.textContent = current.instructions[i];
    stepDiv.appendChild(eachStepDiv);
  }

  equipmentDiv.textContent = current.equipments;
  targetDiv.textContent = current.targetMuscles;

  console.log("allExercises =", allExercises);
}

displayExercises();

function currentExercise(index = 0, exercises) {
  return exercises[index];
  // return exercises[index];
}

/**
 * let idx =
 * const arr = [1, 2, 3, 4, 5, 7]
 */

nextButton.addEventListener("click", function () {
  if (currentExerciseIndex === allExercises.length - 1)
    currentExerciseIndex = 0;
  else currentExerciseIndex++;
  stepDiv.innerHTML = "";
  nameDiv.innerHTML = "";
  equipmentDiv.innerHTML = "";
  targetDiv.innerHTML = "";

  const current = allExercises[currentExerciseIndex];

  nameDiv.textContent = current.name;
  for (let i = 0; i < current.instructions.length; i++) {
    const eachStepDiv = document.createElement("div");
    eachStepDiv.textContent = current.instructions[i];
    stepDiv.appendChild(eachStepDiv);
  }

  equipmentDiv.textContent = current.equipments;
  targetDiv.textContent = current.targetMuscles;

  // displayExercises();
  //if last exercise then go to next set of exercises
});

prevButton.addEventListener("click", function () {
  if (currentExerciseIndex < 1) {
    return;
  }

  currentExerciseIndex--;
  stepDiv.innerHTML = "";
  displayExercises();
});

finishButton.addEventListener("click", function () {
  selectedBodyPartsDisplay.innerHTML = "";
  console.log(localStorage.getItem("userInfo"));
  localStorage.removeItem("userInfo", "userWorkouts");
  localStorage.removeItem("selectedBodyParts");

  console.log("local storage", localStorage);

  window.location.href = "../logged-in/index.html";
});

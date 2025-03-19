// Sign up page 2 varibles
const age = document.getElementById("age");
const ageFeedback = document.getElementById("agefeedback");
const gender = document.getElementById("gender");
const genderFeedback = document.getElementById("genderfeedback");
const height = document.getElementById("height");
const heightFeedback = document.getElementById("heightfeedback");
const weight = document.getElementById("weight");
const weightFeedback = document.getElementById("weightfeedback");
const bodySubmit = document.getElementById("bodysubmit");

function validateAge() {
  //must be at least 16 years of age
  // add in the requirmet where they have to be 16 or older
  let ages = age.value;

  if (ages < 16) {
    ageFeedback.textContent = "You must be at least 16";
    ageFeedback.style.color = "red";
  } else {
    ageFeedback.textContent = "Great!";
    ageFeedback.style.color = "green";
  }
}

function validateGender() {
  // must select a gender at least one
  let genderInput = gender.value;

  if (genderInput === "") {
    genderFeedback.textContent = "Must select a age.";
    genderFeedback.style.color = "red";
  } else {
    genderFeedback.textContent = "Perfect";
    genderFeedback.style.color = "green";
  }
}

function vaildateHeight() {
  // this cannot be empty
  //has to be in ft ,inches
  let heightInput = height.value;
  let mininput = heightInput.length >= 2;

  if (heightInput === "") {
    heightFeedback.textContent = "You have to input your height";
    heightFeedback.style.color = "red";
  } else if (!mininput) {
    heightFeedback.textContent = "Input another number";
    heightFeedback.style.color = "red";
  } else {
    heightFeedback.textContent = "Great!";
    heightFeedback.style.color = "green";
  }
}

function validateWeight() {
  // This cannot be empty
  // has to be in pounds
  // add in lbs

  let weightInput = weight.value;

  if (weightInput === "") {
    weightFeedback.textContent = "Input weight";
    weightFeedback.style.color = "red";
  } else if (weightInput > 500) {
    weightFeedback.textContent =
      "Come on now your not that big. At least I hope not.";
    weightFeedback.style.color = "red";
  } else {
    weightFeedback.textContent = "Great lets go";
    weightFeedback.style.color = "green";
  }
}

function saveBodyInfo() {
  let userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  userInfo.bodyInfo = {
    age: age.value.trim(),
    gender: gender.value.trim(),
    height: height.value.trim(),
    weight: weight.value.trim(),
  };

  localStorage.setItem("userInfo", JSON.stringify(userInfo));

  window.location.href = "../Login/login.html";
}
// This would be saved to the local

bodySubmit.addEventListener("click", saveBodyInfo);

//This does work but i have to add in a few more error blockers and make sure everything is filled out as needed.

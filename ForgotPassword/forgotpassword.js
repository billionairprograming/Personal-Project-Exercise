const checkedUserEmail = document.getElementById("inputemailcheck");
const userEmailFeedback = document.getElementById("emailsfeedback");
const newUserPassword = document.getElementById("newpassword");
const newPasswordFeedback = document.getElementById("newpassword-feedback");
const newConfimedPassword = document.getElementById("Confirm");
const newConfirmedFeedback = document.getElementById("confimpasswordfeedback");
const confimedBtn = document.getElementById("confirmpwbtn");

//Functionally
//email has to match and both passwords must be the same with the requermets and saved to the storage

function userEmail() {
  let checkedEmail = checkedUserEmail.value;
  let storedData = JSON.parse(localStorage.getItem("userInfo"));
  const isEmailMatched = checkedEmail === storedData.email;

  if (!isEmailMatched) {
    userEmailFeedback.textContent = "Email does not exist";
    userEmailFeedback.style.color = "red";
  } else {
    userEmailFeedback.textContent = "Email is in the database";
    userEmailFeedback.style.color = "green";
  }
  return isEmailMatched;
}

function newPassword() {
  let newPw = newUserPassword.value;
  let newConfirmedPw = newConfimedPassword.value;
  let passwordRegex = /^(?=(.*\d){2,})(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

  const minPass = newPw.length >= 8;
  const maxPassSym = (newPw.match(/\d/g) || []).length >= 2;
  const hasSpeicalChar = /[!@#$%^&*]/.test(newPw);

  let errorMessages = [];

  if (!minPass) errorMessages.push("Password must be 8 char long ");
  if (!maxPassSym) errorMessages.push("Password must have at least 2 symbols.");
  if (!hasSpeicalChar) errorMessages.push("Must have at least 1 [!@#$%^&*] ");

  if (passwordRegex.test(newPw) && errorMessages.length === 0) {
    newPasswordFeedback.textContent = "Password is looking good";
    newPasswordFeedback.style.color = "green";
  } else {
    newPasswordFeedback.textContent = errorMessages.join(" ");
    newPasswordFeedback.style.color = "red";
  }

  if (newConfirmedPw !== "" && newConfirmedPw !== newPw) {
    newConfirmedFeedback.textContent = "Passwords do not match";
    newConfirmedFeedback.style.color = "red";
  } else if (newConfirmedPw !== "") {
    newConfirmedFeedback.textContent = "Lets get working out";
    newConfirmedFeedback.style.color = "green";
  }
  return newConfimedPassword;
}

//add here for the data to be saved to the localstorage and then the next screen loads up
confimedBtn.addEventListener("click", function () {});

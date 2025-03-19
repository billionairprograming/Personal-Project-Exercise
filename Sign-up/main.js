//varibales
//Signup page 1
const username = document.getElementById("username");
const userFeedback = document.getElementById("userfeedback");
const email = document.getElementById("email");
const emailFeedback = document.getElementById("emailfeedback");
const password = document.getElementById("password");
const passwordFeedback = document.getElementById("passwordfeedback");
const confirmPassword = document.getElementById("confirmpassword");
const confirmPwFeedback = document.getElementById("confirmpwfeedback");
const signupSubmit = document.getElementById("signup-submit");

//Functions and methods
//user reqierments 6caracters, 1 or more numbers , 1 symbol
function vaildateUsername() {
  let userName = username.value;
  let userRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;

  const minChar = userName.length >= 6;
  const minNum = (userName.match(/\d/g) || []).length >= 1;
  const minsym = /[!@#$%^&*]/.test(userName);

  let errorMessage = [];

  if (!minChar) errorMessage.push("Must be 6 chars long");
  if (!minNum) errorMessage.push("You must have at least one number");
  if (!minsym) errorMessage.push("Must have at least 1 symbol");

  if (userRegex.test(userName) && errorMessage.length === 0) {
    userFeedback.textContent = "Great Username.";
    userFeedback.style.color = "green";
  } else if (errorMessage.length > 0) {
    (userFeedback.textContent = errorMessage.join(" ")), "Not in my house";
    userFeedback.style.color = "red";
  }
}

function vaildateEmail() {
  let emails = email.value;

  if (!emails.includes("@")) {
    emailFeedback.textContent = "Must have a @";
    emailFeedback.style.color = "red";
  } else {
    emailFeedback.textContent = "Email looks great";
    emailFeedback.style.color = "green";
  }
}

function vaildatePassword() {
  let passwords = password.value;
  let confirmPasswords = confirmPassword.value;
  let passwordRegex = /^(?=(.*\d){2,})(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

  const minPass = passwords.length >= 8;
  const maxPassSym = (passwords.match(/\d/g) || []).length >= 2;
  const hasSpeicalChar = /[!@#$%^&*]/.test(passwords);

  let errorMessages = [];

  if (!minPass) errorMessages.push("Password must be 8 char long ");
  if (!maxPassSym) errorMessages.push("Password must have at least 2 symbols.");
  if (!hasSpeicalChar) errorMessages.push("Must have at least 1 [!@#$%^&*] ");

  if (passwordRegex.test(passwords) && errorMessages.length === 0) {
    passwordFeedback.textContent = "Password is looking good";
    passwordFeedback.style.color = "green";

    confirmPassword.style.display = "block";
  } else {
    passwordFeedback.textContent = errorMessages.join(" ");
    passwordFeedback.style.color = "red";
  }

  if (confirmPasswords !== "" && confirmPasswords !== passwords) {
    confirmPwFeedback.textContent = "Passwords do not match";
    confirmPwFeedback.style.color = "red";
  } else if (confirmPasswords !== "") {
    confirmPwFeedback.textContent = "Lets get working out";
    confirmPwFeedback.style.color = "green";
  }
}

function saveData() {
  let userInfo = {
    username: username.value.trim(),
    email: email.value.trim(),
    password: password.value.trim(),
  };

  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  alert("Almost there!");

  window.location.href = "../Signinpage2/sign-up2.html";
}

//eventlisterns and inits

signupSubmit.addEventListener("click", saveData);

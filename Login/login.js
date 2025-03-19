const emailCheck = document.getElementById("loginemail");
const emailFeedback = document.getElementById("login-emailfeedback");
const passwordCheck = document.getElementById("loginpassword");
const passwordCheckFeedback = document.getElementById("login-passwordfeedback");
const loginBtn = document.getElementById("loginbtn");
const forgotPassword = document.getElementById("forgotpassword");
const feedback = document.getElementById("feedback");

//Functionallty
// add in if something isnt added in then the next window wont load
function emailLogin() {
  // checks and makes sure email matches
  // when there is no data in the local its gonna throw an error
  let userEmail = emailCheck.value;
  let dataStored = JSON.parse(localStorage.getItem("userInfo"));
  const emailMatch = userEmail === dataStored.email;

  if (!emailMatch) {
    emailFeedback.textContent = "Email is not in the system";
    emailFeedback.style.color = "red";
  } else {
    emailFeedback.textContent = "Lets rock and roll!";
    emailFeedback.style.color = "green";
  }
  return emailMatch;
}

function passwordInput() {
  // This makes sure the password is correct
  let userPw = passwordCheck.value;
  let dataStored = JSON.parse(localStorage.getItem("userInfo"));

  const checkedPassword = userPw === dataStored.password;

  if (!checkedPassword) {
    passwordCheckFeedback.textContent = "Your Password is incorrect";
    passwordCheckFeedback.style.color = "red";
  } else {
    passwordCheckFeedback.textContent = "Lets get rocking and rolling";
    passwordCheckFeedback.style.color = "green";
  }

  return checkedPassword;
}

loginBtn.addEventListener("click", function () {
  const isEmailVaild = emailLogin();
  const isPwVaild = passwordInput();

  if (!isEmailVaild || !isPwVaild) {
    feedback.textContent = "Somthing isnt working";
    feedback.style.color = "red";
  } else {
    feedback.textContent = "";
    window.location.href = "../Loggedin/Logged-in.html";
  }
});

forgotPassword.addEventListener("click", function () {
  window.location.href = "../ForgotPassword/forgotpassword.html";
});

//Got this page to work all I have to do is make sure the other errors are handled when the user adds stuff in

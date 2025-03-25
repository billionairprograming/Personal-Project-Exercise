//Functionallys
//This needs to have the log in and sign up button to work properly
const signupBtn = document.getElementById("signup");
const loginBtn = document.getElementById("login");

signupBtn.addEventListener("click", function () {
  window.location.href = "../Sign-up/signup.html";
});

loginBtn.addEventListener("click", function () {
  window.location.href = "../Login/login.html";
});

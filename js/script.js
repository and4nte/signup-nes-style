import { checkEmail, checkUsername, checkPassword } from "./validator.js";

const $balloon = document.querySelector(".nes-balloon p");
let textCopied = '';
let strIdx = 0;
let typeInterval = 0;

const typeOnBalloon = () => {
  if (textCopied === '') {
    clearInterval(typeInterval);
    return;
  }

  $balloon.textContent += textCopied[strIdx++];
  if (strIdx === textCopied.length) {
    clearInterval(typeInterval);
  }
};

const startTyping = (text) => {
  // init
  document.querySelector('.shaking')?.classList.remove('shaking');
  clearInterval(typeInterval);
  $balloon.textContent = '';
  textCopied = text;
  strIdx = 0;

  document.querySelector('#signup_form').classList.add('shaking');
  typeInterval = setInterval(typeOnBalloon, 50);
};

const validateForm = (e) => {
  const $frm = document.querySelector('#signup_form');

  // email
  const email = $frm.querySelector('#email_field').value;
  const emailChecked = checkEmail(email);
  if (!emailChecked.result) {
    startTyping(emailChecked.error);
    e.preventDefault();
    return false;
  }

  // username
  const username = $frm.querySelector('#name_field').value;
  const usernameChecked = checkUsername(username);
  if (!usernameChecked.result) {
    startTyping(usernameChecked.error);
    e.preventDefault();
    return false;
  }

  // password
  const password = $frm.querySelector('#pw_field').value;
  const passwordChecked = checkPassword(password);
  if (!passwordChecked.result) {
    startTyping(passwordChecked.error);
    e.preventDefault();
    return false;
  }

  // check password
  const isPasswordCorrect = (password === $frm.querySelector('#cfpw_field').value);
  if (!isPasswordCorrect) {
    startTyping('Please, make sure your passwords match.');
    e.preventDefault();
    return false;
  }

  // check acception
  const isCheckedAcception = $frm.querySelector('#acception_field').checked;
  if (!isCheckedAcception) {
    startTyping('You must read and accept the Terms of Use & Privacy Policy...');
    e.preventDefault();
    return false;
  }

  return true;
};

// remove class 'shaking' when the animation is finished
document.querySelector('#signup_form').addEventListener('animationend', (e) => {
  e.target.classList.remove('shaking');
});

// add submit eventlistener
const $frm = document.querySelector('#signup_form');
$frm.addEventListener('submit', validateForm);

startTyping('Create an account!');



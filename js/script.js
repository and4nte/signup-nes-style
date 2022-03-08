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

const startTyping = (text, shakeAnimation=false) => {
  // init
  document.querySelector('.shaking')?.classList.remove('shaking');
  clearInterval(typeInterval);
  $balloon.textContent = '';
  textCopied = text;
  strIdx = 0;

  shakeAnimation && document.querySelector('#signup_form').classList.add('shaking');
  typeInterval = setInterval(typeOnBalloon, 50);
};

const validateForm = (e) => {
  const $frm = document.querySelector('#signup_form');
  $frm.querySelectorAll('.is-error').forEach(($input) => {
    $input.classList.remove('is-error');
  });

  // email
  const $inputEmail = $frm.querySelector('#email_field');
  const emailChecked = checkEmail($inputEmail.value);
  if (!emailChecked.result) {
    $inputEmail.classList.add('is-error');
    startTyping(emailChecked.error, true);
    e.preventDefault();
    return false;
  }

  // username
  const $inputUsername = $frm.querySelector('#name_field');
  const usernameChecked = checkUsername($inputUsername.value);
  if (!usernameChecked.result) {
    $inputUsername.classList.add('is-error');
    startTyping(usernameChecked.error, true);
    e.preventDefault();
    return false;
  }

  // password
  const $inputPassword = $frm.querySelector('#pw_field');
  const passwordChecked = checkPassword($inputPassword.value);
  if (!passwordChecked.result) {
    $inputPassword.classList.add('is-error');
    startTyping(passwordChecked.error, true);
    e.preventDefault();
    return false;
  }

  // check password
  const $inputPasswordMatch = $frm.querySelector('#cfpw_field');
  if ( !($inputPassword.value === $inputPasswordMatch.value) ) {
    $inputPasswordMatch.classList.add('is-error');
    startTyping('Please, make sure your passwords match.', true);
    e.preventDefault();
    return false;
  }

  // check acceptance
  const $inputAcceptance = $frm.querySelector('#acceptance_field');
  if (!$inputAcceptance.checked) {
    startTyping('You must read and accept the Terms of Use & Privacy Policy...', true);
    e.preventDefault();
    return false;
  }

  return true;
};

// remove class 'shaking' when the animation is finished
document.querySelector('#signup_form').addEventListener('animationend', (e) => {
  e.target.classList.remove('shaking');
});

// add submit eventlistener on submit button
const $frm = document.querySelector('#signup_form');
$frm.addEventListener('submit', validateForm);

startTyping('Create an account!');

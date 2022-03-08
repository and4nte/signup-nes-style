export const checkEmail = (emailStr) => {
  const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const result = emailReg.test(emailStr);
  const error = result ? undefined : 'Please, enter a valid email.';
  
  return {
    result,
    error,
  };
};

export const checkUsername = (usernameStr) => {
  let result = false;
  let error = undefined;

  if (usernameStr === '') {
    error = 'Please, enter your username.';
  } else if ( !(/^[A-Za-z0-9]/g.test(usernameStr[0])) ) {
    error = 'Username must begin with alphanumeric.';
  } else if ( !(usernameStr.length > 3 && usernameStr.length < 17) ) {
    error = 'Username has to be 4-16 characters long.';
  } else if ( !(/^[A-Za-z0-9]\w{3,15}$/g.test(usernameStr)) ) {
    error = 'Usernames can contain alphanumeric and underscore(_).';
  } else {
    result = true;
  }

  return {
    result,
    error,
  }
};

export const checkPassword = (pwStr) => {
  const pwReg = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
  let result = false;
  let error = undefined;

  if ( !(pwStr.length > 7 && pwStr.length < 17) ) {
    error = 'Password must be 8-16 characters.';
  } else if ( !(pwReg.test(pwStr)) ) {
    error = 'Password must contain at least one number, lower/uppercase letters and special characters.';
  } else {
    result = true;
  }

  return {
    result,
    error,
  }
};
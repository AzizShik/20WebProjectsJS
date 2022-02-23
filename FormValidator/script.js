const form = document.getElementById('form'),
  formControls = document.querySelectorAll('.form__control'),
  username = document.getElementById('username'),
  email = document.getElementById('email'),
  password = document.getElementById('password'),
  password2 = document.getElementById('password2');


function showError(input, message) {
  const formControl = input.parentNode;
  formControl.classList.add('error');
  const smallEl = formControl.querySelector('small');
  smallEl.textContent = message;
}

function showSuccess(input) {
  const formControl = input.parentNode;
  formControl.classList.add('success');
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequired(inputArr) {
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required `);
    }
  });
}

function checkEmail(email) {
  if (email.value === '') {
    showError(email, 'Email is required');
  } else if (!(/\S+@\S+\.\S+/.test(email.value))) {
    showError(email, 'Email is not valid');
  } else {
    showSuccess(email);
  }
}

function checkLength(input, min, max) {
  if(input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters `);
  } else if(input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters `);
  } else {
    showSuccess(input);
  }
}

function checkPassword(input1, input2) {
  if (input1.value !== input2.value) {
    showError(password2, 'Passwords do not match');
  } else {
    showSuccess(password2);
  }
}


form.addEventListener('submit', (e) => {
  e.preventDefault();
  formControls.forEach(item => {
    item.classList.remove('error');
    item.classList.remove('success');
  });

  checkRequired([username, email, password, password2]);
  checkEmail(email);
  checkPassword(password, password2);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  
});
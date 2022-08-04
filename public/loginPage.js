'use strict';

let userForm = new UserForm();
userForm.loginFormCallback = data => {
  ApiConnector.login(data, response => {
    if (response.success) {
      location.reload();
    } else {
      userForm.setLoginErrorMessage('Ошибка! Попробуйте заново ввести логин и пароль');
    }
  });
};

userForm.registerFormCallback = data => {
  ApiConnector.register(data, response => {
    if (response.success) {
      location.reload();
    } else {
      userForm.setRegisterErrorMessage('Ошибка! Неверно указаны логин или пароль. Пожалуйста, проверьте правильность введенных данных.');
    }
  });
};
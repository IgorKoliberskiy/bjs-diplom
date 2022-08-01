'use strict';

let userForm = new UserForm();
userForm.loginFormCallback = data => {
  ApiConnector.login(data, response => {
    if (response.success === false) {
      return userForm.setLoginErrorMessage('Ошибка! Попробуйте заново ввести логин и пароль');
    } else {
      return userForm.loginFormAction(location.reload());
    }
  });
};

userForm.registerFormCallback = data => {
  ApiConnector.login(data, response => {
    if (response.success === false) {
      return userForm.setRegisterErrorMessage('Ошибка! Неверно указаны логин или пароль. Пожалуйста, проверьте правильность введенных данных.');
    } else {
      return userForm.registerFormAction(location.reload());
    }
  });
};
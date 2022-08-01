'use strict';

// выход из личного кабинета
const logoutButton = new LogoutButton();
logoutButton.action = function() {
  ApiConnector.logout (response => {
    if (response.success) {
      location.reload();
    }
  });
}

ApiConnector.current (response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

const ratesBoard = new RatesBoard();
function getCurrentRatesBoard() {
  ApiConnector.getStocks(response => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
  return;
}

getCurrentRatesBoard();
setInterval(getCurrentRatesBoard, 60000);

// Операции с деньгами

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Успешное пополнение баланса');
    } else {
      moneyManager.setMessage(false, `Баланс не пополнен: ${response.error}. Попробуйте позже`);
    }
  });
}

moneyManager.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Успешное конвертирование');
    } else {
      moneyManager.setMessage(false, `Невозможно конвертировать: ${response.error}. Попробуйте позже`);
    }
  });
}

moneyManager.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Средства успешно переведены');
    } else {
      moneyManager.setMessage(false, `Невозможно перевести средства: ${response.error}. Попробуйте позже`);
    }
  });
}

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

favoritesWidget.addUserCallback = function (data) {
  ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(true, 'Пользователь успешно добавлен в Адресную книгу');
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
}

favoritesWidget.removeUserCallback = function (data) {
  ApiConnector.removeUserFromFavorites(data, response => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(true, 'Пользователь успешно удален из Адресной книги');
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
}
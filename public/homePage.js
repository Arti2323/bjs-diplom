'use strict';

const logoutButton = new LogoutButton();

logoutButton.action = () => {ApiConnector.logout((response) => {
    if(response.success) {
        location.reload();
        return
    } else {
        console.log("Выход не выполнен!"):
    }
  } )
};


ApiConnector.current((response) => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
    }
})

const ratesBoard = new RatesBoard();

function currencyRates (currency) {
    ApiConnector.getStocks((response) => {
        if(response.success) {
            currency.clearTable();
            currency.fillTable(response.data);
        }
    });
}

currencyRates(currency);
setInterval(currencyRates, 60000, currency);


const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Баланс успешно пополнен на" );
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
};

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Конвертирование выполнено успешно" );
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
};

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Перевод выполнен успешно" );
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
    
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if(response.success){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data)
    } /*else {*/
}
);

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if(response.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data)
            favoritesWidget.setMessage(response.success, "добавлении пользователя в окне отображения сообщения выполнен успешно" );
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        } 
    })
};

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
      if(response.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data)
            favoritesWidget.setMessage(response.success, "удаление пользователя выполнен успешно" );
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    });
};

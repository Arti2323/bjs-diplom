'use strict';

const logoutButton = new LogoutButton();

logoutButton.action = () => {ApiConnector.logout((response) => {
    if(response.success) {
        location.reload();
        return
    } else {
        throw "Выход не выполнен!"
    }
  } )
};


ApiConnector.current((response) => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
    }
})

const ratesBoard = new RatesBoard();

function refreshStockRates () {
    ApiConnector.getStocks((response) => {
        if(response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data)  
        } else { 
            console.log(' не приходит курс валют !!!')}
    })
};

x();
setTimeout(x, 60000);

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

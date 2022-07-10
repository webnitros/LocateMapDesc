## Плагины

По умолчанию в систему добавлено два плагина

##### LocateMap 
Основной плагин для регистрации скриптов


##### locatemapAddressMiniShop 
Плагин записывает адрес после сохранения и срабатывает на LocateMapAfterSaveAddress.

_Логику работы можно посмотреть на событии [LocateMapAfterSaveAddress](#locatemapaftersaveaddress)_

И после каждого отправления заказа заново вводит адрес в сессию срабатывая на событие minishop2 отчистка заказа **msOnEmptyOrder**

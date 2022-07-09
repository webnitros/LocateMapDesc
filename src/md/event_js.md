# События js

После некоторый действий срабатывают js события

* **locatemap_get_address** - срабатывает после получения адреса из геокодер
* **locatemap_save_address** - срабатывает после сохранения адреса
* **locatemap_popap_show** - после открытия модульнего окна
* **locatemap_popap_hide** - после закрытия модульнего окна

#### locatemap_get_address

Срабатывает после получения адреса из геокодер

#### locatemap_save_address

Срабатывает после сохранения адреса

#### locatemap_popap_show

После **закрытия** модельного окна

#### locatemap_popap_hide

После **закрытия** модельного окна


#### Пример JS

****
```js
// пример подписки на js события
$(document).on('locatemap_save_address', function (e, res) {
    if (res.success) {
        console.log(res.data) // тут будет адрес пользователя который сохранили в сессии
    }
})
```

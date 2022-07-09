## Быстрый старт

Для быстрого старта нужно установить компонент и выполнить 3 шага

##### 1 - Получить токена для DaData

С помощью инструкции [получить токен](#functions-token_dadata)

##### 2 - Записать токен в настройках

Зайти в системные настройки modx, выбрать namespace locatemap и в настройке с ключем **locatemap_token_dadata** указать токен из личного кабинета

 <a href="images/manual.png" data-fancybox="all">
    <img src="images/manual.png" alt="" style="margin-bottom:30px;max-width: 250px;">
</a>

##### 3 Добавить сниппет на сайт

В любом месте сайт вызовите сниппет для запуска модельного окна

```html
[[!LocateMap]]

<!--Выведет-->
<ul class="navbar-nav mr-auto  ">
    <li class="nav-item dropdown">
        <a class="dropdown-item locatemap_my_address locatemapBtnModal " href="#">
            <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.20525 0C2.33504 0 0 2.33538 0 5.20567C0 7.96856 4.72282 14.4237 4.92391 14.697L5.11159 14.9524C5.13353 14.9824 5.16848 15 5.20525 15C5.24259 15 5.27731 14.9824 5.29949 14.9524L5.48705 14.697C5.68826 14.4237 10.411 7.96856 10.411 5.20567C10.411 2.33538 8.07554 0 5.20525 0ZM5.20525 3.34101C6.23366 3.34101 7.06991 4.1773 7.06991 5.20567C7.06991 6.2335 6.23362 7.07033 5.20525 7.07033C4.17745 7.07033 3.34059 6.2335 3.34059 5.20567C3.34059 4.1773 4.17742 3.34101 5.20525 3.34101Z"
                      fill="white"/>
            </svg>
            <span class="locatemap_my_address_text" title="{$name}">{if $known}{$name}{else}Укажите адрес доставки{/if}</span>
        </a>
    </li>
</ul>

```

Или можно использовать класс для запуска

```html
<button class="locatemapBtnModal">Показать карту</button>
```

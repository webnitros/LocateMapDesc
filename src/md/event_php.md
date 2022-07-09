# События PHP

События работают через плагины modx и на них можно подписываться

##### LocateMapBeforeSaveAddress

Событие срабатывает **перед** сохранением адреса

```php
<?php

// Event:LocateMapBeforeSaveAddress
// Комментарий: Заполняем форму для заказа miniShop2
/** @var modX $modx */
/* @var array $scriptProperties */
/* @var \LocateMap\Address $address */

// Получаем улицу
$street = $address->street()

// и записываем новое название
$address->setName('Тут новое название '.$street)

```

##### LocateMapAfterSaveAddress

После сохранения адрес можно записать наш новый адрес в заказ minishop

```php
<?php

// Event:LocateMapAfterSaveAddress
// Комментарий: Заполняем форму для заказа miniShop2
/** @var modX $modx */
/* @var array $scriptProperties */
/* @var \LocateMap\Address $address */

/* @var miniShop2 $miniShop2 */
$miniShop2 = $modx->getService('miniShop2');
if ($miniShop2->loadServices()) {

    if ($index = $address->get('postal_code')) {
        $miniShop2->order->add('index', $index);
    }

    if ($region = $address->get('region')) {
        $miniShop2->order->add('region', $region);
    }

    if ($city = $address->get('city')) {
        $miniShop2->order->add('city', $city);
    }

    if ($house = $address->get('house')) {
        $miniShop2->order->add('building', $house);
    }

    if ($street = $address->get('street')) {
        $miniShop2->order->add('street', $street);
    }
}

```

##### LocateMapBeforeGeoCoder

Срабатывает **перед** получением адреса 

```php

/* @var string $service  Гео кодер через который будет производиться поиск адреса*/
/* @var string $lat  широта */
/* @var string $lon  долгота */

// Подменить геокодр по умолчанию на новый
// В системе доступны 3 кодера Nominatim DaData Yandex
$this->modx->event->returnedValues['service'] = 'Yandex';

```

##### LocateMapAfterGeoCoder

Срабатывает **после** получением адреса

```php

/* @var LocateMap\Address $address */

// Получаем улицу
$street = $address->street()

// и записываем новое название
$address->setName('Тут новое название '.$street)

// Пользователю вернется новое название, котором затем можно сохранить в сессию
```

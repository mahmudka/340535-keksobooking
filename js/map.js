// map.js

'use strict';
// Объявление констант
var MARK_WIDTH = 32;
var MARK_HEIGHT = 65;

// Массивы с данными
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var hotelfeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Объявление переменных
var map = document.querySelector('.map');
// map.classList.remove('map--faded');
var mapPin = document.querySelector('.map__pin');
var mapPinMain = document.querySelector('.map__pin--main');
var form = document.querySelector('form');


// Функция поиска случайного числа в диапазоне от min до max
var getRandomValues = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Функция выбора количества features
var getFeatures = function () {
  var features = [];
  var featuresCount = Math.floor(Math.random() * (hotelfeatures.length));
  for (var i = 0; i < featuresCount; i++) {
    features.push(hotelfeatures[i]);
  }
  return features;
};

// Создание и заполнение массива данных букинга
var bookingDetails = [];

for (var i = 0; i < titles.length; i++) {
  var bookingLocation = {
    'x': getRandomValues(300, 900) - MARK_WIDTH,
    'y': getRandomValues(100, 500) - MARK_HEIGHT
  };
  bookingDetails.push({
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png'
    },
    'offer': {
      'title': titles[i],
      'address': bookingLocation.x + ',' + bookingLocation.y,
      'price': getRandomValues(1000, 1000000),
      'type': types[getRandomValues(0, types.length)],
      'rooms': getRandomValues(1, 5),
      'guests': getRandomValues(1, 50),
      'checkin': checkins[getRandomValues(0, checkins.length)],
      'checkout': checkouts[getRandomValues(0, checkouts.length)],
      'features': getFeatures(),
      'description': '',
      'photos': []
    },

    'location': {
      'x': bookingLocation.x,
      'y': bookingLocation.y
    }
  });
}

// Создание фрагмента для вставки
var fragment = document.createDocumentFragment();

// Функция для отрисовки маркеров
var renderMapElement = function (mapDetail) {
  var mapElement = mapPin.cloneNode(true);

  mapPin.style.left = mapDetail.location.x + 'px';
  mapPin.style.top = mapDetail.location.y + 'px';
  document.querySelector('.map__pin img').src = mapDetail.author.avatar;
  mapPin.appendChild(mapElement);
  return mapElement;
};

// Вывод и отрисовка маркеров
// for (var i = 0; i < titles.length; i++) {
//   fragment.appendChild(renderMapElement(bookingDetails[i]));
// }
// mapPin.appendChild(fragment);

// Объявление переменных для аноса
var mapCard = document.querySelector('template').content.querySelector('article.map__card');
var mapFilter = document.querySelector('.map__filters-container');

// Замена английских названий на русские
var getRussianName = function (russianName) {
  switch (russianName) {
    case 'flat':
      russianName = 'Квартира';
      break;
    case 'bungalo':
      russianName = 'Бунгало';
      break;
    default:
      russianName = 'Дом';
      break;
  }
  return russianName;
};

// Функция вызова features
var getFeaturesImages = function (bookingDetail) {
  var textFeatures = [];
  for (var j = 0; j < bookingDetail.length; j++) {
    textFeatures[j] = '<li class="feature feature--' + bookingDetail[j] + '"></li>';
  }
  return textFeatures;
};

// Заполение и отрисовка анонса
var renderMapCard = function (bookingDetail) {
  var mapCardElement = mapCard.cloneNode(true);

  mapCardElement.querySelector('h3').textContent = bookingDetail.offer.title;
  mapCardElement.querySelector('p small').textContent = bookingDetail.offer.address;
  mapCardElement.querySelector('.popup__price').textContent = bookingDetail.offer.price + ' &#x20bd;/ночь';
  mapCardElement.querySelector('h4').textContent = getRussianName(bookingDetail.offer.type);
  mapCardElement.querySelector('h4 + p').textContent = bookingDetail.offer.rooms + ' для ' + bookingDetail.offer.guests + ' гостей';
  mapCardElement.querySelector('p:nth-child(4)').textContent = 'Заезд после ' + bookingDetail.offer.checkin + ', выезд до ' + bookingDetail.offer.checkout;
  mapCardElement.querySelector('.popup__features').innerHTML = getFeaturesImages(bookingDetail.offer.features).join('');
  mapCardElement.querySelector('p:nth-child(5)').textContent = bookingDetail.offer.description;
  mapCardElement.querySelector('img').src = bookingDetail.author.avatar;
  // mapCard.appendChild(mapCardElement);
  return mapCardElement;
};

// map.insertBefore(renderMapCard(bookingDetails[5]), mapFilter);
// mapCard.appendChild(fragment);

// Снимаем затемнение
mapPinMain.addEventListener('mouseup', function () {

  map.classList.remove('map--faded');
  form.classList.remove('notice__form--disabled');
  for (i = 0; i < titles.length; i++) {
    fragment.appendChild(renderMapElement(bookingDetails[i]));
  }
  mapPin.appendChild(fragment);
  map.insertBefore(renderMapCard(bookingDetails[5]), mapFilter);
  mapCard.appendChild(fragment);
});



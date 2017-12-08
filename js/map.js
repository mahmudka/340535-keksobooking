// map.js

'use strict';
// Объявление констант
var MARK_WIDTH = 32;
var MARK_HEIGHT = 65;
var ESC_KEYCODE = 27;

// Массивы с данными
var titles = ['Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];
var types = ['flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var hotelfeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Объявление переменных
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPin = document.querySelector('.map__pin');
var mapPinMain = document.querySelector('.map__pin--main');
var activeELement = null;
var form = document.querySelector('form');
var fieldSet = document.querySelectorAll('fieldset');
var formSubmit = document.querySelector('.form__submit');
formSubmit.disabled = true;
for (var n = 0; n < fieldSet.length; n++) {
  fieldSet[n].disabled = true;
}


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


// Функция для отрисовки маркеров
var renderMapElement = function (mapDetail) {
  var mapElement = mapPin.cloneNode(true);
  mapElement.style.left = mapDetail.location.x + 'px';
  mapElement.style.top = mapDetail.location.y + 'px';
  mapElement.querySelector('.map__pin img').src = mapDetail.author.avatar;
  mapElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (activeELement) {
      activeELement.classList.remove('map__pin--active');
    }
    activeELement = mapElement;
    mapElement.classList.add('map__pin--active');
    map.insertBefore(renderMapCard(mapDetail), mapFilter);
  });
  return mapElement;
};


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
var activeMapCard = null;
var renderMapCard = function (bookingDetail) {
  var mapCardElement = null;
  if (activeMapCard) {
    mapCardElement = activeMapCard;
    mapCardElement.classList.remove('hidden');
  } else {
    mapCardElement = mapCard.cloneNode(true);
  }
  var mapCardP = mapCardElement.querySelectorAll('p');

  mapCardElement.querySelector('h3').textContent = bookingDetail.offer.title;
  mapCardP[0].textContent = bookingDetail.offer.address;
  mapCardElement.querySelector('.popup__price').innerHTML = bookingDetail.offer.price + ' &#x20bd;/ночь';
  mapCardElement.querySelector('h4').textContent = getRussianName(bookingDetail.offer.type);
  mapCardP[2].textContent = bookingDetail.offer.rooms + ' для ' + bookingDetail.offer.guests + ' гостей';
  mapCardP[3].textContent = 'Заезд после ' + bookingDetail.offer.checkin + ', выезд до ' + bookingDetail.offer.checkout;
  mapCardElement.querySelector('.popup__features').innerHTML = getFeaturesImages(bookingDetail.offer.features).join('');
  mapCardP[4].textContent = bookingDetail.offer.description;
  mapCardElement.querySelector('img').src = bookingDetail.author.avatar;

  mapCardElement.querySelector('.popup__close').addEventListener('click', function () {
    mapCardElement.classList.add('hidden');
    activeELement.classList.remove('map__pin--active');
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      mapCardElement.classList.add('hidden');
      activeELement.classList.remove('map__pin--active');
    }
  });

  activeMapCard = mapCardElement;

  return mapCardElement;
};


// Снимаем затемнение
var isOpen = false;
mapPinMain.addEventListener('mouseup', function () {
  if (isOpen) {
    return;
  }
  map.classList.remove('map--faded');
  form.classList.remove('notice__form--disabled');
  for (i = 0; i < titles.length; i++) {
    mapPins.appendChild(renderMapElement(bookingDetails[i]));
  }
  // map.insertBefore(renderMapCard(bookingDetails[0]), mapFilter);
  for (n = 0; n < fieldSet.length; n++) {
    fieldSet[n].disabled = false;
  }
  formSubmit.disabled = false;
  isOpen = true;
});

// Раздел#4  задание #2
// Валидация отправки формы
var noticeForm = document.querySelector('.notice__form');
var timeIn = noticeForm.querySelector('#timein');
var timeOut = noticeForm.querySelector('#timeout');

// Синхронизация «времени заезда» и «времени выезда»
timeIn.addEventListener('change', function () {

  if (timeIn.value) {
    timeOut.value = timeIn.value;
  }
});
timeOut.addEventListener('change', function () {
  if (timeOut.value) {
    timeIn.value = timeOut.value;
  }
});

// Синхронизация типа жилья с минимальной ценой
var type = noticeForm.querySelector('#type');
var typeOptions = type.querySelectorAll('option');
var price = noticeForm.querySelector('#price');
var typePrices = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
price.min = typePrices[type.value];
type.addEventListener('change', function () {
  var typeValue = type.value;
  for (i = 0; i < typeOptions.length; i++) {
    price.min = typePrices[typeValue];
  }
});

// Синхронизация количества гостей с количеством комнат
var rooms = noticeForm.querySelector('#room_number');
var capacity = noticeForm.querySelector('#capacity');
capacity.value = rooms.value;
rooms.addEventListener('change', function () {
  if (rooms.value) {
    capacity.value = rooms.value;
  }
  if (rooms.value === '100') {
    capacity.value = 0;
  }
});
capacity.addEventListener('change', function () {
  if (capacity.value > rooms.value) {
    capacity.setCustomValidity('Количество комнат не должно превышать количество гостей');
    capacity.invalid = true;
  } else {
    capacity.setCustomValidity('');
    capacity.invalid = false;
  }
});

// Подсветка невалидных полей красным
var inputForm = noticeForm.querySelectorAll('input');
for (i = 0; i < inputForm.length; i++) {
  inputForm[i].addEventListener('invalid', function (evt) {
    evt.target.style = 'border-color: red';
  });
}

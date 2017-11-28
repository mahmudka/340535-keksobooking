// map.js

'use strict';

var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var hotelfeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


var getFeatures = function () {
  var features = [];
  var featuresCount = Math.floor(Math.random() * (hotelfeatures.length));
  for (var i = 0; i < featuresCount; i++) {
    features.push(hotelfeatures[i]);
  }
  return features;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPin = document.querySelector('.map__pin');


var bookingDetails = [];

for (i = 0; i < titles.length; i++) {
  var bookingLocation = {
    'x': Math.floor(Math.random() * (900 - 300 + 1)) + 300,
    'y': Math.floor(Math.random() * (500 - 100 + 1)) + 100};
  bookingDetails.push({
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png'
    },
    'offer': {
      'title': titles[i],
      'address': bookingLocation.x + ',' + bookingLocation.y,
      'price': Math.floor(Math.random() * (1000000 - 1000 + 1)) + 1000,
      'type': types[Math.floor(Math.random() * (types.length))],
      'rooms': Math.floor(Math.random()) * 5 + 1,
      'guests': Math.floor(Math.random()) * 1000 + 1,
      'checkin': checkins[Math.floor(Math.random() * (checkins.length))],
      'checkout': checkouts[Math.floor(Math.random() * (checkouts.length))],
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

var fragment = document.createDocumentFragment();

var renderMapElement = function (mapDetail) {
  var mapElement = mapPin.cloneNode(true);

  mapPin.style.left = mapDetail.location.x + 'px';
  mapPin.style.top = mapDetail.location.y + 'px';
  document.querySelector('.map__pin img').src = mapDetail.author.avatar;
  mapPin.appendChild(mapElement);
  return mapElement;
};

for (var i = 0; i < titles.length; i++) {
  fragment.appendChild(renderMapElement(bookingDetails[i]));
  // fragment.appendChild(renderMapCard(bookingDetails[i]));
}
mapPin.appendChild(fragment);

// Пятый пункт
var mapCard = document.querySelector('template').content.querySelector('article.map__card');
var mapFilter = document.querySelector('.map__filters-container');
var renderMapCard = function (bookingDetail) {
  var mapCardElement = mapCard.cloneNode(true);

  mapCard.querySelector('h3').textContent = bookingDetail.offer.title;
  mapCard.querySelector('small').textContent = bookingDetail.offer.address;
  mapCard.querySelector('.popup__price').textContent = bookingDetail.offer.price + '&#x20bd;/ночь';
  mapCard.querySelector('h4').textContent = bookingDetail.offer.type;
  mapCard.querySelector('h4 + p').textContent = bookingDetail.offer.rooms + ' для ' + bookingDetail.offer.guests + ' гостей';
  mapCard.querySelector('p:nth-child(4)').textContent = 'Заезд после ' + bookingDetail.offer.checkin + ', выезд до ' + bookingDetail.offer.checkout;
  mapCard.querySelector('.popup__features').textContent = bookingDetail.offer.features;
  mapCard.querySelector('p:nth-child(5)').textContent = bookingDetail.offer.description;
  mapCard.querySelector('img').src = bookingDetail.author.avatar;
  mapCard.appendChild(mapCardElement);
  return mapCardElement;
};

map.insertBefore(renderMapCard(bookingDetails[0]), mapFilter);
mapCard.appendChild(fragment);

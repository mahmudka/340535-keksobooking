// map.js

'use strict';

var avatarImages = 'img/avatars/user{{0 + Math.floor(Math.random()) * 8 + 1}}.png';
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде' ];
var adresses = '{{location.x}}, {{location.y}}';
var prices = Math.floor(Math.random() * (1000000 - 1000 + 1)) + 1000;
var types = ['flat', 'house', 'bungalo'];
var hotelRooms = Math.floor(Math.random()) * 5 + 1;
var checkins = ['12:00', '13:00', '14:00'];
var hotelguests = Math.floor(Math.random()) * 1000 + 1;
var checkouts = ['12:00', '13:00', '14:00'];
var hotelfutures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var x = Math.floor(Math.random() * (900 - 300 + 1)) + 300;
var y = Math.floor(Math.random() * (500 - 100 + 1)) + 100;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPin = document.querySelector('.map__pin');


var bookingDetails = [];

for (i = 0; i < titles.length; i++) {
  bookingDetails.push({
    'author': {
      'avatar': avatarImages[i]
    },
    'offer': {
      'title': titles[Math.floor(Math.random() * (titles.length))],
      'address': adresses[i],
      'price': prices[i],
      'type': types[Math.floor(Math.random() * (titles.length))],
      'rooms': hotelRooms[i],
      'guests': hotelguests[i],
      'checkin': checkins[Math.floor(Math.random() * (titles.length))],
      'checkout': checkouts[i],
      'features': hotelfutures[i],
      'description': '',
      'photos': []
    },

    'location': {
      'x': x[i],
      'y': y[i]
    }
  });
}

var fragment = document.createDocumentFragment();


// for (var i = 0; i < titles.length; i++) {
//   var mapElement = mapPin.cloneNode(true);
//
//   mapPin.style.left = bookingDetails.location.x;
//   mapPin.style.top = bookingDetails.location.y;
//   mapPin.images.src = bookingDetails.avatar;
//   mapPin.appendChild(mapElement);
//
// }

var renderBooking = function () {
  var mapElement = mapPin.cloneNode(true);

  mapPin.style.left = bookingDetails.location.x;
  mapPin.style.top = bookingDetails.location.y;
  mapPin.images.src = bookingDetails.avatar;
  mapPin.appendChild(mapElement);
  return mapElement;
};

fragment = document.createDocumentFragment();
for (var i = 0; i < titles.length; i++) {
  fragment.appendChild(renderBooking(bookingDetails[i]));
}
mapPin.appendChild(fragment);

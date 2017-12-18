// data.js

'use strict';

window.data = (function () {
  // Объявление констант
  var MARK_WIDTH = 32;
  var MARK_HEIGHT = 65;
  window.ESC_KEYCODE = 27;

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

  var getRandomValues = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getFeatures = function () {
    var features = [];
    var featuresCount = Math.floor(Math.random() * (hotelfeatures.length));
    for (var i = 0; i < featuresCount; i++) {
      features.push(hotelfeatures[i]);
    }
    return features;
  };

  window.bookingDetails = [];

  for (var i = 0; i < titles.length; i++) {
    var bookingLocation = {
      'x': getRandomValues(300, 900) - MARK_WIDTH,
      'y': getRandomValues(100, 500) - MARK_HEIGHT
    };
    window.bookingDetails.push({
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
})();

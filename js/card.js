// card.js

'use strict';

(function () {
  var mapCard = document.querySelector('template').content.querySelector('article.map__card');

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

  var getFeaturesImages = function (bookingDetail) {
    var textFeatures = [];
    for (var j = 0; j < bookingDetail.length; j++) {
      textFeatures[j] = '<li class="feature feature--' + bookingDetail[j] + '"></li>';
    }
    return textFeatures;
  };

  var activeMapCard = null;
  window.renderMapCard = function (bookingDetail) {
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
      mapCardElement.classList.remove('map__pin--active');
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        mapCardElement.classList.add('hidden');
        mapCardElement.classList.remove('map__pin--active');
      }
    });

    activeMapCard = mapCardElement;

    return mapCardElement;
  };
})();

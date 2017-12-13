// pin.js

'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pin');
  var mapFilter = document.querySelector('.map__filters-container');
  var activeELement = null;
  window.renderMapElement = function (mapDetail) {
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
      map.insertBefore(window.renderMapCard(mapDetail), mapFilter);
    });
    return mapElement;
  };
})();

// map.js

'use strict';


var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPinMain = document.querySelector('.map__pin--main');


var form = document.querySelector('form');
var fieldSet = document.querySelectorAll('fieldset');
var formSubmit = document.querySelector('.form__submit');
formSubmit.disabled = true;
for (var n = 0; n < fieldSet.length; n++) {
  fieldSet[n].disabled = true;
}

var isOpen = false;
mapPinMain.addEventListener('mouseup', function () {
  if (isOpen) {
    return;
  }
  map.classList.remove('map--faded');
  form.classList.remove('notice__form--disabled');
  for (var i = 0; i < 8; i++) {
    mapPins.appendChild(window.renderMapElement(window.bookingDetails[i]));
  }
  for (n = 0; n < fieldSet.length; n++) {
    fieldSet[n].disabled = false;
  }
  formSubmit.disabled = false;
  isOpen = true;
});


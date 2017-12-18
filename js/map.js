// map.js

'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  // var form = document.querySelector('form');
  var fieldSet = document.querySelectorAll('fieldset');
  var formSubmit = document.querySelector('.form__submit');
  var noticeForm = document.querySelector('.notice__form');
  formSubmit.disabled = true;
  for (var n = 0; n < fieldSet.length; n++) {
    fieldSet[n].disabled = true;
  }
  var address = document.querySelector('#address');
  var body = document.querySelector('body');
  var limitYTop = 100;
  var limitYBottom = 500;
  var limitXLeft = body.offsetLeft;
  var limitXRight = body.offsetLeft + body.offsetWidth;

  var isOpen = false;
  mapPinMain.addEventListener('mouseup', function () {
    if (isOpen) {
      return;
    }
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    for (var i = 0; i < 8; i++) {
      mapPins.appendChild(window.showCard(window.bookingDetails[i]));
    }
    for (n = 0; n < fieldSet.length; n++) {
      fieldSet[n].disabled = false;
    }
    formSubmit.disabled = false;
    isOpen = true;
  });

  mapPinMain.addEventListener('mousedown', function (evt) {
    event.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinPointY = mapPinMain.offsetTop - shift.y;
      var pinPointX = mapPinMain.offsetLeft - shift.x;

      if (pinPointY > limitYBottom) {
        pinPointY = limitYBottom;
      } else if (pinPointY < limitYTop) {
        pinPointY = limitYTop;
      } else {
        pinPointY = mapPinMain.offsetTop - shift.y;
      }

      if (pinPointX > limitXRight) {
        pinPointX = limitXRight;
      } else if (pinPointX < limitXLeft) {
        pinPointX = limitXLeft;
      } else {
        pinPointX = mapPinMain.offsetLeft - shift.x;
      }

      mapPinMain.style.top = pinPointY + 'px';
      mapPinMain.style.left = pinPointX + 'px';

      address.value = pinPointX + ', ' + pinPointY;
    };

    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();



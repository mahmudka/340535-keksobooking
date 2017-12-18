// form.js

'use strict';

(function () {
  var titleForm = document.querySelector('#title');
  var addressForm = document.querySelector('#address');
  var noticeForm = document.querySelector('.notice__form');
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');
  var type = noticeForm.querySelector('#type');
  var typeOptions = type.querySelectorAll('option');
  var price = noticeForm.querySelector('#price');
  var typePrices = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var rooms = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');

  addressForm.required = true;
  addressForm.readOnly = true;
  titleForm.required = true;
  price.required = true;

  function syncTime(element, value) {
    element.value = value;
  }

  function syncType(element, value) {
    element.setAttribute('min', value);
  }

  function timeInChange(evt) {
    window.syncronizeFields.syncValues(timeOut, evt.target.value, syncTime);
  }

  function timeOutChange(evt) {
    window.syncronizeFields.syncValues(timeIn, evt.target.value, syncTime);
  }

  function typePricesChange(evt) {
    window.syncronizeFields.syncValues(price, typePrices[evt.target.value], syncType);
  }

  timeIn.addEventListener('change', timeInChange);
  timeOut.addEventListener('change', timeOutChange);
  type.addEventListener('change', typePricesChange);

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

  price.min = typePrices[type.value];
  type.addEventListener('change', function () {
    var typeValue = type.value;
    for (var i = 0; i < typeOptions.length; i++) {
      price.min = typePrices[typeValue];
      price.placeholder = price.min;

    }
  });

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

  var inputForm = noticeForm.querySelectorAll('input');
  for (var i = 0; i < inputForm.length; i++) {
    inputForm[i].addEventListener('invalid', function (evt) {
      evt.target.style = 'border-color: red';
    });
  }
  noticeForm.addEventListener('submit', function (evt) {
    var formData = new FormData(noticeForm);
    window.backend.save(formData);
    evt.preventDefault();
  });

})();

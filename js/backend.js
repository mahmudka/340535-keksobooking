
'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var URL = 'https://1510.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;

          case 404:
            onError('Ошибка ' + xhr.status + ' ' + xhr.statusText + 'Данные не найдены');
            break;

          default:
            onError('Произошла ошибка: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Ошибка соединения с сервером');
      });

      xhr.addEventListener('timeout', function () {
        onError('Истекло время соединения с сервером');
      });

      xhr.timeout = 10000;
      xhr.open('GET', URL);
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var URL = 'https://1510.dump.academy/keksobooking';
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200: onLoad();
            break;

          default:
            onError('Произошла ошибка: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Ошибка соединения. Обновите страницу и повторите запрос');
      });

      xhr.addEventListener('timeout', function () {
        onError('Истекло время соединения с сервером');
      });

      xhr.timeout = 10000;
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();

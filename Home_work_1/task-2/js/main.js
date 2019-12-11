window.addEventListener('load', init, false);

const popap = document.getElementById('popap');
let posMap;
let infoMap;

function init() {

   openPopap();
   closePopap();

}

// Запуск модального окна
function openPopap() {
   let linksElem = document.getElementsByClassName('hotel-card-map');

   for (let i = 0; i < linksElem.length; i++) {
      linksElem[i].addEventListener('click', function () {
         switch (linksElem[i].dataset.name) {
            case 'hotel-1':
               posMap = {
                  lat: -42.575112,
                  lng: 171.479091,
               };
               infoMap = new google.maps.InfoWindow({
                  content: '<h3>Scenic Hotel Auckland</h3>'
               });
               initMap();
               break;

            case 'hotel-2':
               posMap = {
                  lat: -41.280003,
                  lng: 174.780502,
               };
               infoMap = new google.maps.InfoWindow({
                  content: '<h3>Mercure Hotel</h3>'
               });
               initMap();
               break;

            case 'hotel-3':
               posMap = {
                  lat: -38.845718,
                  lng: 174.767440,
               };
               infoMap = new google.maps.InfoWindow({
                  content: '<h3>Best Western Ellersli...</h3>'
               });
               initMap();
               break;

            case 'hotel-4':
               posMap = {
                  lat: -36.841971,
                  lng: 174.750537,
               };
               infoMap = new google.maps.InfoWindow({
                  content: '<h3>Hotel Grand Windsor</h3>'
               });
               initMap();
               break;
         }
         popap.style.display = 'block';
      })
   }
}

// Создание google карты
function initMap() {
   let opt = {
      center: posMap,
      zoom: 10,
   };

   let map = new google.maps.Map(document.getElementById('map'), opt);

   let marker = new google.maps.Marker({
      position: posMap,
      map: map,
   });

   marker.addListener('click', function () {
      infoMap.open(map, marker);
   });
}

// Закрытие модального окна с помощью ESC или при нажатии вне карты
function closePopap() {
   document.addEventListener('mouseup', function (e) {
      if (e.target === popap) {
         popap.style.display = 'none';
      }
   })

   document.addEventListener("keydown", function (e) {
      if (e.keyCode == 27) {
         popap.style.display = 'none';
      }
   }, true);

}

var pictureSource;
var destinationType;

function test_init() {
  pictureSource=navigator.camera.PictureSourceType;
  destinationType=navigator.camera.DestinationType;
}

function onPhotoDataSuccess(imageData) {
  var smallImage = document.getElementById('smallImage');
  smallImage.style.display = 'block';
  smallImage.src = "data:image/jpeg;base64," + imageData;
}

function capturePhotoWithData() {
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
}

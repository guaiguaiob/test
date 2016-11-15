
var pictureSource;
var destinationType;

function test_init() {
  console.log('test_init');
  pictureSource=navigator.camera.PictureSourceType;
  destinationType=navigator.camera.DestinationType;
}

function onPhotoDataSuccess(imageData) {
  console.log('onPhotoDataSuccess');
  var smallImage = document.getElementById('smallImage');
  smallImage.style.display = 'block';
  smallImage.src = "data:image/jpeg;base64," + imageData;
}

function capturePhotoWithData() {
  console.log('capturePhotoWithData');
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
}

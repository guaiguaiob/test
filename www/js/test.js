
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

function onPhotoFail(message) {
  alert('Failed because: ' + message);
}

function capturePhotoWithData() {
  console.log('capturePhotoWithData');
  navigator.camera.getPicture(onPhotoDataSuccess, onPhotoFail, { quality: 50 });
}

function onMonitoringSuccess(regionState) {
  console.log('State is ' + regionState.state)
}

function onMonitoringError(message) {
  alert('Failed because: ' + message);
}

function startMonitoring() {
  estimote.beacons.startMonitoringForRegion (
    {}, // Empty region matches all beacons.
    function(result) {
      console.log('*** Beacons monitored ***')
      console.log(result);
      estimote.beacons.printObject(result) },
    function(errorMessage) {
      console.log('Monitoring error: ' + errorMessage) });
}

function stopMonitoring() {
  estimote.beacons.stopMonitoringForRegion(
    {},
     function(result) {
       console.log('*** Beacons monitoring stopped ***')
       console.log(result)},
    function(errorMessage) {
       console.log('Stop monitoring error: ' + errorMessage) });
}

function startRanging() {
  estimote.beacons.startRangingBeaconsInRegion(
    {}, // Empty region matches all beacons.
    function(result) {
      console.log('*** Beacons ranged ***')
      console.log(result);
      estimote.beacons.printObject(result) },
    function(errorMessage) {
      console.log('Ranging error: ' + errorMessage) });
}

function stopRanging() {
  estimote.beacons.stopRangingBeaconsInRegion(
    {},
    function(result) {
      console.log('*** Beacons ranging stopped ***')
      console.log(result) },
    function(errorMessage) {
      console.log('Stop ranging error: ' + errorMessage) });
}

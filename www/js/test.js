function init_iiibeacon() {
    navigator.iiibeacon.init( 
        function(message) {console.log(message);}, 
        function() {console.log("Error calling iiibeacon Plugin");}
    );
}

function startRanging() {
  navigator.iiibeacon.startRanging(
    function(result) {
      console.log('*** Beacons ranged ***')
      console.log(JSON.stringify(result)) },
    function(errorMessage) {
      console.log('Ranging error: ' + errorMessage) });
}

function stopRanging() {
  navigator.iiibeacon.stopRanging(
    function(result) {
      console.log('*** Beacons ranging stopped ***')
      console.log(result) },
    function(errorMessage) {
      console.log('Stop ranging error: ' + errorMessage) });
}
  
function getBeacons() {
  navigator.iiibeacon.getBeacons(
    function(result){
      console.log(JSON.stringify(result)) },
    function(errorMessage){
      console.log('getBeacons error: ' + errorMessage)});
}

function getCurrentPosition() {
  navigator.iiibeacon.getCurrentPosition(
    function(result){
      console.log(JSON.stringify(result))
      alert(JSON.stringify(result))},
    function(errorMessage){
      console.log('getCurrentPosition error: ' + errorMessage)});
}

function watchPosition() {
  navigator.iiibeacon.watchPosition(
    function(result) {
      console.log('*** New Position ***')
      console.log(JSON.stringify(result)) },
    function(errorMessage) {
      console.log('watch error: ' + errorMessage) });
}

function clearWatch() {
  navigator.iiibeacon.clearWatchPosition(
    function(result) {
      console.log('*** clear watch done ***')
      console.log(result) },
    function(errorMessage) {
      console.log('Clear watch error: ' + errorMessage) });
}

function lcrScan() {
  lcr.scan(
    function(result) {
      console.log('*** lcr scan done ***')
      console.log(result) },
    function(errorMessage) {
      console.log('lcr scan error: ' + errorMessage) }
  );
}

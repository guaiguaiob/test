function init_iiibeacon() {
    navigator.iiibeacon.init( 
        function(message) {console.log(message);}, 
        function() {console.log("Error calling iiibeacon Plugin");}
    );
}

function startRanging() {
  iiibeacon.startRanging(
    function(result) {
      console.log('*** Beacons ranged ***')
      console.log(JSON.stringify(result)) },
    function(errorMessage) {
      console.log('Ranging error: ' + errorMessage) });
}

function stopRanging() {
  iiibeacon.stopRanging(
    function(result) {
      console.log('*** Beacons ranging stopped ***')
      console.log(result) },
    function(errorMessage) {
      console.log('Stop ranging error: ' + errorMessage) });
}
  
function getBeacons() {
  iiibeacon.getBeacons(
    function(result){
      console.log(JSON.stringify(result)) },
    function(errorMessage){
      console.log('getBeacons error: ' + errorMessage)});
}

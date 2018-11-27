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

var _storage={};

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

function listDevice() {
}

function testPrint() {
}

function initStorage(name, callback) {
  var ss = new cordova.plugins.SecureStorage(
    function() {
      console.log("Success");
      _storage[name] = ss;
      callback && callback(null, ss);
    },
    function(error) {
      console.log("Error " + error);
      callback && callback(error);
    },
    name
  );
}

function setData(name, key, value, callback) {
  if(_storage[name]) {
    _storage[name].set(function(key) {
        console.log("Set " + key);
        callback && callback(null);
      },
      function(error) {
        console.log("Error " + error);
        callback && callback(error);
      },
      key, value
    );
  } else {
    callback && callback('storage ' + name + ' is not existed');
  }
}

function getData(name, key, callback) {
  if(_storage[name]) {
    _storage[name].get(function(value) {
        console.log("Success, got " + value);
        var rst ={};
        rst[key] = value;
        callback && callback(null, rst);
      },
      function(error) {
        console.log("Error " + error);
        callback && callback(error);
      },
      key
    );
  } else {
    callback && callback('storage ' + name + ' is not existed');
  }
}

function getKeys(name, callback) {
  if(_storage[name]) {
    _storage[name].keys(
      function(keys) {
        console.log("Got keys " + keys.join(", "));
        callback && callback(null, keys);
      },
      function(error) {
        console.log("Error, " + error);
        callback && callback(error);
      }
    );
  } else {
    callback && callback('storage ' + name + ' is not existed');
  }
}

function testStorage() {
  var name = 'printer';
  initStorage(name, function(err,rst) {
    if(!err) {
      setData(name, 'aa', '123', function(err2, rst2) {
        if(!err) {
          getData(name, 'aa', function(err3, rst3) {
            console.log('test storage done');
          })
        }
      })
    }
  })
}

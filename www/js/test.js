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
  var deviceFilter = [
        //gprint
        { vendorId: 34918, productId: 256, interfaceClass: 7 },
        { vendorId: 1137, productId: 85, interfaceClass: 7 },
        { vendorId: 6790, productId: 30084, interfaceClass: 7 },
        { vendorId: 26728, productId: 256, interfaceClass: 7 },
        { vendorId: 26728, productId: 512, interfaceClass: 7 },
        { vendorId: 26728, productId: 768, interfaceClass: 7 },
        { vendorId: 26728, productId: 1024, interfaceClass: 7 },
        { vendorId: 26728, productId: 1280, interfaceClass: 7 },
        { vendorId: 26728, productId: 1536, interfaceClass: 7 },
        //epson
        { vendorId: 1208, productId: 3601, interfaceClass: 7 },
        //xprinter
        { vendorId: 1659, interfaceClass: 7, interfaceSubclass: 1 },
        { vendorId: 1046, interfaceClass: 7, interfaceSubclass: 1 },
        { vendorId: 7358, interfaceClass: 7, interfaceSubclass: 1 },
        { vendorId: 1155, interfaceClass: 7, interfaceSubclass: 1 },
        { vendorId: 8137, interfaceClass: 7, interfaceSubclass: 1 }
      ];
  var _devices = [];
  chrome.usb.getDevices({ filters: deviceFilter }, function (devices) {
    for (var index = 0; index < devices.length; index++) {
      _devices.push(devices[index]);
    }
    console.log(JSON.stringify(_devices));
    if(_devices.length>0) {
      testStorage('prn1', JSON.stringify(_devices[0]))
    }
  });
}

function testPrint() {
  var buf = "\x1d\x21\x11\x70\x72\x69\x6e\x74\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x1d\x56\x00";
  uint8array = new Uint8Array(buf.length);
  for (var i = 0; i < buf.length; i++) uint8array[i] = buf.charCodeAt(i);
  
  getData('printer', 'prn1', function(err,rst){
    if(!err) {
      var device = JSON.parse(rst.prn1);
      chrome.usb.openDevice(device, function(handle){
        chrome.usb.listInterfaces(handle, function (interfaceDescriptors) {
          var inEndpoint = null;
          var outEndpoint = null;
          for (var index = 0; index < interfaceDescriptors.length; index++) {
            var interface = interfaceDescriptors[index];
            for (var i = 0; i < interface.endpoints.length; i++) {
              var endpointDescriptor = interface.endpoints[i];
              if (endpointDescriptor.type == "bulk") {
                if (endpointDescriptor.direction == "out") {
                  outEndpoint = endpointDescriptor;
                } else if (endpointDescriptor.direction == "in") {
                  inEndpoint = endpointDescriptor;
                }
              }
              if (inEndpoint != null && outEndpoint != null) {
                chrome.usb.claimInterface(
                  handle,
                  interface.interfaceNumber,
                  function () {
                    chrome.usb.bulkTransfer(
                      handle,
                      {
                        direction: "out",
                        endpoint: outEndpoint.address,
                        data: uint8array.buffer
                      },
                      function (info) {
                        console.log(JSON.stringify(info));
                        chrome.usb.releaseInterface(
                          handle,
                          interface.interfaceNumber,
                          function () { }
                        );
                      }
                    );
                  }
                );
              }
            }
          }
        })
      })
    }
  })
}

var serial=3001;
function testBTPrint() {
    var logo,logo2,btPrinter;
    localPrn.Image.load('http://bn.tagfans.com/tmp/lprn/logo.png',function(img){
        if(img instanceof localPrn.Image)
            logo=img;
        localPrn.Image.load('http://bn.tagfans.com/tmp/lprn/logo2.png',function(img2){
            if(img2 instanceof localPrn.Image)
                logo2=img2;
            btPrinter = localPrn.createPrinter({btName:'Printer_57B6', btAddress:'DC:1D:30:40:57:B6'});
            if(btPrinter) {
                serial++;
                btPrinter
                    .align('ct')
                    .size(2,2)
                    .text('您的號碼是\n\n')
                    .size(4,4)
                    .text(''+serial+'\n\n')
                    .size(2,2)
                    .text('請等候叫號\n\n');
                logo&&btPrinter
                    .raster(logo)
                    .text('\n\n\n');
                btPrinter.cut().flush();
                serial++;
                btPrinter
                    .upsideDown(1)
                    .align('ct')
                logo2&&btPrinter
                    .raster(logo2)
                    .text('\n');
                btPrinter
                    .size(2,2)
                    .text('請等候叫號\n\n')
                    .size(4,4)
                    .text(''+serial+'\n\n')
                    .size(2,2)
                    .text('您的號碼是\n\n')
                    .text('\n\n');
                    .cut()
                    .upsideDown(0)
                    .flush();
            } else {
                console.log('no BT printer')
            }
        })
    });
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

function testStorage(key, value) {
  if(!key) key = 'aaa';
  if(!value) value = '123';
  var name = 'printer';
  initStorage(name, function(err,rst) {
    if(!err) {
      setData(name, key, value, function(err2, rst2) {
        if(!err) {
          getData(name, key, function(err3, rst3) {
            console.log('test storage done');
          })
        }
      })
    }
  })
}

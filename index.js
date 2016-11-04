var Service, Characteristic, LastUpdate;
var CommandQueue = require('./lib/CommandQueue');
var spawn = require('child_process').spawn;
// var spawnSync = require('child_process').spawnSync;

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerPlatform("homebridge-platform-ener314-rt", "ENER314-RT", EnergeniePlatform);
}

function EnergeniePlatform(log, config) {
    var self = this;
    self.config = config;
    self.log = log;
    self.commandQueue = new CommandQueue(self.config.delay ? self.config.delay : 500);
}
EnergeniePlatform.prototype.accessories = function(callback) {
    var self = this;
    self.accessories = [];
    self.config.switches.forEach(function(sw) {
        self.accessories.push(new EnergenieAccessory(sw, self.log, self.config, self.commandQueue));
    });
    callback(self.accessories);
}

function EnergenieAccessory(sw, log, config, commandQueue) {
    var self = this;
    self.name = sw.name;
    self.sw = sw;
    self.log = log;
    self.config = config;
    self.commandQueue = commandQueue;
    self.currentState = false;

    self.service = new Service.Switch(self.name);

    self.service.getCharacteristic(Characteristic.On).value = self.currentState;

    self.service.getCharacteristic(Characteristic.On).on('get', function(cb) {
        cb(null, self.currentState);
    }.bind(self));

    self.service.getCharacteristic(Characteristic.On).on('set', function(state, cb) {
        self.currentState = state;
        var command = self.currentState ? 'on' : 'off';
          self.commandQueue.queue(function() {
            console.log('Switch ' + command + ' ' + self.sw.name + ", socket " + self.sw.socket)
            var cmd = spawn('python', [__dirname+'/py/switch.py', command, self.sw.socket]);
            cmd.stderr.on('data', function(data) {
              console.log('ERR: ' + data);
            });
            cmd.stdout.on('data', function(data) {
              console.log('OUT: ' + data);
            });

          });
        cb(null);
    }.bind(self));
}
EnergenieAccessory.prototype.getServices = function() {
    var self = this;
    var services = [];
    var service = new Service.AccessoryInformation();
    service.setCharacteristic(Characteristic.Name, self.name)
        .setCharacteristic(Characteristic.Manufacturer, 'Raspberry Pi')
        .setCharacteristic(Characteristic.Model, 'Raspberry Pi')
        .setCharacteristic(Characteristic.SerialNumber, 'Raspberry Pi')
        .setCharacteristic(Characteristic.FirmwareRevision, '1.0.0')
        .setCharacteristic(Characteristic.HardwareRevision, '1.0.0');
    services.push(service);
    services.push(self.service);
    return services;
}

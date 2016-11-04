# homebridge-platform-ener314-rt
# [![NPM Version](https://img.shields.io/npm/v/homebridge-platform-energenie.svg)](https://www.npmjs.com/package/homebridge-platform-energenie)

[Energenie ENER314-RT Two-way Pi-mote](https://energenie4u.co.uk/catalogue/product/ENER314-RT) plugin for the [Homebridge](https://github.com/nfarina/homebridge) project based on [homebridge-platform-energenie](https://github.com/suda/homebridge-platform-energenie).

Uses [pyenergie](https://github.com/whaleygeek/pyenergenie) to control ENER314-RT.

# Installation

1. Install homebridge using: `npm install -g homebridge`
2. Install this plugin using: `npm install -g homebridge-platform-ener314-rt`
3. Update your configuration file. See the sample below.

# Configuration

Configuration sample:

`delay` is the time in milliseconds between each command. As Pi-mote can only send one command at the time, this allows things like scenes with multiple commands to work by queueing the commands.

`switches` is the list of the commands to send for turning sockets on/off.

Note: Some sockets may respond only to `on` commands and turning on/off is done by using different socket id (usually when `n` is for on then `n+1` is for off).


 ```javascript
{
  "bridge": {
    "name": "#####",
    "username": "",
    "port": 51826,
    "pin": ""
  },

  "description": "",

  "platforms": [
    {
      "platform": "ENER314-RT",
      "name": "ENER314-RT Platform",
      "delay": 500,
      "switches": [
        {
          "name" : "Switch One",
          "socket": 1
        }
      ]
    }
  ]
}

```

# Credits

Credit goes to
- [python-energenie](https://github.com/RPi-Distro/python-energenie)
- [homebridge-platform-rcswitch](https://github.com/rainlake/homebridge-platform-rcswitch)

# License

Published under the MIT License.

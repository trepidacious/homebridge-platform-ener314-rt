import energenie
import sys

socket0     = energenie.Devices.ENER002((0xBEEF1, 1))
socket1     = energenie.Devices.ENER002((0xBEEF1, 2))
socket2     = energenie.Devices.ENER002((0xBEEF1, 3))
socket3     = energenie.Devices.ENER002((0xBEEF1, 4))

if __name__ == "__main__":
    argCount = len(sys.argv)
    if argCount < 3:
        print("usage: 'python switch.py STATE DEVICE' where DEVICE is '0', '1', '2' or '4' and STATE is 'on' or 'off'")
        sys.exit(1)

    on = sys.argv[1] == "on"
    name = sys.argv[2]

    energenie.init()
    try:
#        device = energenie.registry.get(name)
#        if device.has_switch():
#            print("Switch id %s" % device)
#            device.set_switch(on)
        if name == "0" : socket0.set_switch(on)
        if name == "1" : socket1.set_switch(on)
        if name == "2" : socket2.set_switch(on)
        if name == "3" : socket3.set_switch(on)

    finally:
        energenie.finished()
        
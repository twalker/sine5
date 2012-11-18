An experimental Theremin using a proximity sensor and javascript.

TODO:
- get a d3 real-time chart going with websockets
- get Arduino working
- get node talking to Arduino
- connect and communicate with proximity sensor
- map proximity data to sound frequency data


TOLEARN:
- d3 syntax and approach
- dealing with a stream of real-time data

device:
cdc_acm 1-1.5:1.0: ttyACM0: USB ACM device


helpful articles:

arduino
http://blog.markloiseau.com/2012/05/install-arduino-ubuntu/
http://www.emanueletessore.com/how-to-setup-a-node-js-and-arduino-development-environment-under-ubuntu-server-12-04/
http://arduino.cc/playground/Learning/Linux
https://github.com/rwldrn/johnny-five/

sudo chmod a+rw /dev/ttyACM0
sudo echo 'asd' > /dev/ttyACM0
dmesg


chart
http://alignedleft.com/tutorials/d3/
http://bost.ocks.org/mike/path/

piano
https://developer.mozilla.org/th/demos/detail/html5-piano
https://developer.cdn.mozilla.net/media/uploads/demos/M/i/MikeMnD/bbd077c574670ad3c70aab5aa64258be/html5-piano_1315774273_demo_package/index.html
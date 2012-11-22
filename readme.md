##sine5

An experimental Theremin using a proximity sensor and javascript.

This learning project mixes together some lovely open-source projects:

* [Arduino](http://arduino.cc/) for hardware IO.
* [johnny-five](https://github.com/rwldrn/johnny-five) for hardware interface w/javascript.
* [socket.io](http://socket.io/) for pushing sensor input to client
* [W3C Web Audio API](http://www.w3.org/TR/webaudio/) for sythesis (implemented in Chrome).
* [D3.js](http://d3js.org/) for visualizing input.

-------------



###TODO:

x get a d3 real-time chart going with websockets
x get Arduino working
x get node talking to Arduino
- connect and communicate with proximity sensor
- map proximity data to sound frequency data
- volume: choose sensor and visualize data

###TOCLEAN:

- x axis of chart should reflect something useful, or nothing
- ui for controls

###TOLEARN:

- d3 syntax and approach
- dealing with a stream of real-time data

device:
cdc_acm 1-1.5:1.0: ttyACM0: USB ACM device

--------------


##helpful articles:

###arduino
http://blog.markloiseau.com/2012/05/install-arduino-ubuntu/
http://www.emanueletessore.com/how-to-setup-a-node-js-and-arduino-development-environment-under-ubuntu-server-12-04/
http://arduino.cc/playground/Learning/Linux
https://github.com/rwldrn/johnny-five/

sudo chmod a+rw /dev/ttyACM0
sudo echo 'asd' > /dev/ttyACM0
dmesg


###chart
http://alignedleft.com/tutorials/d3/
http://bost.ocks.org/mike/path/
https://gist.github.com/1642989
http://bl.ocks.org/mbostock
http://alignedleft.com/tutorials/d3/an-svg-primer/


###synthesis
http://chromium.googlecode.com/svn/trunk/samples/audio/wavetable-synth.html
http://developer.apple.com/library/safari/#documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/PlayingandSynthesizingSounds/PlayingandSynthesizingSounds.html
http://creativejs.com/resources/web-audio-api-getting-started/
http://www.html5rocks.com/en/tutorials/webaudio/intro/
http://alxgbsn.co.uk/wavepad/js/main.js


###piano
https://developer.mozilla.org/th/demos/detail/html5-piano
https://developer.cdn.mozilla.net/media/uploads/demos/M/i/MikeMnD/bbd077c574670ad3c70aab5aa64258be/html5-piano_1315774273_demo_package/index.html
##sine5

An experimental Theremin using a proximity sensor, an air sensor, and javascript.

![sine5 screenshot](https://raw.github.com/twalker/sine5/master/public/img/sine5_screenshot.png "sine5 screenshot")

[here's a video](https://vimeo.com/54688130) for the brave of hearing.

This learning project mixes together some lovely open-source projects:

* [Arduino](http://arduino.cc/) for hardware IO.
* [johnny-five](https://github.com/rwldrn/johnny-five) for hardware interface w/javascript.
* [socket.io](http://socket.io/) for pushing sensor input to client
* [W3C Web Audio API](http://www.w3.org/TR/webaudio/) for sythesis (implemented in Chrome).
* [D3.js](http://d3js.org/) for visualizing input.


Requirements:

- Arduino board w/ proximity sensor
- Chrome
- Node

To run without an Arduino board & sensors:  
`node app --noboard`


-------------



###TODO:

- ~~get a d3 real-time chart going with websockets~~
- ~~get Arduino working~~
- ~~get node talking to Arduino~~
- ~~connect and communicate with proximity sensor~~
- ~~map proximity data to sound frequency data~~
- ~~volume: choose sensor and visualize data~~
- check if reverb works on mac because it doesn't on linux
- axis of chart should reflect something useful, or nothing
- ~~ui for controls~~
- proximity sensor reading is coarse, latent, and kinda sucks. revisit when not pissed.

###TOLEARN:

- ~~d3 syntax and approach~~
- ~~dealing with a stream of real-time data~~

--------------


##helpful articles:

###arduino

- http://blog.markloiseau.com/2012/05/install-arduino-ubuntu/
- http://www.emanueletessore.com/how-to-setup-a-node-js-and-arduino-development-environment-under-ubuntu-server-12-04/
- http://playground.arduino.cc/Linux/Debian
- http://arduino.cc/playground/Learning/Linux
- https://github.com/rwldrn/johnny-five/
- http://stuartmemo.com/controlling-web-audio-api-volume-using-the-html5-slider-element/
- http://arduino.cc/en/Tutorial/Smoothing

local usb device:  
cdc_acm 1-1.5:1.0: ttyACM0: USB ACM device  
cdc_acm 2-1.3:1.0: ttyACM0: USB ACM device  

permission issues fixed with:  
`sudo chmod a+rw /dev/ttyACM0`  
`sudo echo 'asd' > /dev/ttyACM0`  
dmesg


###chart

- http://alignedleft.com/tutorials/d3/
- http://bost.ocks.org/mike/path/
- https://gist.github.com/1642980
- http://bl.ocks.org/mbostock
- http://alignedleft.com/tutorials/d3/an-svg-primer/


###synthesis

- http://chromium.googlecode.com/svn/trunk/samples/audio/wavetable-synth.html  
- http://developer.apple.com/library/safari/#documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/PlayingandSynthesizingSounds/PlayingandSynthesizingSounds.html  
- http://creativejs.com/resources/web-audio-api-getting-started/  
- http://www.html5rocks.com/en/tutorials/webaudio/intro/  
- http://alxgbsn.co.uk/wavepad/js/main.js  

###frequency mapping

http://en.wikipedia.org/wiki/Audio_frequency  
88 note piano is 27.5Hz (A0) - 4186.01Hz (C8)  
middle C = 261.626Hz  

approx sensor range:  
cm 73 - 199  
voltage 58 - 158  


###piano
- https://developer.mozilla.org/th/demos/detail/html5-piano
- https://developer.cdn.mozilla.net/media/uploads/demos/M/i/MikeMnD/bbd077c574670ad3c70aab5aa64258be/html5-piano_1315774273_demo_package/index.html

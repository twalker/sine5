/**
 * audio api wrapper for a sine wave emulating a theremin
 */
var synth = (function(global){
	'use strict';
	// http://developer.apple.com/library/safari/#documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/PlayingandSynthesizingSounds/PlayingandSynthesizingSounds.html
	var context,
		sine,
		pitch,
		vol,
		rev;

	function init(options){
		var options = options || {};

		if('AudioContext' in global) {
			context = new AudioContext();
		} else if('webkitAudioContext' in global){
			context = new webkitAudioContext();
		} else{
			throw new Error('Browser does not support AudioContext, use Chrome');
		}


		//rev = context.createConvolver();
		vol = context.createGainNode();
		vol.gain.value = options.gain || 0;

		sine = context.createOscillator();
		sine.type = 0; // doesn't work, defaulting to 4

		//sine.connect(context.destination);

		//sine.connect(rev);
		//rev.connect(vol);
		//sine.connect(context.destination);

		sine.connect(vol);
		vol.connect(context.destination);

		//sine.noteOn(0);
		//console.log('sine', sine)
		//global.sine = sine;
	}

	function start(){
		//sine.noteOn(0); // noteOn/noteOff doesn't seem to work in chromium linux.
		volume(1);
	}

	function stop(){
		volume(0);
	}

	function pitch(val){
		//console.log('freq', val);
		sine.frequency.value = val;
	}
	// not working--should try on mac instead of linux
	function volume(val){
		//var fraction = val / 100;
		vol.gain.value = val;
	}
	// not implemented/working
	function reverb(val){
		rev.value = val;
	}


	return {
		init: init,
		volume: volume,
		pitch: pitch,
		reverb: reverb,
		start: start,
		stop: stop
	};
})(window);
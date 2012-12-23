/**
 * controller and mediator for synth and oscilloscope.
 */
var sine5 = (function(global){
	'use strict';
	var socket,
		muted = false;

	function init(){
		var doc = global.document;
		var elements = {
			mute: doc.querySelector('button.mute'),
			volume: doc.querySelector('input.volume'),
			pitch: doc.querySelector('input.pitch'),
			wave: doc.querySelector('select.wave')
		};

		socket = io.connect('http://localhost');

		// initialize the synth and sine5
		synth.init({
			gain: elements.volume.value,
			wave: elements.wave.value
		});

		oscilloscope.init();

		socket.on('freq:change', function(msg){
			oscilloscope.plot(msg);
			synth.pitch(msg.x);
			elements.pitch.value = msg.x;
		});

		elements.volume.addEventListener('change', function(e){
			//console.log('volume changed', e.target.value);
			if(!muted) synth.volume(e.target.value);
		});

		elements.mute.addEventListener('click', function(e){
			e.preventDefault();
			dom.toggleClass(e.currentTarget, 'active');
			muted = !muted;
			//console.log('setting vol to', muted ? 0 : elements.volume.value);
			synth.volume(muted ? 0 : elements.volume.value);
		});

		elements.pitch.addEventListener('change', function(e){
			//console.log('pitch changed',e.target.value);
			synth.pitch(e.target.value);
			oscilloscope.plot({x: e.target.value });
		});

		elements.wave.addEventListener('change', function(e){
			synth.wave(e.currentTarget.value)
		})
	}

	return {
		init: init
	};

})(window);

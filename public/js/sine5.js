/**
 * controller and mediator for synth and oscilloscope.
 */
var sine5 = (function(root){
	//'use strict';
	var socket,
		muted = false,
		elements = {};
	function init(){
		elements = {
			mute: document.querySelector('button.mute'),
			volume: document.querySelector('input.volume'),
			pitch: document.querySelector('input.pitch'),
			disconnect: document.querySelector('button.disconnect')

		};
		socket = io.connect('http://localhost');

		// initialize the synth and sine5
		synth.init({
			gain: document.querySelector('input.volume').value
		});
		oscilloscope.init();

		socket.on('freq:change', function(msg){
			oscilloscope.plot(msg);
			synth.pitch(msg.x);
			elements.pitch.value = msg.x;
		});

		elements.disconnect.addEventListener('click', function(e){
			e.preventDefault();
			socket.disconnect();
			dom.addClass(e.currentTarget, 'on');
			dom.show(elements.pitch);
		});

		elements.volume.addEventListener('change', function(e){
			//console.log('volume changed', e.target.value);
			if(!muted) synth.volume(e.target.value);
		});

		elements.mute.addEventListener('click', function(e){
			e.preventDefault();
			dom.toggleClass(e.currentTarget, 'on');
			muted = !muted;
			//console.log('setting vol to', muted ? 0 : elements.volume.value);
			synth.volume(muted ? 0 : elements.volume.value);
		});

		elements.pitch.addEventListener('change', function(e){
			//console.log('pitch changed',e.target.value);
			synth.pitch(e.target.value);
			oscilloscope.plot({x: e.target.value });
		});
	}

	return {
		init: init
	};

})(window);

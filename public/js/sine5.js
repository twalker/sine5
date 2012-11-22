/**
 * controller and mediator for synth and oscilloscope.
 */
var sine5 = (function(root){
	'use strict';
	var socket,
		muted = false;
	function init(){
		socket = io.connect('http://localhost');
		socket.on('server event', function (data) {
			console.log(data);
			//socket.emit('client event', { from: 'client', to: 'server' });
		});
		// initialize the synth and sine5
		synth.init({
			gain: document.querySelector('input.volume').value
		});
		oscilloscope.init();

		socket.on('plot', function(msg){
			oscilloscope.plot(msg);
			synth.pitch(msg.x)
		});
		//socket.on('plot', sine5.plot);
		document.querySelector('button.disconnect').addEventListener('click', function(e){
			e.preventDefault();
			socket.disconnect();
		});
		/*
		var buttons = [].slice.call(document.getElementsByClassName('action'));
		buttons.forEach(function(el){
			el.addEventListener('click', function(e){
				e.preventDefault();
				var action = e.currentTarget.value;
				sine5[action]();
			});
		});
		*/
		document.querySelector('input.volume').addEventListener('change', function(e){
			console.log('volume changed', e.target.value / 100);
			synth.volume(e.target.value / 100);
		});

		document.querySelector('button.mute').addEventListener('click', function(e){
			e.preventDefault();
			muted = !muted;
			console.log('setting vol to', muted ? 0 : parseInt(document.querySelector('input.volume').value) / 100);
			synth.volume(muted ? 0 : parseInt(document.querySelector('input.volume').value) / 100);
		});

		document.querySelector('input.pitch').addEventListener('change', function(e){
			console.log('pitch changed',e.target.value);
			synth.pitch(e.target.value);
			oscilloscope.plot({x: e.target.value });
		});
	}

	return {
		init: init
	};

})(window);

/**
 * controller and mediator for synth and oscilloscope.
 */
define(['domReady!', 'dom', 'synth', 'oscilloscope', 'scale', 'socket.io'], function(doc, dom, synth, oscilloscope, scale, io){
	'use strict';

	var socket,
		muted = false;

	function init(options){
		var options = options || {};

		var elements = {
			mute: doc.querySelector('button.mute'),
			volume: doc.querySelector('input.volume'),
			pitch: doc.querySelector('input.pitch'),
			wave: doc.querySelector('select.wave'),
			note: doc.querySelector('aside#note')
		};

		var showNote = function showNote(freq){
			var notes = scale.filter(function(v,i,a){
				// lenient comparison for more positive hits
				return Math.abs(parseInt(v.freq) - parseInt(freq)) < 6;
			});
			elements.note.innerHTML = (notes.length) ? notes[0].note : '';//freq;
		}

		socket = io.connect('http://localhost');

		// initialize the synth and sine5
		synth.init({
			gain: elements.volume.value,
			wave: elements.wave.value
		});

		oscilloscope.init();

		if(options.noboard) {
			// use a pitch slider
			elements.pitch.addEventListener('change', function(e){
				//console.log('pitch changed',e.target.value);
				var freq = e.target.value;
				synth.pitch(freq);
				oscilloscope.plot({x: freq });

				showNote(freq);
			});

		} else {
			// use websocket messages
			socket.on('frequency:change', function(msg){
				var freq = msg.frequency;
				oscilloscope.plot({x: freq});
				synth.pitch(freq);
				showNote(freq);
			});

			socket.on('volume:change', function(msg){
				var vol = msg.volume;
				if(!muted) synth.volume(vol);

				elements.volume.value = vol;
			});
		}


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


		elements.wave.addEventListener('change', function(e){
			synth.wave(e.currentTarget.value)
		})
	}

	return {
		init: init
	};
});
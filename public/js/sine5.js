/**
 * controller and mediator for synth and oscilloscope.
 */
var sine5 = (function(global){
	'use strict';
	var socket,
		muted = false,
		// TOREVISIT: optimize; get from server-side
		scale = [{"note":"C<sub>0</sub>","freq":16.35},{"note":"C<sup>#</sup><sub>0</sub>/D<sup>b</sup><sub>0</sub>","freq":17.32},{"note":"D<sub>0</sub>","freq":18.35},{"note":"D<sup>#</sup><sub>0</sub>/E<sup>b</sup><sub>0</sub>","freq":19.45},{"note":"E<sub>0</sub>","freq":20.6},{"note":"F<sub>0</sub>","freq":21.83},{"note":"F<sup>#</sup><sub>0</sub>/G<sup>b</sup><sub>0</sub>","freq":23.12},{"note":"G<sub>0</sub>","freq":24.5},{"note":"G<sup>#</sup><sub>0</sub>/A<sup>b</sup><sub>0</sub>","freq":25.96},{"note":"A<sub>0</sub>","freq":27.5},{"note":"A<sup>#</sup><sub>0</sub>/B<sup>b</sup><sub>0</sub>","freq":29.14},{"note":"B<sub>0</sub>","freq":30.87},{"note":"C<sub>1</sub>","freq":32.7},{"note":"C<sup>#</sup><sub>1</sub>/D<sup>b</sup><sub>1</sub>","freq":34.65},{"note":"D<sub>1</sub>","freq":36.71},{"note":"D<sup>#</sup><sub>1</sub>/E<sup>b</sup><sub>1</sub>","freq":38.89},{"note":"E<sub>1</sub>","freq":41.2},{"note":"F<sub>1</sub>","freq":43.65},{"note":"F<sup>#</sup><sub>1</sub>/G<sup>b</sup><sub>1</sub>","freq":46.25},{"note":"G<sub>1</sub>","freq":49},{"note":"G<sup>#</sup><sub>1</sub>/A<sup>b</sup><sub>1</sub>","freq":51.91},{"note":"A<sub>1</sub>","freq":55},{"note":"A<sup>#</sup><sub>1</sub>/B<sup>b</sup><sub>1</sub>","freq":58.27},{"note":"B<sub>1</sub>","freq":61.74},{"note":"C<sub>2</sub>","freq":65.41},{"note":"C<sup>#</sup><sub>2</sub>/D<sup>b</sup><sub>2</sub>","freq":69.3},{"note":"D<sub>2</sub>","freq":73.42},{"note":"D<sup>#</sup><sub>2</sub>/E<sup>b</sup><sub>2</sub>","freq":77.78},{"note":"E<sub>2</sub>","freq":82.41},{"note":"F<sub>2</sub>","freq":87.31},{"note":"F<sup>#</sup><sub>2</sub>/G<sup>b</sup><sub>2</sub>","freq":92.5},{"note":"G<sub>2</sub>","freq":98},{"note":"G<sup>#</sup><sub>2</sub>/A<sup>b</sup><sub>2</sub>","freq":103.83},{"note":"A<sub>2</sub>","freq":110},{"note":"A<sup>#</sup><sub>2</sub>/B<sup>b</sup><sub>2</sub>","freq":116.54},{"note":"B<sub>2</sub>","freq":123.47},{"note":"C<sub>3</sub>","freq":130.81},{"note":"C<sup>#</sup><sub>3</sub>/D<sup>b</sup><sub>3</sub>","freq":138.59},{"note":"D<sub>3</sub>","freq":146.83},{"note":"D<sup>#</sup><sub>3</sub>/E<sup>b</sup><sub>3</sub>","freq":155.56},{"note":"E<sub>3</sub>","freq":164.81},{"note":"F<sub>3</sub>","freq":174.61},{"note":"F<sup>#</sup><sub>3</sub>/G<sup>b</sup><sub>3</sub>","freq":185},{"note":"G<sub>3</sub>","freq":196},{"note":"G<sup>#</sup><sub>3</sub>/A<sup>b</sup><sub>3</sub>","freq":207.65},{"note":"A<sub>3</sub>","freq":220},{"note":"A<sup>#</sup><sub>3</sub>/B<sup>b</sup><sub>3</sub>","freq":233.08},{"note":"B<sub>3</sub>","freq":246.94},{"note":"C<sub>4</sub>","freq":261.63},{"note":"C<sup>#</sup><sub>4</sub>/D<sup>b</sup><sub>4</sub>","freq":277.18},{"note":"D<sub>4</sub>","freq":293.66},{"note":"D<sup>#</sup><sub>4</sub>/E<sup>b</sup><sub>4</sub>","freq":311.13},{"note":"E<sub>4</sub>","freq":329.63},{"note":"F<sub>4</sub>","freq":349.23},{"note":"F<sup>#</sup><sub>4</sub>/G<sup>b</sup><sub>4</sub>","freq":369.99},{"note":"G<sub>4</sub>","freq":392},{"note":"G<sup>#</sup><sub>4</sub>/A<sup>b</sup><sub>4</sub>","freq":415.3},{"note":"A<sub>4</sub>","freq":440},{"note":"A<sup>#</sup><sub>4</sub>/B<sup>b</sup><sub>4</sub>","freq":466.16},{"note":"B<sub>4</sub>","freq":493.88},{"note":"C<sub>5</sub>","freq":523.25},{"note":"C<sup>#</sup><sub>5</sub>/D<sup>b</sup><sub>5</sub>","freq":554.37},{"note":"D<sub>5</sub>","freq":587.33},{"note":"D<sup>#</sup><sub>5</sub>/E<sup>b</sup><sub>5</sub>","freq":622.25},{"note":"E<sub>5</sub>","freq":659.26},{"note":"F<sub>5</sub>","freq":698.46},{"note":"F<sup>#</sup><sub>5</sub>/G<sup>b</sup><sub>5</sub>","freq":739.99},{"note":"G<sub>5</sub>","freq":783.99},{"note":"G<sup>#</sup><sub>5</sub>/A<sup>b</sup><sub>5</sub>","freq":830.61},{"note":"A<sub>5</sub>","freq":880},{"note":"A<sup>#</sup><sub>5</sub>/B<sup>b</sup><sub>5</sub>","freq":932.33},{"note":"B<sub>5</sub>","freq":987.77},{"note":"C<sub>6</sub>","freq":1046.5},{"note":"C<sup>#</sup><sub>6</sub>/D<sup>b</sup><sub>6</sub>","freq":1108.73},{"note":"D<sub>6</sub>","freq":1174.66},{"note":"D<sup>#</sup><sub>6</sub>/E<sup>b</sup><sub>6</sub>","freq":1244.51},{"note":"E<sub>6</sub>","freq":1318.51},{"note":"F<sub>6</sub>","freq":1396.91},{"note":"F<sup>#</sup><sub>6</sub>/G<sup>b</sup><sub>6</sub>","freq":1479.98},{"note":"G<sub>6</sub>","freq":1567.98},{"note":"G<sup>#</sup><sub>6</sub>/A<sup>b</sup><sub>6</sub>","freq":1661.22},{"note":"A<sub>6</sub>","freq":1760},{"note":"A<sup>#</sup><sub>6</sub>/B<sup>b</sup><sub>6</sub>","freq":1864.66},{"note":"B<sub>6</sub>","freq":1975.53},{"note":"C<sub>7</sub>","freq":2093},{"note":"C<sup>#</sup><sub>7</sub>/D<sup>b</sup><sub>7</sub>","freq":2217.46},{"note":"D<sub>7</sub>","freq":2349.32},{"note":"D<sup>#</sup><sub>7</sub>/E<sup>b</sup><sub>7</sub>","freq":2489.02},{"note":"E<sub>7</sub>","freq":2637.02},{"note":"F<sub>7</sub>","freq":2793.83},{"note":"F<sup>#</sup><sub>7</sub>/G<sup>b</sup><sub>7</sub>","freq":2959.96},{"note":"G<sub>7</sub>","freq":3135.96},{"note":"G<sup>#</sup><sub>7</sub>/A<sup>b</sup><sub>7</sub>","freq":3322.44},{"note":"A<sub>7</sub>","freq":3520},{"note":"A<sup>#</sup><sub>7</sub>/B<sup>b</sup><sub>7</sub>","freq":3729.31},{"note":"B<sub>7</sub>","freq":3951.07},{"note":"C<sub>8</sub>","freq":4186.01},{"note":"C<sup>#</sup><sub>8</sub>/D<sup>b</sup><sub>8</sub>","freq":4434.92},{"note":"D<sub>8</sub>","freq":4698.64},{"note":"D<sup>#</sup><sub>8</sub>/E<sup>b</sup><sub>8</sub>","freq":4978.03}],
		fixedScale = scale.map(function(v,i,a){
			return {note: v.note.replace('</sub>/','</sub>-'), freq: +(v.freq).toFixed(2)};
		});


	function init(options){
		var doc = global.document;
		var options = options || {};

		var elements = {
			mute: doc.querySelector('button.mute'),
			volume: doc.querySelector('input.volume'),
			pitch: doc.querySelector('input.pitch'),
			wave: doc.querySelector('select.wave'),
			note: doc.querySelector('aside#note')
		};

		var showNote = function showNote(freq){
			var notes = fixedScale.filter(function(v,i,a){
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
				synth.volume(vol);
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

})(window);

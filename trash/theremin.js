var Theremin = (function(root){
	var chart,
		chartWidth = 800,
		chartHeight = 500;

	var notes = ['A','A#Bb','B','C','C#Db','D','D#Eb','E','F','F#Gb','G','G#Ab'];
	var natural = notes.filter(function(note){return note.length === 1});

	var data = [];

	function Theremin(){
		console.log('go, go, theremin!');
		var socket = this.socket = io.connect('http://localhost');
		socket.on('server event', function (data) {
			console.log(data);
			socket.emit('client event', { from: 'client', to: 'server' });
		});
		/*
		window.setInterval(function(){
			socket.emit('client event', { from: 'client', to: 'server' });
		}, 1000);
		*/

		chart = d3.select("#chart").append("svg")
			.attr('class', 'chart')
			.attr("width", chartWidth)
			.attr("height", chartHeight);
		//this.drawPianoAxis(chart, 4);
		chart.selectAll('g')
			.data(notes)
			.enter()
			.append('rect')
			//.attr('y', function(d,i){return i*20;})
			.attr('y', function(d,i){return (d.length === 1) ? (i*20) : (i*20 - 30);})
			.attr('x', 0)
			.attr('height', function(d, i){ return (d.length === 1) ? 15 : 9;})
			.attr('width', 50)
			.attr('class', function(d, i){ return 'key ' + (d.length === 1 ? 'white': 'black');});

		//chart.data(data).append('path').attr('class', 'random');
		var x = d3.scale.linear()
			.domain([1, 40 - 2])
			.range([0, chartWidth]);

		var y = d3.scale.linear()
			.domain([-1, 1])
			.range([chartHeight, 0]);

		var line = this.line = d3.svg.line()
			.interpolate("basis")
			.x(function(d, i) { return x(i); })
			.y(function(d, i) { return y(d); });

		var path = this.path = chart.append('g')
			.attr('clip-path', 'url(#clip)')
			.append('path')
			.data([data])
			.attr('class', 'line').attr('d', line);

		socket.on('plot', this.plotRandom.bind(this));

		// event handling
		//document.getElementsByTagName('form')[0].addEventListener('submit', this.onFormClick.bind(this));

		var buttons = [].slice.call(document.getElementsByClassName('action'));
		buttons.forEach(function(el){
			el.addEventListener('click', function(e){
				e.preventDefault();
				var action = e.currentTarget.value;
				var actionMap = {
					connect: function(){
						socket = io.connect('http://localhost');
					},
					disconnect: function(){
						socket.disconnect();
					}
				};
				console.log(action);
				actionMap[action]();
			});
		});

	};


	Theremin.prototype.plotRandom = function(msg){
		//console.log('plot', msg);

		// push a new data point onto the back
		data.push(msg.data);
		// redraw the line, and slide it to the left
		this.path
			.attr("d", this.line)
			.attr("transform", null)
			.transition()
			.duration(500)
			.ease("linear")
			.attr("transform", "translate(" + x(0) + ")")
			.each("end", this.plotRandom.bind(this));

		/*
		var line = d3.svg.line()
	    	//.interpolate(interpolation)
			.x(function(d, i) { return x(i); })
			.y(function(d, i) { return y(d); });
			// redraw the line, and then slide it to the left
			chart.select('path')
				.attr("d", line)
				.attr("transform", null)
				.transition()
				.ease("linear")
				//.attr("transform", "translate(" + x(-1) + ")");
		*/
		// pop the old data point off the front
		data.shift();

	};

	Theremin.prototype.drawPianoAxis = function(chart, octaves){
		var Ws = [0, 23, 46, 69, 92, 115, 138];
		var Bs = [14.33333, 41.66666, 82.25, 108.25, 134.75];
		for(var i=0; i < octaves; i++){
			chart.selectAll('g')
				.data(Ws)
				.enter()
				.append('rect')
				.attr('y', function(d, j){return d + (i*138);})
				.attr('x', 0)
				.attr('height', 23)
				.attr('width', 120)
				.attr('class', 'key white');


			chart.selectAll('g')
				.data(Bs)
				.enter()
				.append('rect')
				.attr('y', function(d,j){return d + (i*138);})
				.attr('x', 0)
				.attr('height', 13)
				.attr('width', 80)
				.attr('class', 'key black')
			}
		/*
		chart.selectAll('g')
			.data(Ws)
			.enter()
			.append('rect')
			.attr('y', function(d,i){return d;})
			.attr('x', 0)
			.attr('height', 23)
			.attr('width', 120)
			.attr('class', 'key white');

		chart.selectAll('g')
			.data(Bs)
			.enter()
			.append('rect')
			.attr('y', function(d,i){return d;})
			.attr('x', 0)
			.attr('height', 13)
			.attr('width', 80)
			.attr('class', 'key black');
		*/
	};

	return Theremin;

})(window);

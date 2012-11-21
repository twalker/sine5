var theremin = (function(root){
	var svg,
		margin = {top: 10, right: 10, bottom: 20, left: 40},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom,
		n = 40,	//wtf is n? max len? points plotted?
		data = [],
		path,
		socket;

	var x = d3.scale.linear()
		.domain([1, n - 2])
		//.domain([1, (data.length > n) ? n -2 : 0])
		.range([0, width]);

	var y = d3.scale.linear()
		//.domain([-1, 1])
		//.domain([20, 20000])
		.domain([0, 1024])
		.range([height, 0]);

	var line = this.line = d3.svg.line()
		.interpolate("basis")
		.x(function(d, i) { return x(i); })
		.y(function(d, i) { return y(d); });

	function init(){
		socket = io.connect('http://localhost');
		socket.on('server event', function (data) {
			console.log(data);
			//socket.emit('client event', { from: 'client', to: 'server' });
		});

		svg = d3.select("#chart").append("svg")
			.attr('class', 'chart')
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		svg.append("defs").append("clipPath")
			.attr("id", "clip")
			.append("rect")
			.attr("width", width)
			.attr("height", height);

		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.svg.axis().scale(x).orient("bottom"));
			//.call(d3.svg.axis().scale(d3.time.scale(d3.time.seconds, 1)).orient("bottom"));

		svg.append("g")
			.attr("class", "y axis")
			.call(d3.svg.axis().scale(y).orient("left"));

		path = svg.append("g")
			.attr("clip-path", "url(#clip)")
			.append("path")
			.data([data])
			.attr("class", "line")
			.attr("d", line);
		socket.on('plot', plotRandom);
		//on();

	}

	var plotRandom = function plotRandom(msg){
		//console.log('plot', msg);
		// push a new data point onto the back
		data.push(msg.x);
		// redraw the line, and slide it to the left
		path
			.attr("d", line)
			.attr("transform", null)
			.transition()
			.duration(500)
			.ease("linear")
			.attr("transform", "translate(" + x(0) + ")")
			//.each("end", plotRandom);

		// pop the old data point off the front
		//console.log('len', data.length)
		if(data.length >= n) data.shift();
		//data.shift();
	};


	var on = function on(){
		console.log('TODO')
		//socket = io.connect('http://localhost');
		//socket.on('plot', plotRandom);
	};

	var off = function off(){
		console.log('TODO')
		socket.disconnect();
	};

	return {
		init: init,
		on: on,
		off: off
	};

})(window);

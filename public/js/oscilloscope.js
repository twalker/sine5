/**
 * d3 chart of frequency (x axis) and time (y axis)
 */
 define(['d3'], function(){
	'use strict';
	// was 960 x 700
	var svg,
		margin = {top: 10, right: 10, bottom: 20, left: 40},
		width = 640 - margin.left - margin.right,
		height = 480 - margin.top - margin.bottom,
		n = 100,	// data points?
		data = [],
		path;

	var x = d3.scale.linear()
		.domain([1, n - 2])
		.range([0, width]);

	var y = d3.scale.linear()
		//.domain([20, 20000]) // range of human hearing
		.domain([20, 4200]) //range of 88 key piano
		//.domain([0, 1024]) // voltage range
		.range([height, 0]);

	var line = d3.svg.line()
		.interpolate("basis")
		.x(function(d, i) { return x(i); })
		.y(function(d, i) { return y(d); });

	function init(){
		svg = d3.select("#oscilloscope")
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

	}

	var plot = function plot(msg){
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
			.attr("transform", "translate(" + x(0) + ")");
			//.each("end", plot);

		// pop the old data point off the front
		//console.log('len', data.length)
		if(data.length >= n) data.shift();
		//data.shift();
	};

	return {
		init: init,
		plot: plot
	};
 });

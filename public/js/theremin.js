var theremin = (function(root){
	return {
		init: function(){
			console.log('go, go, theremin!');

			var socket = io.connect('http://localhost');
			socket.on('server event', function (data) {
				console.log(data);
				socket.emit('client event', { from: 'client', to: 'server' });
			});
			window.setInterval(function(){
				socket.emit('client event', { from: 'client', to: 'server' });
			}, 1000);

			var chart = d3.select("#chart").append("svg")
				.attr('class', 'chart')
				.attr("width", 800)
				.attr("height", 500);

			var Ws = [0, 23, 46, 69, 92, 115, 138];
			var Bs = [14.33333, 41.66666, 82.25, 108.25, 134.75];
			//var Bs = [14, 42, 82, 108, 135];

			chart.selectAll('g')
				.data(Ws)
				.enter()
				.append('rect')
				.attr('y', function(d,i){return d;})
				.attr('x', 0)
				.attr('height', 23)
				.attr('width', 120)
				.attr('class', 'wkey');

			chart.selectAll('g')
				.data(Bs)
				.enter()
				.append('rect')
				.attr('y', function(d,i){return d;})
				.attr('x', 0)
				.attr('height', 13)
				.attr('width', 80)
				.attr('class', 'bkey');

			/*
			chart.append('circle').style('stroke', 'gray')
			.style('fill', 'white')
			.attr('r', 40)
			.attr('cx', 50)
			.attr('cy', 50);
			*/

			//this.drawPiano();
		},

		drawPiano: function(){
			//console.log('drawing stuff', svg);

		}
	};
})(window);

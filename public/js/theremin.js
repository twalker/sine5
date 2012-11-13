var theremin = (function(root){
	var svg;
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

			svg = d3.select("#chart").append("svg")
				.attr("width", "100%").attr("height", "100%")
				.append("g").attr("transform", "translate(" + 20 + "," +20 + ")");
			this.drawStuff();
		},
		drawStuff: function(){
			console.log('drawing stuff', svg);

		}
	};
})(window);

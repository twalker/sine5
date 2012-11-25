var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	path = require('path'),
	stylus = require('stylus'),
	nib = require('nib');
	five = require("johnny-five"),
	board = new five.Board();


server.listen(process.env.PORT || 3000);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(app.router);
app.locals.pretty = true;
//app.use(require('stylus').middleware(__dirname + '/public'));
app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: function(str, path){
		return stylus(str).set('filename', path).set('compress', true).use(nib());
	}
}));

app.use(express.static(path.join(__dirname, 'public')));

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', function (req, res) {
	res.render('index', { title: 'sine5' });
});


io.sockets.on('connection', function (socket) {
	socket.emit('server event', { from: 'server', to: 'client' });
	socket.on('client event', function (data) {
		//console.log(data);
	});
});

function cmToHz(value){
	var cmRange = {min: 73, max:199},
		//hzRange = {min: 20, max: 20000},
		hzRange = {min: 27.5, max: 4186.01}, //range of 88 key piano
		//Figure out how 'wide' each range is
		leftSpan = cmRange.max - cmRange.min,
		rightSpan = hzRange.max - hzRange.min;

	// Convert the left range into a 0-1 range (float)
	var scaled = (value - cmRange.min) / leftSpan;

	// Convert the 0-1 range into a value in the right range.
	var val = hzRange.min + (scaled * rightSpan);
	return val;
}

board.on("ready", function() {

	var sonor = new five.Sonar({pin:"A0", freq: 50});
	//sonor.on("change", function( err, timestamp ) {
	sonor.on("read", function( err, timestamp ) {
		var freq = cmToHz(this.cm);
		console.log('cm', this.cm, ' to ', freq, 'Hz');
		io.sockets.emit('freq:change', {x: freq});
	});

});


// "read" get the current reading from the potentiometer
/*
board.on("ready", function() {
	var potentiometer = new five.Sensor({
			pin: "A0",
			freq: 100
	});
	potentiometer.on("read", function( err, value ) {
		//io.sockets.emit('plot', {x: this.normalized })
		io.sockets.emit('plot', {x: value })
		//console.log( value, this.normalized );
	});

});
*/

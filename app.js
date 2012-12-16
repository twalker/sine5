var argv = require('optimist').argv,
	express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	path = require('path'),
	stylus = require('stylus'),
	nib = require('nib'),
	five = require("johnny-five");

var ranges = {
	distance: {
		min: 60, max: 120
	},

	pitch: {
		// range of 88 key piano => min: 27.5, max: 4186.01
		// human hearing range => min: 20, max: 20000
		min: 27.5,	max: 4186.01
	}
};

server.listen(process.env.PORT || 3000);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(app.router);
app.locals.pretty = true;
app.locals({ranges: ranges});
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

// TODO: convert to factory, or try to get johnny-five.Fn exposed.
function voltsToHz(value){
	var vRange = ranges.distance;
		hzRange = ranges.pitch,
		//Figure out how 'wide' each range is
		leftSpan = vRange.max - vRange.min,
		rightSpan = hzRange.max - hzRange.min;

	if(value < vRange.min) value = vRange.min;
	if(value > vRange.max) value = vRange.max;

	// Convert the left range into a 0-1 range (float)
	var scaled = (value - vRange.min) / leftSpan;

	// Convert the 0-1 range into a value in the right range.
	var val = hzRange.min + (scaled * rightSpan);
	var val = (value - vRange.min) * (hzRange.max - hzRange.min) / (vRange.max - vRange.min) + hzRange.min;

	return val;
}

// extra normalization to smooth values
// TODO: find a clean way to implement this (minSamples?) in johnny-five.Sonor instead.
var samples = [];
var smooth = function smooth(v){
	//console.log('raw', v);
	//console.log('before', samples);
	samples.push(v);
	if(samples.length > 6){
		samples.splice(0, samples.length - 6);
	}
	//console.log('after', samples);
	var sum = samples.reduce(function(prev, current){
		return prev + current;
	});

	return sum / samples.length;
}


// check for board skipping.
if(argv.noboard) {
	console.log('Bypassing board. Boring, boring, boring.');
} else {
	var board = new five.Board();
	// "read" get the current reading from the proximity sensor
	board.on("ready", function() {
		var sonor = new five.Sonar({pin:"A0", freq: 30});
		sonor.on("read", function( err, v ) {
			var volts = smooth(this.voltage);
			var freq = voltsToHz(volts);
			io.sockets.emit('freq:change', {x: freq});
			//console.log('v', v, ' to ', freq, 'Hz');
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
}



var five = require("johnny-five"),
	board = new five.Board();

board.on("ready", function() {

	potentiometer = new five.Sensor({
		pin: "A0",
		freq: 250
	});

	// pinMode is set to OUTPUT by default

	board.repl.inject({
		pot: potentiometer
	});

  // "read" get the current reading from the potentiometer
	potentiometer.on("read", function( err, value ) {
		console.log( value, this.normalized );
	});

});
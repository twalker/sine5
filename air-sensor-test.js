var five = require("johnny-five"),
    board = new five.Board();

board.on("ready", function() {
    var sensor = new five.Sensor({pin:"A1", freq: 250});
	board.repl.inject({
	  sensor: sensor
	});

    var onRead = function onRead(err, val){
        console.log({argValue: val, normalized: this.normalized, scaled: this.scaled });
    };
    sensor.on("read", onRead);
});
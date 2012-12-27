var five = require("johnny-five"),
    board = new five.Board();

board.on("ready", function() {
    var sonor = new five.Sonar({pin:"A0", freq: 10});
    var count = 0;
    var onRead = function onRead(err, val){
        console.log({argValue: val, voltage: this.voltage, cm: this.cm, inches: this.inches });
        count++;
        //if(count >=20) sonor.removeListener("read", onRead);
    };
    sonor.on("read", onRead);
});
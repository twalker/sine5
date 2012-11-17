var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	path = require('path'),
	stylus = require('stylus'),
	nib = require('nib');

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
	res.render('index', { title: 'theremin' });
});

io.sockets.on('connection', function (socket) {
	socket.emit('server event', { from: 'server', to: 'client' });
	socket.on('client event', function (data) {
		console.log(data);
	});
	setInterval(function(){
		io.sockets.emit('plot', {data: Math.random(),timestamp: Date.now()})
	}, 1000)
});
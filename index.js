var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req , resp) =>{

	//resp.send('<h1> Hello world </h1>');
	resp.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket)=>{
	console.log('A user connected ')

	socket.on('disconnect', ()=>{
		console.log('user disconnected')
	})

	socket.on('chat message', (msg) => {
		console.log('message: ' + msg);

		io.emit('chat message', msg);
	});

	socket.broadcast.emit('hi');
})


http.listen(3000, () => {
	console.log('Server is runnig on *: 3000')
})
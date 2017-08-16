const express = require('express');
const app = express();

const apiai = require('apiai')(fbc621df9480473dbd17461fa1b03af3);

app.use(express.static(_dirname + '/views')); //html
app.use(express.static(_dirname + '/public')); //js, css, images

const server = app.listen(5000);
app.get('', (req, res) => {
    res.sendFile('index.html');
});

io.on('connection', function(socket) {
	socket.on('chat message', (text) => {

		// Get reply from API.AI
		
		let apiaiReq = apiai.textRequest(text, {
			sessionId: APIAI_SESSION_ID
		});

		apiaiReq.on('response', (response) => {
			let aiText = response.result.fulfillment.speech;
			socket.emit('bot reply', aiText); // send teh result back to the browser!
		});

		apiaiReq.on('error', (error) => {
			console.log(error);
		});

		apiaiReq.end();
	});
});
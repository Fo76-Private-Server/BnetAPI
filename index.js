var express = require('express');
var fs = require('fs');
var app = express();
var expressWs = require('express-ws')(app);
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all("*", function (req, resp, next) {
	console.log(req.method + ' ' + req.path);
	next();
});

app.post('/cms/message', function (req, res) {
	res.send(fs.readFileSync('Messages/cms_message'));
});

app.post('/session/login', function (req, res) {
	res.send(fs.readFileSync('Messages/session_login'));
});

app.post('/session/logout', function (req, res) {
	res.send(fs.readFileSync('Messages/session_logout'));
});

app.get('/session/get-login-token', function (req, res) {
	res.send(fs.readFileSync('Messages/session_get-login-token'));
});

app.get('/titlestorage/v1/products/my-product/platforms/pc/slots/1/branches/prodpc01', function (req, res) {
	res.send(fs.readFileSync('Messages/titlestorage_v1_products_my-product_platforms_pc_slots_1_branches_prodpc01'));
});

app.get('/notification/v1/system', function (req, res) {
	res.send(fs.readFileSync('Messages/notification_v1_system'));
});

app.post('/log/collect_errordata', function (req, res) {
	res.send(fs.readFileSync('Messages/log_collect-errordata'));
});

app.get('/mtx-store/sso/store', function (req, res) {
	res.send(fs.readFileSync('Messages/mtx-store_sso_store'));
});

app.post('/log/v3/collect_logdata', function (req, res) {
	res.send(fs.readFileSync('Messages/log_v3_collect-logdata'));
});

app.get('/public/ID_1/pc/1/prodpc01/ID_2', function (req, res) {
	res.send(fs.readFileSync('Messages/public_id_pc_1_prodpc01_id'));
});

app.post('/presence/v1/presence', function (req, res) {
	res.send(fs.readFileSync('Messages/presence_v1_presence'));
});

app.get('/beam/accounts/me', function (req, res) {
	res.send(fs.readFileSync('Messages/beam_accounts_me'));
});

app.get('/social/v3/friends', function (req, res) {
	res.send(fs.readFileSync('Messages/social_v3_friends'));
});

app.get('/social/v3/friends/block', function (req, res) {
	res.send(fs.readFileSync('Messages/social_v3_friends_block'));
});

app.get('/social/v3/friends/requests', function (req, res) {
	res.send(fs.readFileSync('Messages/social_v3_friends_requests'));
});

app.get('/social/v3/friends/requests/sent', function (req, res) {
	res.send(fs.readFileSync('Messages/social_v3_friends_requests_sent'));
});

app.get('/entitlements/search', function (req, res) {
	res.send(fs.readFileSync('Messages/entitlements_search'));
});

app.get('/ping', function (req, res) {
	res.send('pong');
});

app.put('/bps/pub/ticket', function (req, res) {
	req.socket.setKeepAlive(true, 100000);
	res.send(fs.readFileSync('Messages/bps_pub_ticket'));
});

app.post('/bps/pub/ticket', function (req, res) {
	//console.log(req.body);
	//console.log(JSON.stringify(req.headers));
	req.socket.setKeepAlive(true, 100000);
	res.set('Content-Type', 'application/json');
	res.status(200);
	res.send(fs.readFileSync('Messages/bps_pub_ticket_post'));
});

app.post('/bps/pub/v2/login', function (req, res) {
	res.send(fs.readFileSync('Messages/bps_pub_v2_login'));
});

app.get('/bps/pub/character/list', function (req, res) {
	res.send(fs.readFileSync('Messages/bps_pub_character_list'));
});

app.get('/bps/pub/matchmake/playlists', function (req, res) {
	res.send(fs.readFileSync('Messages/bps_pub_matchmake_playlists'));
});

app.ws('/bps/pub/wsa', function(ws, req) {
	ws.on('message', function(msg) {
		console.log(msg.toString('utf8'));
	});
});

app.post('/bps/pub/character/create', function (req, res) {
	res.send(fs.readFileSync('Messages/bps_pub_character_create'));
});

app.post('/bps/pub/v2/matchmake/find', function (req, res) {
	for(var ws of expressWs.getWss().clients) {
		//console.log(new Buffer(fs.readFileSync('Messages/websocket_matchmaking_found')));
		ws.send(fs.readFileSync('Messages/websocket_matchmaking_found'));
	}
	res.send(fs.readFileSync('Messages/bps_pub_v2_matchmake_find'));
});

app.listen(80, function () {
	console.log('Listening on port 80!');
});

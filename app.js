var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('crslist.db');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

// Begin code for search!!
app.get('/search', function(req, res) {
	var query = req.query.q;
	var the_data_to_send = [];

    // WARNING THIS IS VULNERABLE TO SQL INJECTION
    db.all('SELECT authors, time, title FROM importedcrs where title like "%' + query + '%" ', function(err, rows) {
    	rows.forEach(function(row){
    		the_data_to_send.push(row);
    	});
    	
    	res.send(the_data_to_send);
    	the_data_to_send.length = 0;
    });
});
// End code for search

app.get('/about', function(req, res){
	res.render('about', {
		title: 'About'
	});
});



var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('CRSReports App listening at http://%s:%s/crs-test', host, port);});

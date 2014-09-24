var util = require('util')
var exec = require('child_process').exec;
var express = require('express');
var fs = require('fs');
var app = express();

var config;

fs.readFile(__dirname+'/config.json', function read(err, data) {
    if (err) {
        throw err;
    }
    config = JSON.parse(data);
    serverStart()
});

var serverStart = function(){

	app.post('/deploy/:repository', function(req, res) {
		deploy(req.params.repository)
		res.send('Zeffy loves you!');
	});

	app.get('/deploy/:repository', function(req, res) {
		deploy(req.params.repository)
		res.send('You did it!');
	});

	function deploy(repository){
		console.log('Deploying: '+repository)
		var arguments = [];
		arguments.push(config.basePath)
		arguments.push(config.user)
		arguments.push(config.password)
		arguments.push(repository)
		arguments = arguments.join(' ');

		var command = __dirname+'/deploygit.sh'+' '+arguments;

		var puts = function(error, stdout, stderr) {util.puts(stdout)}

		

		exec(command, puts);
	}

	app.listen(process.env.PORT || config.port);

}
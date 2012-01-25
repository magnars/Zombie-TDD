
/**
 * Module dependencies.
 */

var express = require('express');
var faye = require("faye");

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/client_dependencies'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/lib'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

var bayeux = new faye.NodeAdapter({ mount: '/faye', timeout: 45 });
var renderBuilding = require('lib/shared/building-renderer');

app.get('/', function(req, res){
  res.render('index', {
    title: 'Zombie TDD',
    buildingHTML: renderBuilding({
      zombies: 50,
      barricade: 98,
      rooms: [ { name: 'Trapdoor' } ],
      sleepers: 4
    })
  });
});

bayeux.attach(app);
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

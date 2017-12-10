var ejs = require("ejs");
var winston = require('winston');
var util = require('util');

var queryLogger = new (winston.Logger)({
    level:"info",
    transports: [
    new (winston.transports.File)({ filename: 'query_trace.log'})
  ]
});



module.exports = function(app){
	
	app.get('/', function(req,res){
		
		res.render('Home');
	});
	
	
	
	app.get('/Comparison', function(req,res){
		
		var sample = {datas:[100,100,100,100]};
		var graphData = JSON.stringify(sample);
		var graphParse = JSON.parse(graphData);
	
		
		ejs.renderFile('./views/Comparison.ejs',{data1:graphParse,data2:graphParse},function(err, result) {
	        // render on success
	        if (!err) {
	            res.end(result);
	        }
	        // render or error
	        else {
	            res.end('An error occurred');
	            console.log(err);
	        }
	    });
		
		//res.render('Comparison');
	});
	
	app.get('/api/processJSON', function(req,res){
		
		//API will be called from the upload page.
		//Logic for inserting JSON in MongoDB and Processing file for clustoring 
		//will be written here.
		//After processing app.render('/Comparison') will be called.
		
		
		
		
	});
	
	app.get('/query1', function(req, res, next) {
  queryLogger.info("select * from flight_transaction where destination_city in (select destination_city from flight_transaction where booking_amount > (select avg (booking_amount ) from flight_transaction)) order by destination_city");

});

app.get('/query2', function(req, res, next) {
  queryLogger.info("select kayak_database_t.car_transaction.user_id as user_id1, user_id as userid2, a.src_city from kayak_database_t.car_transaction , kayak_database_t.car_transaction  where kayak_database_t.car_transaction.user_id <> kayak_database_t.car_transaction.user_id and a.src_city=b.src_city order by a.src_city");
});

app.get('/query3', function(req, res, next) {
  queryLogger.info("select * from flight_transaction where destination_city in (select destination_city from flight_transaction where booking_amount > (select avg(booking_amount) from flight_transaction)) order by destination_city");
});

app.get('/indexgenerator', function(req, res, next){
    const options = {
      until: new Date(),
      order: 'desc',
      fileds:["message"]
    };

    queryLogger.query(options, function (err, results) {
      if(err){
        res.status(401).json({result:[]})
      }
      var analysys_result = util.parseLogLine(results);
      console.log("analysys_result",analysys_result);
      results.file.map((data)=>{
        console.log(data);
      });
      res.status(201).json({result:results});
      });

});
	
};

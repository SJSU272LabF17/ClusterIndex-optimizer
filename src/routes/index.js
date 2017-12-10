var ejs = require("ejs");
var winston = require('winston');
var util = require('./util');

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

	});

  app.get('/query1', function(req, res, next) {
    queryLogger.info("select user.first_name, user.last_name, user.company, user.country_code, country.country from user, country where user.country_code = country.country_code order by user.user_id");
    res.status(201).json({result:"user country details executed"});
  });

  app.get('/query2', function(req, res, next) {
    queryLogger.info("select user.first_name, user.last_name, user.company, stock.stock_sector, stock.stock_symbol, stock.stock_market_cap from user, stock where user.company = stock.company and stock.stock_sector in ('Technology', 'Finance')");
    res.status(201).json({result:"user's company stock details executed"});
  });

  app.get('/query3', function(req, res, next) {
    queryLogger.info("select country.country, user.gender, count(*) from user, country where user.country_code = country.country_code group by country.country, user.gender order by user.country_code");
    res.status(201).json({result:" male to female ratio executed"});
  });
  app.get('/query4', function(req, res, next) {
    queryLogger.info("select user.first_name, user.last_name, user.company, company.street_number, company.street_name, company.city, company.state, company.country from user, company where user.company = company.company order by user.user_id");
    res.status(201).json({result:"user company executed"});
  });
  app.get('/query5', function(req, res, next) {
    queryLogger.info("select user.user_id, user.first_name, user.last_name, user.addressId, address.street_name, address.city, address.state from user, address where user.addressId = address.addressId order by user.user_id");
    res.status(201).json({result:"user details executed"});
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
        var analysys_result = util.parseLogLine(results.file);
        console.log("analysys_result",analysys_result);
        results.file.map((data)=>{
          console.log(data);
        });
        res.status(201).json({result:analysys_result});
        });

  });

};

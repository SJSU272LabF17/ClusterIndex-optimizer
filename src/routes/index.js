var ejs = require("ejs");
var winston = require('winston');
var util = require('./util');
var connection1 = require('./connections/mysql_without_index');
var connection2 = require('./connections/mysql_with_index');
var mongoose = require('mongoose');
var graphDataModel = require('../model/graph_data');
var mongoURL = "mongodb://localhost:27017/cmpe_graph_database";
var promise = mongoose.connect(mongoURL, {
    useMongoClient: true
});

var queryLogger = new (winston.Logger)({
    level:"info",
    transports: [
    new (winston.transports.File)({ filename: 'query_trace.log'})
  ]
});

function executeQuery(connection,query,callback) {
    var pre_query = new Date().getTime();

    var exTime = 0;

    var post_query = 0;

    try{
        connection.dbOperation(function(err, result) {

            post_query = new Date().getTime();

            exTime = (post_query - pre_query) / 1000;

            callback(exTime);

        },query);
    }
    catch(e){
        console.log("\nError"+e);
    }
}

module.exports = function(app){

	app.get('/', function(req,res){
		res.render('Home');
	});

	app.get('/Comparison', function(req,res){

		ejs.renderFile('./views/Comparison.ejs',{data1:[0,0,0,0,0],data2:[0,0,0,0,0]},function(err, result) {
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

  app.get('/getQueryExecutionTimeWithoutIndex', function(req, res, next) {

      console.log("\nGetting without indexed time out");

      var queries = [
          "select user.first_name, user.last_name, user.company, user.country_code, country.country from user, country where user.country_code = country.country_code order by user.user_id",
          "select user.first_name, user.last_name, user.company, stock.stock_sector, stock.stock_symbol, stock.stock_market_cap from user, stock where user.company = stock.company and stock.stock_sector in ('Technology', 'Finance')",
          "select country.country, user.gender, count(*) from user, country where user.country_code = country.country_code group by country.country, user.gender order by country.country",
          "select user.first_name, user.last_name, user.company, company.street_number, company.street_name, company.city, company.state, company.country from user, company where user.company = company.company order by user.user_id",
          "select user.user_id, user.first_name, user.last_name, user.addressId, address.street_name, address.city, address.state from user, address where user.addressId = address.addressId order by user.user_id"
      ];

    // queryLogger.info("select user.first_name, user.last_name, user.company, user.country_code, country.country from user, country where user.country_code = country.country_code order by user.user_id");
    //
    // queryLogger.info("select user.first_name, user.last_name, user.company, stock.stock_sector, stock.stock_symbol, stock.stock_market_cap from user, stock where user.company = stock.company and stock.stock_sector in ('Technology', 'Finance')");
    //
    // queryLogger.info("select country.country, user.gender, count(*) from user, country where user.country_code = country.country_code group by country.country, user.gender order by user.country_code");
    //
    // queryLogger.info("select user.first_name, user.last_name, user.company, company.street_number, company.street_name, company.city, company.state, company.country from user, company where user.company = company.company order by user.user_id");
    //
    // queryLogger.info("select user.user_id, user.first_name, user.last_name, user.addressId, address.street_name, address.city, address.state from user, address where user.addressId = address.addressId order by user.user_id");

    var exTimeWithoutIndex = [];

    var count = 0;

    queries.forEach((query)=>{

        console.log("\nExecuted - "+query);

        queryLogger.info(query);

        executeQuery(connection1,query,(result)=>{
            console.log(result);
            exTimeWithoutIndex.push(result);
            count++;

            if(count === 5){

                console.log("\nTime array - "+exTimeWithoutIndex);

                graphDataModel.addData({type:"without"},{
                    type:"without",query1:exTimeWithoutIndex[0],
                    query2:exTimeWithoutIndex[1],query3:exTimeWithoutIndex[2],
                    query4:exTimeWithoutIndex[3],query5:exTimeWithoutIndex[4]},{upsert:true},(result)=>{

                    ejs.renderFile('./views/Comparison.ejs',{data1:exTimeWithoutIndex,data2:[]},function(err, result) {
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

                });

                //res.status(201).json({dataWithoutIndex:exTimeWithoutIndex,dataWithIndex:[]});

            }
        });

    });

  });

    app.get('/getQueryExecutionTimeWithIndex', function(req, res, next) {

        console.log("\nGetting indexed time out");

        var queries = [
            "select user.first_name, user.last_name, user.company, user.country_code, country.country from user, country where user.country_code = country.country_code order by user.user_id",
            "select user.first_name, user.last_name, user.company, stock.stock_sector, stock.stock_symbol, stock.stock_market_cap from user, stock where user.company = stock.company and stock.stock_sector in ('Technology', 'Finance')",
            "select country.country, user.gender, count(*) from user, country where user.country_code = country.country_code group by country.country, user.gender order by country.country",
            "select user.first_name, user.last_name, user.company, company.street_number, company.street_name, company.city, company.state, company.country from user, company where user.company = company.company order by user.user_id",
            "select user.user_id, user.first_name, user.last_name, user.addressId, address.street_name, address.city, address.state from user, address where user.addressId = address.addressId order by user.user_id"
        ];

        var exTimeWithIndex = [];

        var count = 0;

        queries.forEach((query)=>{

            console.log("\nExecuted - "+query);

            executeQuery(connection2,query,(result)=>{
                exTimeWithIndex.push(result);
                count++;
                console.log("\nTime array - "+exTimeWithIndex);

                if(count === 5){

                    var exTimeWithoutIndex = [];

                    // get data from mongodb for without indexed
                    graphDataModel.searchData({type:"without"},(err,result)=>{
                        if(err){
                            console.log("Error connecting - Mongodb"+err);
                        }
                        else{

                            console.log("Result from mongodb - "+result.query1+" "+result.query2+" "+result.query3+" "+result.query4+" "+result.query5);

                            exTimeWithoutIndex = [result.query1,result.query2,result.query3,result.query4,result.query5]

                            graphDataModel.addData({type:"with"},{
                                type:"with",query1:exTimeWithIndex[0],
                                query2:exTimeWithIndex[1],query3:exTimeWithIndex[2],
                                query4:exTimeWithIndex[3],query5:exTimeWithIndex[4]},{upsert:true},(result)=>{

                                ejs.renderFile('./views/Comparison.ejs',{data1:exTimeWithoutIndex,data2:exTimeWithIndex},function(err, result) {
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

                            });

                        }
                    });

                    // var sample = {datas:[100,100,100,100]};
                    // var graphData = JSON.stringify(sample);
                    // var graphParse = JSON.parse(graphData);

                    //res.status(201).json({dataWithoutIndex:exTimeWithoutIndex,dataWithIndex:exTimeWithIndex});

                }

            });

        });


    });

  app.get('/indexGenerator', function(req, res, next){

      const options = {
        until: new Date(),
        order: 'desc',
        fileds:["message"]
      };

      var tables = [];

      var columns = [];

      queryLogger.query(options, function (err, results) {

        if(err){
          res.status(401).json({result:[]})
        }

        var analysys_result = util.parseLogLine(results.file);

        console.log("\nanalysys_result",analysys_result);

        for(var key in analysys_result){

            console.log("\nKey is - "+key);

            // push table name to table array
            tables.push(key);

            var tempColumns = analysys_result[key];

            var tableColumns = [];

            var columnCounts = [];

            for(var k in tempColumns){

                console.log("\nKey in columns -"+k);

                tableColumns.push(k);

                columnCounts.push(tempColumns[k]);

            }

            var max = Math.max.apply(Math, columnCounts);

            var index = columnCounts.indexOf(max);

            // push column name to column array
            columns.push(tableColumns[index]);

        }

        var counter = 0;

        columns.forEach((column)=>{

            console.log("\nCreating index for "+tables[counter]+" on column "+column+"\n"+"CREATE INDEX id_"+column+"_"+Math.random()+" ON "+tables[counter]+(column)+"\n");

            var tb = (tables[counter]).toLowerCase();

            var cl = column.toLowerCase();

            console.log("tb - "+tb+" cl -"+cl);

            var indexQuery = "CREATE INDEX id_"+column+"_ ON "+tb+"("+cl+")";

            executeQuery(connection2,indexQuery,(err,result)=>{
                if(err){
                    console.log(err);
                }
            });

            counter++;

            if(counter === 5){

                results.file.map((data)=>{
                    console.log(data);
                });

                var exTimeWithoutIndex = [];

                // get data from mongodb for without indexed
                graphDataModel.searchData({type:"without"},(err,result)=>{
                    if(err){
                        console.log("Error connecting - Mongodb"+err);
                    }
                    else{

                        console.log("Result from mongodb - "+result.query1+" "+result.query2+" "+result.query3+" "+result.query4+" "+result.query5);

                        exTimeWithoutIndex = [result.query1,result.query2,result.query3,result.query4,result.query5]

                        ejs.renderFile('./views/Comparison.ejs',{data1:exTimeWithoutIndex,data2:[]},function(err, result) {
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
                    }
                });

                // res.status(201).json({result:analysys_result});

            }

        });

      });

  });

};

var ejs = require("ejs");

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
	
};

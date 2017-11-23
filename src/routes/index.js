

module.exports = function(app){
	
	app.get('/', function(req,res){
		
		res.render('Home');
	});
	
	app.get('/Upload', function(req,res){
		
		res.render('Upload');
	});
	
	app.get('/Comparison', function(req,res){
		
		res.render('Comparison');
	});
	
	app.get('/api/processJSON', function(req,res){
		
		//API will be called from the upload page.
		//Logic for inserting JSON in MongoDB and Processing file for clustoring 
		//will be written here.
		//After processing app.render('/Comparison') will be called.
		
		
		
		
	});
	
};

var ejs = require("ejs");


module.exports = function (app) {

    var fileUpload = require('express-fileupload');

    app.get('/', function (req, res) {

        res.render('Home');
    });

    app.get('/Upload', function (req, res) {

        res.render('Upload');
    });

    app.get('/Comparison', function (req, res) {

        res.render('Comparison');
    });

    app.post('/api/processJSON', function (req, res) {

        //API will be called from the upload page.
        //Logic for inserting JSON in MongoDB and Processing file for clustoring
        //will be written here.
        //After processing app.render('/Comparison') will be called.

        console.log("In /api/processJSON");
        console.log(req.files);
        console.log(req.files.sampleFile);

        let sample = req.files.sampleFile;

        sample.mv('C:/Users/admin/Desktop/272 Project/src/public/uploads/mno.png', function (err) {
            console.log("File uploaded");
        });

    });
}


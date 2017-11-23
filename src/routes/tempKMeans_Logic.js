var express = require('express');
var router = express.Router();
const kmeans = require('node-kmeans');
const mongo = require('./mongo');
const mongoURL = "mongodb://localhost:27017/cmpe272";


/* GET users listing. */
//var data = require('./cluster_data');
//console.log(data.car_data);
/*const data = [
  {'company': 'Microsoft' , 'size': 91259, 'revenue': 60420},
  {'company': 'IBM' , 'size': 400000, 'revenue': 98787},
  {'company': 'Skype' , 'size': 700, 'revenue': 716},
  {'company': 'SAP' , 'size': 48000, 'revenue': 11567},
  {'company': 'Yahoo!' , 'size': 14000 , 'revenue': 6426 },
  {'company': 'eBay' , 'size': 15000, 'revenue': 8700},
];*/
const data=[
  {
      'model_no': 'HZN814',
      'capacity': 50,
      'no_of_bags': 4,
      'no_of_doors': 5,
      'price': 199,
      'src_city': 'alexandria',
      'destination_city': 'alexandria',
      'rental_agency': 'Avis',
      'car_type': 'Small'
   }, {
   'model_no': 'HZN814',
   'capacity': 3,
   'no_of_bags': 4,
   'no_of_doors': 5,
   'price': 199,
   'src_city': 'alexandria',
   'destination_city': 'alexandria',
   'rental_agency': 'Avis',
   'car_type': 'Small'
}, {
     'model_no': 'HZN814',
     'capacity': 4,
     'no_of_bags': 4,
     'no_of_doors': 5,
     'price': 200,
     'src_city': 'alexandria',
     'destination_city': 'alexandria',
     'rental_agency': 'Avis',
     'car_type': 'Small'
  },  {
    'model_no': 'HZN814',
    'capacity': 4,
    'no_of_bags': 4,
    'no_of_doors': 5,
    'price': 201,
    'src_city': 'alexandria',
    'destination_city': 'alexandria',
    'rental_agency': 'Avis',
    'car_type': 'Small'
 },  {
   'model_no': 'HZN814',
   'capacity': 20,
   'no_of_bags': 4,
   'no_of_doors': 5,
   'price': 10000000,
   'src_city': 'alexandria',
   'destination_city': 'alexandria',
   'rental_agency': 'Avis',
   'car_type': 'Small'
},  {
  'model_no': 'HZN814',
  'capacity': 20,
  'no_of_bags': 4,
  'no_of_doors': 5,
  'price': 501,
  'src_city': 'alexandria',
  'destination_city': 'alexandria',
  'rental_agency': 'Avis',
  'car_type': 'Small'
},  {
  'model_no': 'HZN814',
  'capacity': 50,
  'no_of_bags': 4,
  'no_of_doors': 5,
  'price': 1000,
  'src_city': 'alexandria',
  'destination_city': 'alexandria',
  'rental_agency': 'Avis',
  'car_type': 'Small'
},  {
  'model_no': 'HZN814',
  'capacity': 50,
  'no_of_bags': 4,
  'no_of_doors': 5,
  'price': 1005,
  'src_city': 'alexandria',
  'destination_city': 'alexandria',
  'rental_agency': 'Avis',
  'car_type': 'Small'
}

];

// Create the data 2D-array (vectors) describing the data




router.get('/', function(req, res, next) {
  console.log('User Kmean');
  let vectors = new Array();
  for (let i = 0 ; i < data.length ; i++) {
    vectors[i] = [ data[i]['price'] , data[i]['capacity']];
  }
  console.log('User Kmean',kmeans);

  let clusters = 4;

  kmeans.clusterize(vectors, {k: clusters}, (err,result) => {
    if (err) console.error(err);
    else console.log('%o',result);
    console.log('User clusterize',result);
    let i = 0;
    mongo.connect(mongoURL, function(){

        result.forEach((r) => {
            const coll1 = mongo.collection("group"+(i+1));
            (r.clusterInd).forEach((c)=>{
                console.log("for "+c);
                let temp = data[c];
                coll1.insertOne({temp}, function (err, user) {
                    console.log("Inserted document for"+coll1);
                });
            });
            i += 1;
        });

    });

    res.status(201).json({result:result});

  });
});

module.exports = router;

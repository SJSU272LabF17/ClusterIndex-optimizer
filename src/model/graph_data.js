var mongoose = require('mongoose');

var GraphDataSchema = mongoose.Schema({
  type:{
    type: String,
    required:true
  },
  query1:{
    type:Number,
    required:true
  },
  query2:{
    type:Number,
    required:true
  },
  query3:{
    type:Number,
    required:true
  },
  query4:{
    type:Number,
    required:true
  },
  query5:{
    type:Number,
    required:true
  }
});

const GraphData = mongoose.model('graph_data',GraphDataSchema);

function addData(graphdata, callback){
  graphdata.save(graphdata,callback);

}

function searchData(type, callback){
  GraphData.find({type:type}, callback);

}

module.exports.addData = addData;
module.exports.searchData = searchData;
module.exports.GraphData = GraphData;

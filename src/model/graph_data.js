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

function addData(query,gdata,upsert,callback){
    GraphData.update(query,gdata,upsert,callback);

}

function searchData(type, callback){
    GraphData.findOne(type, callback);
}

module.exports.addData = addData;
module.exports.searchData = searchData;
module.exports.GraphData = GraphData;
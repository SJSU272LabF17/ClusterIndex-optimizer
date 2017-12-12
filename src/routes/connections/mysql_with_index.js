var mysql = require('mysql');

function getConnection(){
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'user_with_index',
        port	 : 3306
    });
    return connection;
}

function dbOperation(callback,sqlQuery){

    console.log("\nSQL Query : "+sqlQuery);

    var connection=getConnection();

    connection.query(sqlQuery, function(err, rows, fields) {
        if(err){
            console.log("\n ERROR: " + err.message);
        }
        else
        {
            // return err or result
            console.log("\n DB Results : "+rows.length);
            callback(err, rows);
        }
            console.log("\n Connection closed.");
            connection.end();
    });

}
exports.dbOperation = dbOperation;
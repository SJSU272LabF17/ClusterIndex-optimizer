// author : arijit.mandal@sjsu.edu (Arijit Mandal)


function parseLogLine (querylist){
var sqlkeywords = ["AND","OR","ORDER","GROUP","<","<=",">",
                   ">=","=","<>","WHERE","INNER","LEFT","RIGHT","OUTER","CROSS","SELF","BY",
                  "SELECT","FROM","AVG","SUM","MAX","MIN","COUNT","IN"]
var tableBoundary = ["WHERE","INNER","LEFT","RIGHT","OUTER","CROSS","SELF","AS"];
var colBoundary = ["AND","OR","ORDER","GROUP","<","<=",">",">=","=","<>"];
var aliasMapping ={};
var tables = new Set();
var columns = new Set();
var result = {}
var aliasreg = new RegExp('.+,$')
querylist.map((query)=>{
    console.log("query.message:\n",query.message);
    var query_array = query.message.split(' ');
    for(var index=0;index<query_array.length;){
    var word = query_array[index].toUpperCase();
        //console.log("###",word);
    switch(word){

    case "FROM":
            console.log("matched from",word);
            index++;

            while(query_array[index] && tableBoundary.indexOf(query_array[index].toUpperCase())<0){
                var tablename = query_array[index].toUpperCase();
                tablename = tablename.replace(/[&\/\\#,+()$~%'":*?<>{}=]/g,'').trim();
                if(tablename && sqlkeywords.indexOf(tablename)< 0)
                    if(!result.hasOwnProperty(tablename)){
                        result[tablename] = {};
                        aliasMapping[tablename] = query_array[index-1];
                    }
                    tables.add(tablename);
                index++;
                console.log(tables, index);
            }
        break;
    case "JOIN":
            console.log("matched join",word);
            index++;

            while(query_array[index] && tableBoundary.indexOf(query_array[index].toUpperCase())<0){
                var tablename = query_array[index].toUpperCase();
                tablename1 = tablename.replace(/[&\/\\#,+()$~%'":*?<>{}=]/g,'').trim();
                if(tablename1 && sqlkeywords.indexOf(tablename1)< 0)
                    tables.add(tablename1);
                if(!result.hasOwnProperty(tablename1)){
                        result[tablename1] = {};
                    }
                index++;
                console.log(tables, index);
            }
        break;

    case "AND":
            console.log("matche AND",word);
            index++;
            while(query_array[index] && colBoundary.indexOf(query_array[index].toUpperCase())<0){
                var colname = query_array[index].replace(/[&\/\\#,+()$~%'":*?<>{}=]/g,'').trim().toUpperCase();
                if(colname && sqlkeywords.indexOf(colname)< 0){
                    columns.add(colname);
                    var tab_col = colname.split(".");
                     if(!result[tab_col[0]].hasOwnProperty(tab_col[1])){
                         result[tab_col[0]][tab_col[1]]=1;
                    }else{
                        result[tab_col[0]][tab_col[1]] +=1;
                    }
                }

                index++;
                console.log("And",query_array[index]);
            }
    case "WHERE": //1
            console.log("matche where",word);
            index++;
            while(query_array[index] && colBoundary.indexOf(query_array[index].toUpperCase())<0){
                var colname = query_array[index].replace(/[&\/\\#,+()$~%'":*?<>{}=]/g,'').trim().toUpperCase();
                console.log("colname:",colname);
                if(colname && sqlkeywords.indexOf(colname)< 0){
                    columns.add(colname);
                    var tab_col = colname.split(".");
                    if(!result[tab_col[0]].hasOwnProperty(tab_col[1])){
                        result[tab_col[0]][tab_col[1]]=1;
                    }else{
                        result[tab_col[0]][tab_col[1]]+=1
                    }
                }
                index++;
                console.log("where",query_array[index]);
            }
    case "BY": //2
            console.log("matche by",word);
            index++;
            while(query_array[index] && colBoundary.indexOf(query_array[index].toUpperCase())<0){
                var colname = query_array[index].replace(/[&\/\\#,+()$~%'":*?<>{}=]/g,'').trim().toUpperCase();
                if(colname && sqlkeywords.indexOf(colname)< 0){
                    columns.add(colname);
                    var tab_col = colname.split(".");
                    if(!result[tab_col[0]].hasOwnProperty(tab_col[1])){
                        result[tab_col[0]][tab_col[1]]=2;
                    }else{
                        result[tab_col[0]][tab_col[1]]+=2;
                    }
                }
                index++;
            }
        default:
            index++;
    }
}
});
return result;
}
exports.parseLogLine = parseLogLine;

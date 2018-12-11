const stats={};


stats.getStats=async(req,res)=>{

 var champs=[];
 champs=req.body;


    var fs = require('fs'); 
var parse = require('csv-parse');

var csvData=[];
fs.createReadStream('../lol/games.csv')
    .pipe(parse({delimiter: ':'}))
    .on('data', function(csvrow) {
       // console.log(csvrow);
        //do something with csvrow

        var bdAttr={
            "gameId":"",
            "seasonId":"",
            "winner":"",
            "t1_champ1id":"" ,
            "t1_champ2id":"",
            "t1_champ3id":"",
            "t1_champ4id":"",
            "t1_champ5id":"",
            "t1_ban1":"",
            "t1_ban2":"",
            "t1_ban3":"",
            "t1_ban4":"",
            "t1_ban5":"",
            "t2_champ1id":"",
            "t2_champ2id":"",
            "t2_champ3id":"",
            "t2_champ4id":"",
            "t2_champ5id":"",
            "t2_ban1":"",
            "t2_ban2":"",
            "t2_ban3":"",
            "t2_ban4":"",
            "t2_ban5":""
        }
        let rowArray=csvrow.toString().split(",");
        bdAttr.gameId=rowArray[0];
        bdAttr.seasonId=rowArray[3];
        bdAttr.winner=rowArray[4];
        bdAttr.t1_champ1id=rowArray[11];
        bdAttr.t1_champ2id=rowArray[14];
        bdAttr.t1_champ3id=rowArray[17];
        bdAttr.t1_champ4id=rowArray[20];
        bdAttr.t1_champ5id=rowArray[23];
        bdAttr.t1_ban1=rowArray[31];
        bdAttr.t1_ban2=rowArray[32];
        bdAttr.t1_ban3=rowArray[33];
        bdAttr.t1_ban4=rowArray[34];
        bdAttr.t1_ban5=rowArray[35];
        bdAttr.t2_champ1id=rowArray[36];
        bdAttr.t2_champ2id=rowArray[39];
        bdAttr.t2_champ3id=rowArray[42];
        bdAttr.t2_champ4id=rowArray[45];
        bdAttr.t2_champ5id=rowArray[48];
        bdAttr.t2_ban1=rowArray[56];
        bdAttr.t2_ban2=rowArray[57];
        bdAttr.t2_ban3=rowArray[58];
        bdAttr.t2_ban4=rowArray[59];
        bdAttr.t2_ban5=rowArray[60];
        csvData.push(bdAttr);        
    })
    .on('end',function() {
      //do something wiht csvData
    
    //   csvData.map((row,index)=>{

    //       console.log(row.gameId);
    //   })
    var results=[];
    
        champs.map((champion,index)=>{
            champObj={
                id:0,
                ganadas:0,
                perdidas:0,
                total:0,
                porcentaje_victoria:0,
                procentaje_perdida:0,
                baneado:0,
                porcentaje_baneo:0,
            }
            champObj.id=champion.id;
            champObj.ganadas=  csvData.filter(function(game){
               return (game.winner==1 && (game.t1_champ1id==champion.id || game.t1_champ2id==champion.id || game.t1_champ3id==champion.id || game.t1_champ4id==champion.id || game.t1_champ5id==champion.id)) || (game.winner==2 && (game.t2_champ1id==champion.id || game.t2_champ2id==champion.id || game.t2_champ3id==champion.id || game.t2_champ4id==champion.id || game.t2_champ5id==champion.id))
             
            }).length;

            champObj.perdidas=csvData.filter(function(game){
                return (game.winner==2 && (game.t1_champ1id==champion.id || game.t1_champ2id==champion.id || game.t1_champ3id==champion.id || game.t1_champ4id==champion.id || game.t1_champ5id==champion.id)) || (game.winner==1 && (game.t2_champ1id==champion.id || game.t2_champ2id==champion.id || game.t2_champ3id==champion.id || game.t2_champ4id==champion.id || game.t2_champ5id==champion.id))
              
             }).length;

             champObj.total=csvData.filter(function(game){
                return ( (game.t1_champ1id==champion.id || game.t1_champ2id==champion.id || game.t1_champ3id==champion.id || game.t1_champ4id==champion.id || game.t1_champ5id==champion.id)) || ( (game.t2_champ1id==champion.id || game.t2_champ2id==champion.id || game.t2_champ3id==champion.id || game.t2_champ4id==champion.id || game.t2_champ5id==champion.id))
              
             }).length;
             
             champObj.porcentaje_victoria=Math.round(((champObj.ganadas/champObj.total)*100)*100)/100;
             champObj.procentaje_perdida=Math.round(((champObj.perdidas/champObj.total)*100)*100)/100;

             champObj.baneado=csvData.filter(function(game){
                return game.t1_ban1==champion.id || game.t1_ban2==champion.id || game.t1_ban3==champion.id  || game.t1_ban4==champion.id  || game.t1_ban5==champion.id ||game.t2_ban1==champion.id || game.t2_ban2==champion.id || game.t2_ban3==champion.id  || game.t2_ban4==champion.id  || game.t2_ban5==champion.id 
              
             }).length;

             champObj.porcentaje_baneo=Math.round(((champObj.baneado/csvData.length)*100)*100)/100;

           results.push(champObj);
        })

        // var total=0;
        // results.map(result=>{
        //     total=total+result.partidas
        // });

      res.json({data:results});
    });
}

module.exports=stats;
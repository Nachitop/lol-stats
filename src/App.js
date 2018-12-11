import React, { Component } from 'react';
import Navigation from '../src/components/Navigation'
import './App.css'
import {champions} from '../src/lol/champion_info_2.json';

class App extends Component {
  
  constructor(){
    super();

    this.state={
      champs:[],
      stats:[],
      types:['controller','Fighter','Mage','Marksman','Slayer','Tank','Specialist'],
      Fighter:[],
     Mage:[],
     Marksman:[],
     Tank:[],
     champsClean:[],
     
    }
   
  }
  LlamarApi=async()=>{
   
    let respone=  await fetch('http://localhost:4000/api/lol/stats',{
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
          body: JSON.stringify(this.state.champs)
    });
    let stats= await respone.json();
    stats=stats.data.sort((a, b) => (b.porcentaje_victoria) - (a.porcentaje_victoria));

     
 
    stats.map((stat,index)=>{
      var champ=this.state.champs.find(champ=>champ.id==stat.id);

      if(champ.tags.find(tag=>tag=="Fighter")){
       this.state.Fighter.push(champ)
      }
      if(champ.tags.find(tag=>tag=="Mage")){
        this.state.Mage.push(champ)
      }
      if(champ.tags.find(tag=>tag=="Marksman")){
        this.state.Marksman.push(champ)
      }
      if(champ.tags.find(tag=>tag=="Tank")){
       this.state. Tank.push(champ)
      }
   

     
      
      
    });
    var statsClean=[];
      for(var i=1;i<=5;i++){
       this.state.champsClean.push( this.state.Fighter[i]);
      statsClean.push( stats.find(stat=>stat.id==this.state.Fighter[i].id))
      }
      for(var i=1;i<=5;i++){
        this.state.champsClean.push( this.state.Mage[i]);
        statsClean.push( stats.find(stat=>stat.id==this.state.Mage[i].id))
       }
       for(var i=1;i<=5;i++){
        this.state.champsClean.push( this.state.Marksman[i]);
        statsClean.push( stats.find(stat=>stat.id==this.state.Marksman[i].id))
       }
       for(var i=1;i<=5;i++){
        this.state.champsClean.push( this.state.Tank[i]);
        statsClean.push( stats.find(stat=>stat.id==this.state.Tank[i].id))
       }
   console.log(statsClean)
       
      
    // this.state.types.map((type, index)=>{
    //   var champs= this.state.champs.filter(champ=>
    
    //    champ.tags.find(tag=>tag==type)
    //   );
    
      //  var statsOrdenadosPorTag=[];
      //  var statsClean=[];
      //  champs.map((champ,index)=>{
      //  statsOrdenadosPorTag= stats.filter(stat=>
      //      stat.id==champ.id
      //   );
      //  }).length=5;
      //  statsClean.push(statsOrdenadosPorTag);
      //  console.log(statsClean)
      // stats=statsClean;
    // });
   // console.log(stats)
      //  stats=stats.filter(function(stat){
      //    if(this.state.champsClean.find(champ=>champ.id==stat.id)){
      //      return true
      //    }
      //    else{
      //      return false;
      //    }
      //  })

     this.setState({
      stats:statsClean
     });
 

  }

   componentDidMount(){
    var championArray=[];
   
    for(let key in champions){
      var championObj={
        id:0,
        name:"",
        key:"",
        image:"",
        tags:[],
      }
      championObj.id=champions[key].id;
      championObj.name=champions[key].name;
      championObj.key=key;
      championObj.image="https://ddragon.leagueoflegends.com/cdn/8.24.1/img/champion/"+key+".png";
      for(let tag in champions[key].tags){
        
        championObj.tags.push(champions[key].tags[tag]);
      }
      championArray.push(championObj);
    }
    this.setState({
      champs: championArray
    });
    
    
  }

 obtenerCuerpo(stat){
  if(stat.porcentaje_victoria>=50){
    return (
      <p className="alinear-p">WinRate: &nbsp;<span className="badge badge-pill badge-success"> {stat.porcentaje_victoria}%</span>&nbsp;&nbsp;</p>
    );
  }
  else{
    return (
      <p className="alinear-p">WinRate: &nbsp; <span className="badge badge-pill badge-danger" > {stat.porcentaje_victoria}%</span>&nbsp;&nbsp;</p>
    );
  }

 
 }

 
  render() {
   
   
   const ListarChamps=
  
   this.state.stats.map((stat,index)=>{
     var champion= this.state.champsClean.find(champ=>champ.id===stat.id);
    
      return(
      <div className="card " style={{width: '300px', marginTop:'30px', marginRight: '30px'}}>
        <img className="card-img-top" src={champion.image} alt={champion.name}></img>
        <div className="card-body">
          <div className="card-title text-center">{champion.name}</div>
          <div className="card-title text-center">{champion.tags[0]}, {champion.tags[1]}</div>
        <br></br>
        <div >
          {this.obtenerCuerpo(stat)}
          <p className="alinear-p">BanRate: &nbsp;  <span className="badge badge-pill badge-danger" > {stat.porcentaje_baneo}%</span>&nbsp;&nbsp;</p>
          </div>
          <br></br>
          <p className="alinear-p ">P. Ganadas: &nbsp;  <span className="azul">{stat.ganadas}</span>&nbsp;&nbsp;</p>
          <p className="alinear-p">P. Perdidas: &nbsp;  <span className="naranja">{stat.perdidas}</span>&nbsp;&nbsp;</p>
       
          <br>
          </br>
          <br>
          </br>
          <p className="text-center">P. Total: &nbsp; <span className="morado">{stat.total}</span></p>
        </div>
      </div>
      );
    });
  
   

    return (
      <div className="App h-100 ">
    
     <Navigation></Navigation>

     <div className="container">
      <div className="row">
     
        {ListarChamps}
      </div>


  
  
  
    <div className="row text-center" style={{marginTop : '22%'}}>
    <div className="col-12">
  
    <button type="button" className="btn btn-outline-dark centrar-boton  "  onClick={this.LlamarApi}>Generate Stats</button>
    </div>
    
    </div>
     
      </div>
      </div>
    );
  }
}

export default App;

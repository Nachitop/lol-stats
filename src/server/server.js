const express= require('express');
const app= express();
const path=require('path');

app.set('port', process.env.PORT || 4000)
app.use(express.json());

app.use('/api/lol/', require('./stats.routes'));

// app.use(express.static(path.join(__dirname.substring(0,28),'public')));

app.listen(app.get('port'),()=>{
    console.log("listen on port", app.get('port'));
});
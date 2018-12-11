const express= require('express');
const router= express.Router();


const stats=require('./stats.controller') ;

router.post('/stats',stats.getStats)

module.exports=router;
const express= require('express');
const app=express();
const port=8000;
const router=require('./routes/index');



app.use('/',router);
app.listen(port,function(err){
    if(err)
    {
       console.log(`Error in running the server :${err}`)
    }
    console.log(`server is running on port :${port}`)
})

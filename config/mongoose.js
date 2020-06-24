const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/social-networking');

const db=mongoose.connection;
db.on('error',console.error.bind(console,"error connecting to mongodb"));


db.once('open',function(){
   
    console.log('Connected to Database :: MongoDB')

})

module.exports=db;
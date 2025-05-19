const express = require("express");

const app = express();




app.use('/',(req,res)=> { 
res.send("Hello");
});

app.use('/test',(req,res)=> { 
res.send("test, Test , TEST");
});


app.listen(2000, ()=> { console.log("server is running at 2000")});
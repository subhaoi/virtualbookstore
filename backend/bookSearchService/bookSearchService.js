const app = require('express')();
const bodyParser = require('body-parser');
const superagent = require('superagent')
const xml2js = require('xml2js');
const fs = require('fs');
const parser = new xml2js.Parser({ attrkey: "ATTR" });
require('body-parser-xml')(bodyParser);
app.use(bodyParser.xml());

app.get('/',(req,res)=>{
    res.send("this is our main application")
})

app.get('/search',(req,res)=>{
    // console.log(req.body)
    res.send("Thank You")

    superagent
    .get('https://api.itbook.store/1.0/search/mongo')
    .end(function(err,res){

        console.log(res.body)

    })
})


app.listen(3000,()=>{
    console.log("service is on!")
})
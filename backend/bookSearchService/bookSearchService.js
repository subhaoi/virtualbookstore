const app = require('express')();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const superagent = require('superagent')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
           next();
  });
app.get('/',(req,res)=>{
    res.send("this is our main application")
})

app.post('/search',(req,res)=>{
    console.log(req.body.text)
    var books_json = {}
    var url = 'https://api.itbook.store/1.0/search/' + req.body.text
    superagent
    .get(url)
    .end(function(err,output){
        console.log(output.body)
        books_json = output.body
        return res
        .status(200)
        .json({ message: "Updated Succesfully", data: books_json });
    })
})


app.listen(3000,()=>{
    console.log("service is on!")
})
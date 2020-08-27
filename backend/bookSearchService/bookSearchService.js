// Book Search Service - Receives a search query from the frontend and searches for the books using IT_BOOK_API

const app = require('express')();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
var request = require('request')
  , JSONStream = require('JSONStream')
  , es = require('event-stream')
require('dotenv').config()

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
    var books = []
    var url = process.env.IT_BOOK_API + req.body.text
    request({url: url})
  .pipe(JSONStream.parse('books.*'))
  .pipe(es.mapSync(function (data) {
    books.push(data)
  })
  .on('end',function(){
      return res
        .status(200)
        .json({ message: "Updated Succesfully", data: {books:books} });
  })
  )
})


app.listen(3000,()=>{
    console.log('listening on port 3000');
})
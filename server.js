const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const con = mongoose.createConnection('mongodb://localhost/postdb');

const port = process.env.PORT || 8080;

const offers = require('./routes/api/offers');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// DB Config
const db = require('./config.js').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));


//API ROute
app.use('/api/offers', offers);


// app.get('*', function (req, res) {
//   app.use(express.static(path.join(__dirname, 'client/build')));
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

//serving static files
app.get('/', function (req, res) {
  app.use(express.static(path.join(__dirname, 'client/build')));
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});






//enable cors
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-T      ype, Accept");
   next();
})

try {
  app.listen(port, () => console.log(`Server started on port ${port}`));
} catch(e){
  console.log(e);
}

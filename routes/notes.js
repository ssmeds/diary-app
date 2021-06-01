var express = require('express');
var router = express.Router();
let cors = require('cors');

router.use(cors());

/* GET users listing. */
router.get('/', function (req, res, next) {

  req.app.locals.db.collection('notes').find().toArray()
    .then(results => {
      console.log("results from db", results);
      res.json(results);
    })
});

router.post('/add', function (req, res, next) {
  console.log("req.body:", req.body);

  req.app.locals.db.collection('notes').insertOne(req.body)
    .then(results => {
      // console.log(results);
      res.redirect('https://ssmeds.github.io/diary-app-frontend/')
    })


});

module.exports = router;
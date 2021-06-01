var express = require('express');
var router = express.Router();
let cors = require('cors');

router.use(cors());

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
  let userName = req.body.userName;
  let userPass = req.body.userPass;
  console.log("req.body", req.body);

  req.app.locals.db.collection('users').findOne({
      userName: userName
    })
    .then(results => {
      console.log("results from db", results);
      console.log("userPass", userPass);
      if (results != null) {
        if (userPass === results.userPass) {

          let sendData = {
            userName: userName
          }

          res.json(sendData);
        } else {
          res.json({
            msg: 'Felaktig inloggning'
          })
        }
      } else {
        res.json({
          msg: 'Felaktig inloggning'
        })
      }
    })
});

router.post('/reg', function (req, res, next) {
  console.log('req.body', req.body);
  let userName = req.body.userName;
  let userPass = req.body.userPass;

  req.app.locals.db.collection('users').insertOne({
      userName: userName,
      userPass: userPass
    })
    .then(result => {
      let registered = {
        userName: userName
      }
      // console.log("results från reg", result);
      console.log("registered", registered);
      res.json(registered)
    });

})
module.exports = router;
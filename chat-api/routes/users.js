var express = require('express');
var router = express.Router();


router.post('/login', function(req, res, next) {
   require('../controllers/UserController').login(req, res);
});

router.post('/signup',function(req,res,next){
  require('../controllers/UserController').signup(req,res);
})
module.exports = router;

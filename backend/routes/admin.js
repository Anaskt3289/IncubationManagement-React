var express = require('express');
var router = express.Router();
const adminHelper = require('../Helpers/adminHelper')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  if(!req.body.email || !req.body.pword){
res.status(400).json({errMsg:'Enter the required details'})
  }else{
    adminHelper.verifyAdmin(req.body).then((response)=>{
      if(response.adminVerified){
        res.status(200).json({msg:'success'})
      }else[
        res.status(400).json({errMsg:'Entered credentials are incorrect'})
      ]
    }).catch((err)=>{
      console.log(err);
    })
  }

});

router.get('/getApplications', function(req, res, next) {
  adminHelper.getApplications().then((resp)=>{
    res.status(200).json(resp)
  }).catch((err)=>{
    res.status(500).json(err)
  })
});


router.get('/changeStatus/:id/:status', function(req, res, next) {

  adminHelper.changeStatus(req.params.id ,req.params.status).then(()=>{
    res.status(200).json({msg:'success'})
  }).catch((err)=>{
   res.status(500).json(err)
  })
 
});


router.get('/getBookingSlots', function(req, res, next) {

  adminHelper.getBookingSlots().then((resp)=>{

    res.status(200).json(resp)

  }).catch((err)=>{
    res.status(500).json(err)
   })
 
});

router.post('/bookSlot', function(req, res, next) {

 adminHelper.bookSlot(req.body).then(()=>{
  res.status(200).json({msg:'success'})
 }).catch((err)=>{
  res.status(500).json(err)
 })
 
});


router.get('/getApplicationDetail/:applicationId', function(req, res, next) {

  adminHelper.getApplicationDetail(req.params.applicationId).then((application)=>{
   
    res.status(200).json(application)

  }).catch((err)=>{
    res.status(500).json(err)
  })
   
 });

module.exports = router;

var express = require('express');
var router = express.Router();
const userHelper = require('../Helpers/userHelper')
const jwt = require("jsonwebtoken");
const multer = require('multer')
const fs = require('fs')

const jwtSecret = process.env.JWT_SECRET

var storage = multer.diskStorage({
  destination: function (req,file,cb) {
    cb(null,'./public/temp-logo')
  },
  filename:function (req,file,cb) {
    cb(null,'companylogo.jpg')
  }
})

var upload = multer({storage:storage}).single('logo')

router.get('/', function (req, res, next) {
  res.send('server started')
});

router.post('/signup', function (req, res, next) {
  try {
    console.table(req.body)

    const { name, email, pword, repword } = req.body
    if (!email || !pword || !name || !pword) {
      res.status(400).json({ errMsg: 'Enter the required details' })
    } else if (pword.length < 6) {
      res.status(400).json({ errMsg: 'Password should have minimum 6 letters' })
    } else if (pword != repword) {
      res.status(400).json({ errMsg: 'Passwords doesnt match !' })
    } else {
      userHelper.addUserDetails(req.body).then((response) => {
        if (response.userExist) {
          res.status(400).json({ errMsg: 'User already exist' })
        } else {
          res.status(200).json({ msg: 'success' })

        }
      }).catch((err) => {
        console.log(err);
      })
    }

  } catch (err) {
    console.log(err);
  }

});


router.post('/login', function (req, res, next) {
  try{
    console.table(req.body)
    const {email ,pword} = req.body
    if(!email || !pword){
      res.status(400).json({errMsg:'Enter required details'})
    }else{
      userHelper.verifyUser(req.body).then((response)=>{
        if(response.userVerified){
        
          let userId = response.user._id.toString();
          const token = jwt.sign(
            {
              user: userId,
            },
            jwtSecret
          );

          let obj = {
            id: response.user._id.toString(),
            name: response.user.name,
            email: response.user.email,
          };

          res.status(200).cookie("token", token, {httpOnly: true,}).json(obj);

        }else{
          res.status(400).json({errMsg:'Entered credentials are invalid'})
        }
      })
    }
  }catch (err){
    console.log(err);
  }
});

router.post('/submitApplication', function (req, res, next) {
  
    
    upload(req,res,function(err){
      console.table(JSON.parse(req.body.details))

      if(err instanceof multer.MulterError){
        return res.status(500).json(err)
      }else if(err){
        return res.status(500).json(err)
      }else{
        let applicationDetails = JSON.parse(req.body.details)

        userHelper.submitApplication(applicationDetails).then((resp)=>{
          
            var oldPath = './public/temp-Logo/companylogo.jpg'
            var newPath = './public/CompanyLogo/' + applicationDetails.userId + '.jpg'

            fs.rename(oldPath, newPath,function (err) {
                if (err)
                  throw err;
              })
          res.status(200).json({msg:'success'})
        }).catch((err)=>{
          console.log(err);
          res.status(400).json(err)
        })
      }
    })

});


module.exports = router;

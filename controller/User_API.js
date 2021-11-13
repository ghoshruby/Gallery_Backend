const express = require('express');
const router = express.Router();

const UserModel = require('../models/User_Schema');
const ImageModel = require('../models/Image_Schema');


router.post('/register', (req, res) => {
    UserModel.find({ "email": req.body.uemail })
        .then(response => {
            if (response.length > 0) {
                return res.send({message:"Email Id is already Exist Please Login"})
            }

            else {
                const UserObj = new UserModel({
                    username: req.body.uname,
                    email: req.body.uemail,
                    password: req.body.upass,
                    
                })
                UserObj.save()
                    .then(inserteddocument => {
                        res.status(200).send({message:"Registration Successfull"});
                    })
                    .catch(err => {
                        res.status(500).send({ message: err.message || 'Error in User Save ' })
                    });
            }

        })

        .catch(err => {
            console.log(err)
        })

        
})

router.post('/login', (req, res) => {
    // console.log(req.body.userid);
    UserModel.find({ "email": req.body.userid, "password": req.body.password })
        .then(getsearchdocument => {
            if (getsearchdocument.length > 0) {
                // console.log(getsearchdocument);
                res.send(getsearchdocument);
            
            }
            else {
                return res.status(404).send({ message: "Email-Id or Password Not Matched" });
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.body.userid });
        })
})


router.post('/image',(req,res)=>{
    // console.log(req.body.image_path)
    const ImgObj = new ImageModel({
        title: req.body.title,
        category:req.body.category,
        image_path:req.body.image_path,
        username :req.body.username,
        email : req.body.email,
        uid :req.body.uid ,

    })

    ImgObj.save()
    .then(rs=>{
        res.status(200).send(rs)
    })
    .catch(err=>{
        res.status(500).send({message:err.message})
    })
    
})


router.post('/viewall/:uid',(req,res)=>{
    ImageModel.find({ "uid": req.params.uid })
    .sort({ "createdAt": -1 })
    .then(getalldocumentsfrommongodb => {
        // console.log(getalldocumentsfrommongodb)
        res.status(200).send(getalldocumentsfrommongodb);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || 'Error in Fetch Images ' })
    })
})

router.post('/viewall',(req,res)=>{
    ImageModel.find()
    .sort({ "createdAt": -1 })
    .then(getalldocumentsfrommongodb => {
        // console.log(getalldocumentsfrommongodb)
        res.status(200).send(getalldocumentsfrommongodb);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || 'Error in Fetch Images ' })
    })
})

module.exports = router;
const express = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

authRouter.post('/api/signup', async (req,res) =>{
    try{
    const { name, email, password} =   req.body;

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({msg: "User already exists!"});
    }

    const hashedPassword = await bcryptjs.hash(password, 8);
    //8 is salt. Salt is a random string added to hash-value. By adding sal
    // the hash algo makes password unpredictable 

    let user = new User({
        email,
        password: hashedPassword,
        name,
    })
    user = await user.save();
    res.json(user);
    }catch(e) {
        res.status(500).json({error : e.message });
    }
    //get the data from client 
    //post that data in the database 
    //returnn that data to the user

});

//sign in route 
authRouter.post('/api/signin', async (req, res) =>{
    try{
        const {emaail, password} = req.body;

        const user = await User.findOne({ email });
        if(!user){
            return res
            .status(400)
            .json({msg: 'User with this email does not exist!'});
        }
        const isMatch = await  bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ msg: "Incorrect password" });

        }
        jwt.sign({id: user_id},"passwordKey" );
        res.json({token, ...user._doc})
        //... is use to destructure object
    }catch(e){
        res.status(500).json({error: e.message});
    }
})



module.exports = authRouter;
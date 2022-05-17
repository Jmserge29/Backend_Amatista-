const User = require('../Models/UserUniversity')
const express = require("express");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser")


signin = async (req, res) =>{
    const {email, password} = req.body;
    console.log(email, password)
    const user = await User.findOne({email: email})
    if (!user){
        // res.cookie("cookie jwt")
        return res.status(404).send("The email doesn't exist")
    }

    const passwordIsValid = await user.ValidatePassword(password)
    if (!passwordIsValid) {
        return res.status(401).json({
            auth: false, token: null
        });
    }

    if (user && passwordIsValid){
        console.log("Este es un usuario")
        res.cookie("jwt")
    }

    const token = jwt.sign({id: user._id}, process.env.SECRET_JWT, {
        expiresIn: 60 * 60 * 24
    })
    res.json({auth: true, token})
}


signup = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    const user = new User(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

        user.password = await user.encryptPassword(user.password)
        await user.save()

        const token = jwt.sign({id: user._id}, process.env.SECRET_JWT, {
            expiresIn: 60 * 60 * 24
        })
        res.json({auth: true, token})
        console.log(user)
}

me = async(req, res) =>{
    console.log('Tu información está siendo procesada...')
    res.status(201).json({message: true})
}



module.exports = {
    signup,
    me,
    signin
}

const User = require('../Models/UserUniversity')
const express = require("express");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const verifyToken = require('./verifyToken')


signin = async (req, res) =>{
    const {email, password} = req.body;
    console.log(email, password)
    const user = await User.findOne({email: email})
    if (!user){
        return res.status(404).send("The email doesn't exist")
    }

    const passwordIsValid = await user.ValidatePassword(password)
    if (!passwordIsValid) {
        return res.status(401).json({
            auth: false, token: null
        });
    }

    const token = jwt.sign({id: user._id}, process.env.SECRET_JWT, {
        expiresIn: 60 * 60 * 24
    })

    // Desencrypto el token
    const tokenDecoded = jwt.verify(token, process.env.SECRET_JWT)
    const IdUser = tokenDecoded.id
    // const codestudent = tokenDecoded.codeStudent
    const dtauthorizated = await User.findById(IdUser)
    const dtacodestudent = dtauthorizated.codeStudent
    // console.log(dtauthorizated)


    res
    .status(202)
    .cookie('Token', token, {
        sameSite: 'strict',
        path: '/',
        expires: new Date(new Date().getTime() + 100 * 1000),
        httpOnly: true,
    })

    res
    .status(202)
    .cookie('UserId', IdUser, {
        sameSite: 'strict',
        path: '/',
        expires: new Date(new Date().getTime() + 100 * 1000),
        httpOnly: true,
    })

    res
    .status(202)
    .cookie('code', dtacodestudent, {
        sameSite: 'strict',
        path: '/',
        expires: new Date(new Date().getTime() + 100 * 1000),
        // httpOnly: true,
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
    const cookieNew = res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })
    console.log(cookieNew)
    res.json({message: true})
}

DataUser = verifyToken, async (req, res, next) =>{
    const user = await User.findById(req.userId, {password: 0, createdAt: 0, updatedAt: 0, __v: 0})
    if(!user){
        return res.status(404).send('No user found')
    }
    res.json(user)
}


AuthToken = async(req, res)=>{
    const {tokenProvided} = req.body;
    console.log('Token asignado es: ',tokenProvided)
}

module.exports = {
    signup,
    me,
    signin,
    DataUser,
    AuthToken
}

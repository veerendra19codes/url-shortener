const User  = require("../models/user.models");
const  { v4 : uuidv4 } = require('uuid');
const { setUser } = require("../service/auth")

async function handleUserSignup (req, res) {
    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password,
    })



    //res.render is use to render paricular view page, here in brackets page name will come
    // return res.render("home");

    //res.redirect is use to redirect to a paricular url, here in brackets url will come 
    return res.redirect("/");
}

async function handleUserLogin (req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password
    })
    if(!user) return res.render("login", {
        error: "email or password is wrong"
    });
    
    //statefull
    // const sessionId = uuidv4();
    // setUser(sessionId, user);
    // res.cookie("uid", sessionId);
    // return res.redirect('/');

    //stateless
    const token = setUser(user);
    res.cookie("uid", token);
    return res.redirect("/");
}

module.exports = { handleUserSignup, handleUserLogin };
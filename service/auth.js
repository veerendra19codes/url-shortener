// const sessionIdToUserMap = new Map();

// function setUser (id, user) {
//     sessionIdToUserMap.set(id, user);
// }

// function getUser(id) {
//     return sessionIdToUserMap.get(id);
// }

// module.exports = {setUser, getUser};

//stateless
// now we dont need state
const jwt = require("jsonwebtoken");
const secret = "secretv123"

function setUser (user) {
    // const payload = {
    //     ...user,
    // };
    //syntax is return jwt.sign(payload, secret);
    //here our payload is entire user object , so we passed it directly
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret);
}

function getUser(token) {
    if(!token) return null;
    return jwt.verify(token, secret);
}

module.exports = {
    setUser,
    getUser,
};
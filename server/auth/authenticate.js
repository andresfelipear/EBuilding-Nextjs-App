const passport = require('passport')
const jwt = require('jsonwebtoken')
const dev = process.env.NODE_ENV !== "production"

//create refresh token cookie
exports.COOKIE_OPTIONS = {
    httpOnly:true,
    secure: true,
    signed: true,
    maxAge: eval(process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY) * 1000,
    sameSite: "none"
}

//create jwt
exports.getToken = user =>{
    return jwt.sign(user, process.env.NEXT_PUBLIC_JWT_SECRET, {
        expiresIn: eval(process.env.NEXT_PUBLIC_SESSION_EXPIRY),
    })
}

//create refresh token
exports.getRefreshToken = user =>{
    const refreshToken = jwt.sign(user, process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET, {
        expiresIn: eval(process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY),
    })
    return refreshToken
}

//called for every authenticated request
exports.verifyUser = passport.authenticate('jwt', { session:false})
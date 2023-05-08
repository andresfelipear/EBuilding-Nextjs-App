const jwt = require('jsonwebtoken')

const User = require("../models/user.model")
const { COOKIE_OPTIONS, getToken, getRefreshToken } = require('../auth/authenticate')



exports.postSignUp = async (req, res, next) => {
  try {
    console.log(req.body)
    User.register(new User({ username: req.body.username }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.status(500).send(err)
        } else {
          user.email = req.body.email
          user.icon = req.body.icon
          const token = getToken({ _id: user._id })
          const refreshToken = getRefreshToken({ _id: user._id })
          user.refreshToken.push({ refreshToken })
          user.save()
            .then((user) => {
              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
              res.send({ success: true, token })
            })
            .catch((err) => {
              res.status(500).send(err)
            })

        }
      }
    )
  } catch (error) {
    res.status(400).json({ error });
  }
}

//refreshToken
exports.postRefreshToken = (req, res, next) => {
  const { signedCookies = {} } = req
  const { refreshToken } = signedCookies
  if (refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET)
      const userId = payload._id
      User.findOne({ _id: userId }).then(user => {
        if (user) {
          const tokenIndex = user.refreshToken.findIndex(item => item.refreshToken == refreshToken)

          if (tokenIndex === -1) {
            res.status(401).send("Unauthorized")
          } else {
            const token = getToken({ _id: userId })
            const newRefreshToken = getRefreshToken({ _id: userId })
            user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
            user.save()
              .then((user) => {
                res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                res.send({ success: true, token })
              })
              .catch((err) => {
                res.status(500).send(err)
              })
          }
        }
      })
    } catch (err) {
      console.log(err)
      res.status(401).send("Unauthorized")
    }
  } else {
    (err) => {
      console.log(err)
    }
    res.status(401).send("Unauthorized")
  }
}

//getData user logged
exports.getData = (req, res, next) => {
  try {
    User.findById(req.user._id)
      .then((user) => {
        res.send(user)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send(err)
      })
  } catch (error) {
    console.log(err)
    res.status(401).json({ error })
  }

}

//logout user
exports.getLogout = (req, res, next) => {
  try {

    const { signedCookies = {} } = req
    const { refreshToken } = signedCookies;

    User.findOneAndUpdate(
      { _id: req.user_id },
      { $pull: { refreshToken: { refreshToken: refreshToken } } }
    ).then((result) => {
      console.log("Refresh token removed successfully");
      res.clearCookie('refreshToken', COOKIE_OPTIONS)
      res.send({ success: true })
    })
      .catch((err) => {
        console.log(err);
        res.status(401).json({ err })
      })
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error })
  }

}

//login
exports.postLogin = (req, res, next) => {
  try {
    const token = getToken({ _id: req.user._id })
    const refreshToken = getRefreshToken({ _id: req.user._id })

    const { username, password } = req.body
    User.findOne({ username: username })
      .then((user) => {
        if (user) {
          user.refreshToken.push({ refreshToken });
          return user.save();
        } else {
          throw new Error("User not found");
        }
      })
      .then((user) => {
        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
        res.send({ success: true, token });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error });
  }
}



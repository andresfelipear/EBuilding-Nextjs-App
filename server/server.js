const mongoose = require('mongoose');
require("dotenv").config()
const express = require("express")
const next = require('next')
const morgan = require("morgan")
const cors = require("cors")
const userRoute = require("./routes/user.route.js")
const cookieParser = require('cookie-parser')
const passport = require('passport')

require('./strategies/JwtStrategy')
require('./strategies/LocalStrategy')
require('./auth/authenticate')

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()
        server.use(cookieParser(process.env.NEXT_PUBLIC_COOKIE_SECRET))
        const whitelist = process.env.NEXT_PUBLIC_WHITELIST_DOMAINS ? process.env.NEXT_PUBLIC_WHITELIST_DOMAINS.split(',') : []
        const corsOption = {
            origin: (origin, callback) => {
                if (!origin || whitelist.indexOf(origin) !== -1) {
                    callback(null, true)
                } else {
                    callback(null, true)
                }
            },
            credentials: true
        }

        server.use(cors(corsOption))
        server.use(passport.initialize())
        server.use(morgan("tiny"))
        server.use(express.json())

        server.get("/api/", (req, res) => {
            res.send("this is the test route to make sure server is working")
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })
        server.use("/api", userRoute)

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })

require("dotenv").config()
const mongoose = require('mongoose')
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const userRoute = require("../server/routes/user.route.js")
const cookieParser = require('cookie-parser')
const passport = require('passport')
const User = require("../server/models/user.model")

require('../server/strategies/JwtStrategy.js')
require('../server/strategies/LocalStrategy.js')
require('../server/auth/authenticate.js')

const session = require('express-session')
const request = require("supertest");
const app = express()
let server

beforeAll(async () => {
    app.use(cookieParser(process.env.NEXT_PUBLIC_COOKIE_SECRET))
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

    app.use(cors(corsOption))
    app.use(session({
        secret: process.env.NEXT_PUBLIC_JWT_SECRET,
        resave: false,
        saveUninitialized: false,
    }))
    app.use(passport.initialize())
    app.use(passport.session());
    app.use(morgan("tiny"))
    app.use(express.json())

    app.use("/api", userRoute)

    app.get("/api/", (req, res) => {
        res.send("this is the test route to make sure server is working")
    })

    app.get('*', (req, res) => {
        return handle(req, res)
    })

    server = app.listen(3300, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3300')
    })

})

afterAll(async ()=>{
    await server.close();
    await mongoose.connection.close();
})


describe('GET /api/', () => {
    test("index route works", done => {
        request(app)
            .get("/api")
            .expect('this is the test route to make sure server is working')
            .expect(200, done);
    });
});

describe('POST /api/signup', () => {
    test('should create a new user', async () => {
        const res = await request(app)
            .post('/api/signup')
            .send({ username: 'newuser', password: 'newpassword', email: 'test@test.com' })
        
        // Check that the response success
        expect(res.body.success).toBe(true)    

        // Check that the response contains a token
        expect(res.body.token).toBeTruthy();

        // Clean up the test user
        await User.deleteOne({ username: 'newuser' });
    });
});






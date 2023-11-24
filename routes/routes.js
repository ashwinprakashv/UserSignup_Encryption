import express from 'express'
import Controller from '../controllers/Controller.js'

const router = express.Router()

router.get("/dashboard",Controller.dashboard_get)

router.get("/test", Controller.test_get )


router.get("/signup",Controller.signup_get)

router.post("/signup",Controller.signup_post)

router.get('/login',Controller.login_get)

router.post('/login',Controller.login_post)


export default router
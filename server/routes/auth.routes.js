const Router = require("express")
const router = new Router()
const AuthController = require("../controller/auth.controller")
const {check} = require("express-validator")

router.post("/registration",[
  check("email", "Uncorrect email").isEmail(),
  check("password", "Password cannot be less 4 symbol and more 15").isLength({min: 6, max: 15})
], AuthController.registration)
router.post("/authorization", AuthController.authorization)

module.exports = router
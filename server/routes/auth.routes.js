const Router = require("express");
const router = new Router();
const AuthController = require("../controller/auth.controller");
const { check } = require("express-validator");

router.post(
  "/auth/registration",
  [
    check("email", "Uncorrect email").isEmail(),
    check("password", "Password cannot be less 4 symbol and more 15").isLength({
      min: 4,
      max: 15,
    }),
  ],
  AuthController.registration
);
router.post("/auth/authorization", AuthController.authorization);

module.exports = router;

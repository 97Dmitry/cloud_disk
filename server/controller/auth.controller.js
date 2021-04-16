const User = require("../models/User")
const bcrypt = require("bcryptjs")
const {validationResult} = require("express-validator")

class AuthController {
  async registration(request, response) {
    try {
      const errors = validationResult(request)
      if (!errors.isEmpty()) {
        return response.status(400).json(errors)
      }

      const {email, password} = request.body
      const candidate = await User.findOne({email})
      if (candidate) {
        return response.status(400).json({message: `This email ${email} has been registration already`})
      }
      const hashPassword = await bcrypt.hash(password, 7)
      const user = new User({email, password: hashPassword})
      await user.save()
      return response.status(201).json({message: "Account has been create"})
    } catch (e) {
      console.log(e)
      return response.status(400).json({message: "Registration error"})
    }
  }
}

module.exports = new AuthController()
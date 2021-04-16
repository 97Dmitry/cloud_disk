const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {validationResult} = require("express-validator")
const config = require("config")

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

  async authorization(request, response) {
    try {
      const {email, password} = request.body
      const user = await User.findOne({email})
      if (!user) {
        return response.status(404).json({message: `User with email ${email} not found`})
      }
      const isPassword = bcrypt.compareSync(password, user.password)
      if (!isPassword) {
        return response.status(404).json({message: `Password is not valid`})
      }
      const token = jwt.sign({id: user.id}, config.get("jwtKey"), {expiresIn: "1h"})
      return response.status(200).json({
        token, id: user.id, email, diskSpace: user.diskSpace, usedSpace: user.usedSpace
      })
    } catch (e) {
      console.log(e)
      return response.status(400).json({message: "Authorization error"})
    }
  }
}

module.exports = new AuthController()
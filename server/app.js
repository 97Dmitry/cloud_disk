const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express()
app.use(express.json())

app.use("/api", require("./routes/auth.routes"))


const PORT = config.get("serverPort")

async function start() {
  try {
    await mongoose.connect(config.get("dbUrl"), {useNewUrlParser: true, useUnifiedTopology: true})
    app.listen(PORT, "127.0.0.1",() => console.log(`Server is work. PORT: ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
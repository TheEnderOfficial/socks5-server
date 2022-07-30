#!/usr/bin/env node

const socksv5 = require('socksv5')
const fs = require('fs');

const PORT = 1080
const server = socksv5.createServer((_, resolve) => resolve())

server.listen(PORT, () => console.log(`Listen: localhost:${PORT}`))
server.useAuth(socksv5.auth.UserPassword((username, password, cb) => {
  let users = fs.readFileSync("./users.txt", {encoding: "utf8"}).split("\n");
  let x = false;
  users.forEach(i => {
    let [username_, password_] = i.split(":");

    if (username_ === username && password_ === password) {
      x = true;
    }
  })
  if (x) {
    console.log(`Connected a new user ${username}`)
  }
  cb(x)

}))
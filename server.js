const http = require("http")
const path = require("path")
const express = require("express")
const app = express()
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "./public/views"))

app.get("/", (req, res) => { 
    return res.status(200).render("index")
})

io.on("connection", (socket) => { 
    console.log("Connection Established");

    socket.on("chat message", (msg) => { 
        io.emit("chat message", msg)
    })

    socket.on("disconnect", () => { 
        console.log("Disconnected from server");
    });
})

server.listen(3000, () => { 
    console.log("Listening to port 3000...");
})
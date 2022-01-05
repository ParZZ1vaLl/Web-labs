
import http from "http"
import fs from "fs"

const server = http.createServer()

server.on("request", (req,res) => {
    res.writeHead(200, {"Content-Type": "text/plain",
        "access-control-allow-credentials": "true",
        "access-control-allow-origin": "http://localhost:3000"});
    if(req.method == "POST") {
        new Promise((resolve) => {
            req.on("data", (chunk) => {
                let string = ""
                for(let char of chunk) {
                    string += String.fromCharCode(char)
                }
                resolve(string)
            })
        })
        .then(data => save(data))
        res.end("Good");
        return
    }
    res.end(fs.readFileSync("./data/items.json", "utf-8"));
})

function save(data) {
    fs.writeFileSync("./data/items.json", data)
}

server.listen(3003)
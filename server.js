// const express = require('express');

// const server = express();
// const cors = require("cors");
// server.use(
//     cors({
//         origin:'*',
//     })
// );

// const request = require("request");
// let url = ""

// server.use(express.json());
// server.post("/", (req, res)=>{
//     url = `https://feedmonster.onefootball.com/feeds/il/en/competitions/${req.body.data.id}/${req.body.data.s}/standings.json`
//     request(url, (error, response, body)=>{
//         if(error) throw error;
//         res.json(body);
//     });
// })

// server.listen(3000, ()=>{
//     console.log("Server is running");
// })
const express = require('express');

const server = express();
const port = process.env.PORT || 3000;

const cors = require("cors");
server.use(
    cors({
        origin:'*',
    })
);

const request = require("request");
let url = ""

server.use(express.static('public'));
server.use(express.json());
server.post("/", (req, res)=>{
    url = `https://api.onefootball.com/scores-mixer/v1/en/cn/matchdays/${req.body.data}`
    request(url, (error, response, body)=>{
        if(error) throw error;
        res.json(body);
    });
})

server.listen(port, ()=>{
    console.log("Server is running");
})
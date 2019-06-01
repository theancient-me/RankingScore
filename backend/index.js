const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var jwtToken = require("jsonwebtoken");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
var CONFIG = require('./config/config.json');

MongoClient.connect("mongodb://http://127.0.0.1:27017", (error, client) => {
  if (error) throw error;
  var db = client.db("WIPCAMP11");
  var keyToken = CONFIG.appKEY;

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
    next();
  });

  app.get("/", (req, res) => {
    res
      .json({
        status: 20,
        messages: "Hello everyone this is link of api for wipcamp 11 challenge"
      })
      .sendStatus(200);
  });
  // ======== Admin =======
  app.get("/adminbankbank", (req, res) => {
    db.collection("adminWIP").insertOne(
      {
        _adminId: "1",
        username: CONFIG.username,
        password: CONFIG.password
      },
      (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.sendStatus(200);
      }
    );
  });
  app.post("/wipLogin", (req, res) => {
    console.log(req.body);
    db.collection("adminWIP").findOne(
      {
        username: req.body.username
      },
      (err, result) => {
        if (err) return res.status(500).send(err.toString());
        var tokenOK = jwtToken.sign({ adminWIPID: "bank" }, keyToken);

        if (result) {
          res.json({
            isPasswordMatch: result.password === req.body.password,
            token: tokenOK
          });
        } else {
          res.json({
            isPasswordMatch: false
          });
        }
        // if
      }
    );
  });

  function compareNumbers(a, b)
{
  return b.score - a.score;
}

  // ========== WIPManages ==========
  app.get("/getListWIP", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    db.collection("WIPList")
      .find()
      .toArray((err, result) => {
        if (err) return res.status(500).send(err.toString());

        // buble sort
        // for (let i = 0; i < result.length - 1; i++)
        //   for (let j = 0; j < result.length - i - 1; j++)
        //     if (result[j].score < result[j + 1].score) {
        //       // swap arr[j+1] and arr[i]
        //       let temp = result[j];
        //       result[j] = result[j + 1];
        //       result[j + 1] = temp;
        //     }
    
        
       
        res.status(200).send(result.sort(compareNumbers));
      });
  });

  app.post("/addWIP", (req, res) => {
    jwtToken.verify(req.headers["token"], keyToken, function(err, decode) {
      if (err) {
        res.sendStatus(401);
      } else {
        db.collection("WIPList").insertOne(
          {
            _id: req.body.wip_id,
            name: req.body.wip_name,
            wipIcon: req.body.wip_icon,
            score: req.body.wip_score
          },
          (err, result) => {
            if (err) return res.status(500).send(err.toString());
            res.sendStatus(200);
          }
        );
      }
    });
  });

  app.patch("/editWIP", (req, res) => {
    jwtToken.verify(req.headers["token"], keyToken, function(err, decode) {
      if (err) {
        res.sendStatus(401);
      } else {
        db.collection("WIPList").updateOne(
          {
            _id: req.body.wip_id
          },
          {
            $set: {
              name: req.body.wip_name,
              wipIcon: req.body.wip_icon,
              score: req.body.wip_score
            }
          },
          (err, result) => {
            if (err) return res.status(500).send(err.toString());
            res.sendStatus(200);
          }
        );
      }
    });
  });


  app.post("/addScore", (req, res) => {
    jwtToken.verify(req.headers["token"], keyToken, function(err, decode) {
      if (err) {
        res.sendStatus(401);
      } else {
        db.collection("WIPList").update(
          {
            _id: req.body.wip_id
          },
          {
            $set: {
              score: req.body.wip_score
            }
          },
          (err, result) => {
            if (err) return res.status(500).send(err.toString());
            res.sendStatus(200);
          }
        );
      }
    });
  });

  app.post("/removeWIP", (req, res) => {
    jwtToken.verify(req.headers["token"], keyToken, function(err, decode) {
      if (err) {
        res.sendStatus(401);
      } else {
        db.collection("WIPList").deleteOne(
          {
            _id: req.body.wip_id
          },
          (err, result) => {
            if (err) return res.status(500).send(err.toString());
            res.sendStatus(200);
          }
        );
      }
    });
  });

  app.listen(3001, () => {
    console.log("Backend started port : 3001");
  });
});
// mongoClient

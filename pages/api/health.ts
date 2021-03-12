import { NextApiRequest, NextApiResponse } from "next";
const process = require("process");
const crypto = require("crypto");

export default function (req, res) {
  const arr = ["color", "cut", "clarity", "caratWeight"];
  var validateAttributes = [];
  if (req.method === "POST") {
    console.log("lol", res.body, req.body);
    if (JSON.stringify(req.body) !== "{}") {
      for (let i in arr) {
        if (Object.keys(req.body).includes(arr[i])) {
          console.log("Hello");
        } else {
          validateAttributes.push(arr[i]);
        }
      }
      if (validateAttributes.length > 0) {
        res.statusCode = 404;
        res.end("Error missing attributes " + validateAttributes);
        return;
      } else {
        res.json({
          valueinHex: crypto
            .createHash("sha256")
            .update(JSON.stringify(req.body))
            .digest("hex"),
        });
      }
    } else {
      res.statusCode = 404;
      res.end("error");
      return;
    }
  } else {
    if (process.uptime) {
      var i = 1000000;
      while (i--);
    }
    res.json({
      processUpTime: Math.floor(process.uptime()) + " seconds",
    });
  }
}

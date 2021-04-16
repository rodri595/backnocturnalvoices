var express = require("express");
var router = express.Router();

var voicenoteRoute = require("./voicenote");

router.use("/voicenote", voicenoteRoute);

router.get("/1", function (req, res) {
  res.status(200).json({ code: "tester 1" });
});

module.exports = router;

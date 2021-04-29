var express = require("express");
var router = express.Router();
const voicenoteModel = require("./voicenote.model");

const init = async () => {
  await voicenoteModel.initModel();
};
init();

/**************************        GETALL            **************************************/
router.post("/add", async (req, res) => {
  try {
    let saveData = await voicenoteModel.addVoice(req.body);
    if (saveData.insertedCount === 1) {
      res
        .status(200)
        .json({ status: "VALID", msg: "Voice Note Was Added to Map " });
    } else {
      res.status(400).json({
        status: "ERROR",
        msg: "Error on Adding VoiceNote To Database",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Nothing Happen" });
  }
}); // get /

router.get("/getallbydate", async (req, res) => {
  try {
    let markers = await voicenoteModel.getalldate();
    res.status(200).json({ status: "GOOD", markers });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Algo Sucedio Mal intentar de nuevo." });
  }
});
router.post("/check", async (req, res) => {
  try {
    let markers = await voicenoteModel.checkcount();
    if (markers === req.body.size) {
      res.status(200).json({ status: "EMPTY" });
    } else {
      let markers = await voicenoteModel.getalldate();
      res.status(200).json({ status: "GOOD", markers });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Algo Sucedio Mal intentar de nuevo." });
  }
});

router.get("/getallbydatearchive", async (req, res) => {
  try {
    let markers = await voicenoteModel.getall();
    res.status(200).json({ status: "GOOD", markers });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Algo Sucedio Mal intentar de nuevo." });
  }
});
router.post("/checkarchive", async (req, res) => {
  try {
    let markers = await voicenoteModel.checkcountarchive();
    if (markers === req.body.size) {
      res.status(200).json({ status: "EMPTY" });
    } else {
      let markers = await voicenoteModel.getall();
      res.status(200).json({ status: "GOOD", markers });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Algo Sucedio Mal intentar de nuevo." });
  }
});

module.exports = router;

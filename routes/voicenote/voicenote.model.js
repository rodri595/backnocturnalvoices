const db = require("../db/db");

let voicenoteColl;

module.exports = class {
  static async initModel() {
    if (!voicenoteColl) {
      let _db = await db.getDB();
      voicenoteColl = await _db.collection("voicenote");
      return;
    } else {
      return;
    }
  } // initModel

  static async addVoice(data) {
    try {
      const { city, country_name, latitude, longitude, title, audio } = data;

      const marker = {
        city: city,
        new: false,
        country: country_name,
        coords: [parseFloat(latitude), parseFloat(longitude)],
        title: title,
        base64audio: audio,
        datetime: new Date(),
      };
      const result = await voicenoteColl.insertOne(marker);
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  static async getalldate() {
    try {
      var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth(),
        d = date.getDate();

      let start = `${y}-${m < 10 ? `0${m + 1}` : m + 1}-${
        d < 10 ? `0${d}` : d
      }T00:00`;
      let end = `${y}-${m < 10 ? `0${m + 1}` : m + 1}-${
        d < 10 ? `0${d}` : d
      }T23:59`;

      let filter = [
        {
          $match: {
            datetime: {
              $gte: new Date(start),
              $lt: new Date(end),
            },
          },
        },
      ];

      let data = await voicenoteColl.aggregate(filter);
      return data.toArray();
    } catch (err) {
      console.log(err);
      return err;
    }
  }
};

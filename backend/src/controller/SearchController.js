const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
module.exports = {
  async index(req, res) {
    console.log(req.query);
    const { latitude, longitude, techs } = req.query;
    const techArray = parseStringAsArray(techs);
    const devs = await Dev.find({
      techs: { $in: techArray },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });
    res.json(devs);
  }
};

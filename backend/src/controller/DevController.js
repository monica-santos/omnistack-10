const { Router } = require('express');
const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(_, res) {
    const data = await Dev.find();
    res.json(data);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;
    let dev = await Dev.findOne({ github_username });
    console.log({ dev });

    if (!dev) {
      const { data } = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      console.log('created');
      const { name, login, avatar_url, bio } = data;
      const techsArr = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };
      dev = await Dev.create({
        github_username,
        name: name || login,
        avatar_url,
        bio,
        techs: techsArr,
        location
      });
    }
    return res.json({ dev });
  },

  async destroy(req, res) {
    const { id } = req.params;
    const response = await Dev.remove({ _id: id });
    res.json({ response });
  }
};

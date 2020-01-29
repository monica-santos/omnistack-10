const { Router } = require('express');
const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnection, sendMessage } = require('../websocket');
module.exports = {
  async index(_, res) {
    const data = await Dev.find();
    res.json(data);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;
    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const { data } = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
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

      const sendSocketMessageTo = findConnection(
        { latitude, longitude },
        techsArr
      );

      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }
    return res.json({ dev });
  },

  async destroy(req, res) {
    const { id } = req.params;
    const response = await Dev.remove({ _id: id });
    res.json({ response });
  }
};

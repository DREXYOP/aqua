const mongoose = require('mongoose')
const { prefix } = require("../config.json")

const Options = {
    guildId: { type: String, required: true },
    prefix: { type: String, default: prefix },
};

module.exports = mongoose.model('Prefix', Options);
const mongoose = require('mongoose')
const { prefix } = require("../config.json");

const Options = {
    client_events: { type: Boolean, default: true },
    mantainence : { type: Boolean, default: true},
    disstat_events: { type: Boolean, default: true},

};

module.exports = mongoose.model('Features', Options);
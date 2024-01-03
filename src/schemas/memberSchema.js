const mongoose = require('mongoose');

const Options = {
    memberId: { type: String } 
};

module.exports = mongoose.model('Member', Options);
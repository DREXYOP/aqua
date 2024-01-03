const mongoose = require('mongoose');

const Options = {
    guildId: {type: String, required: true},
    channelId:{type: String, required: true},
    voiceId:{type:String, required: true},
    _247:{type: Boolean, required: true}
};

module.exports = mongoose.model('_247',Options);
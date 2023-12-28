const DisStat = require("disstat");


class Client_stats extends DisStat {
    constructor(client){
        super(client.config.disstat_apiKey,client.config.clientID)
        this.postData({ servers: client.guilds.cache.size, users: client.users.cache.size, shards: 1 })
    }
}

module.exports = Client_stats;
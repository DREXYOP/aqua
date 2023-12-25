const BaseClient = require("../structures/BaseClient.js");
const  Logger  = require("../Workers/Logger.js");
const { ClientEventHandler , MusicEventHandler } = require("../Workers/EventHandler.js");
const { Collection , EmbedBuilder } = require("discord.js");
const { Loader } = require("../Workers/Loaders.js");
const { ClusterClient } = require('discord-hybrid-sharding');
const { DataBase } = require("../Database/connect.js");
const Utils = require("../Extra/Utils.js");


module.exports = class aquaClient extends BaseClient {
    constructor(token_main, config) {
        super();
        this.logger = new Logger();
        this.config = config;
        this.color = config.color;
        this.prefix = config.prefix;
        this.commands = new Collection();
        this.aliases = new Collection();
        this.cooldowns = new Collection();
        this.cluster = new ClusterClient(this);
        this.utils = new Utils();
        new DataBase(this).connect();
        new ClientEventHandler(this).start();
        // new MusicEventHandler(this).start();
        new Loader(this).loadCommands()
        this.login(token_main);
    }
    embed() {
        return new EmbedBuilder().setColor(`${this.config.color}`);
      }
    
}
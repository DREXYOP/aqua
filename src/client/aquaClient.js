const BaseClient = require("../structures/BaseClient.js");
const Logger  = require("../Workers/Logger.js");
const { ClientEventHandler , MusicEventHandler , disstatEventHandler } = require("../Workers/EventHandler.js");
const { Collection , EmbedBuilder } = require("discord.js");
const { Loader } = require("../Workers/Loaders.js");
const { ClusterClient } = require('discord-hybrid-sharding');
const { DataBase } = require("../Database/connect.js");
const Stats = require("../structures/Distat.js")
const Utils = require("../Extra/Utils.js");
const control_panel = require("../../control_panel.json")


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
        this.controls = control_panel;
        if(this.controls.database)
            new DataBase(this).connect();
        if(this.controls.client_events)
            new ClientEventHandler(this).start();
        if(this.controls.disstat_events){
            this.stats = new Stats(this);
            new disstatEventHandler(this);
        };
        if(this.controls.music_events){
            // new MusicEventHandler(this).start();
        };
        if(this.controls.commands){
            new Loader(this).loadCommands();
        };
        if(this.controls.main_bot_power){
            this.login(token_main);
        };
        
    };
    

    embed() {
        return new EmbedBuilder().setColor(`${this.config.color}`);
      }
    
    
}
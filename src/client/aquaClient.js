const BaseClient = require("../structures/BaseClient.js");
const Logger  = require("../Workers/Logger.js");
const { ClientEventHandler , MusicEventHandler } = require("../Workers/EventHandler.js");
const { Collection , EmbedBuilder } = require("discord.js");
const { Loader } = require("../Workers/Loaders.js");
const { ClusterClient } = require('discord-hybrid-sharding');
const { DataBase } = require("../Database/connect.js");
const Utils = require("../Extra/Utils.js");
const control_panel = require("../../control_panel.json");
const musicClient = require("./musicClient.js");
const Queue = require("../structures/Queue.js");


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
        this.shoukaku = new musicClient(this);
        this.queue = new Queue(this);
        this.controls = control_panel;
        if(this.controls.database)
            new DataBase(this).connect();
        if(this.controls.client_events)
            new ClientEventHandler(this).start();
        if(this.controls.music_events){
            new MusicEventHandler(this).start();
        };
        if(this.controls.commands){
            new Loader(this).loadCommands();
        };
        if(this.controls.main_bot_power){
            this.login(token_main);
        };
        
    };
    

    embed() {
        return new EmbedBuilder().setColor(`${this.config.color}`).setAuthor({name:`${this.user.username}`, iconURL: this.user.avatarURL()}).setFooter({text:`Made with ❤️ by Drexy_xD`, iconURL:this.user.avatarURL()}).setTimestamp();
      }
    
    
}

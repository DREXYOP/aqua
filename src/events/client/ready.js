const { ActivityType } = require('discord.js');
const config = require("../../config.json")

module.exports= {
  name: 'ready',
  once: true,
async execute(client) {
  client.logger.log("API",`${client.user.username} is ready with ${client.guilds.cache.size} server`)
   
 
    
   
    client.user.setActivity(`${client.prefix}help`, { type: ActivityType.Listening });
 
} 
};
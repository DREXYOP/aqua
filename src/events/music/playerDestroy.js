module.exports = {
    name: 'playerDestroy',
    async run(client, player){
        const guild = client.guilds.cache.get(player.connection.guildId);
        if (!guild) return;
        client.logger.log('Player',`Player destroyed in ${guild.id}`)
    }
}
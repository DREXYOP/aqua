module.exports = {
    name: 'playerDestroy',
    async run(client, player, dispatcher){
        const guild = client.guilds.cache.get(player.connection.guildId);
        if (!guild) return;
        client.logger.log('Player',`Player destroyed in ${guild.id}`)
        const channel = guild.channels.cache.get(dispatcher.channelId);
        const embed = client.embed()
        channel.send({
            embeds:[embed.setDescription('Left the voice channel and destroyed the player, want me to be 24/7 in vc then enable 24/7 mode.').setAuthor({name: `Player Destroy`,iconURL: `${client.user?.avatarURL()}`})]
        })
    }
}
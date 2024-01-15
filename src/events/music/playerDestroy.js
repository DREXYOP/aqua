const { ActionRowBuilder,ButtonStyle, ButtonBuilder } = require('discord.js');

module.exports = {
    name: 'playerDestroy',
    async run(client, player, dispatcher){
        const guild = client.guilds.cache.get(player.connection.guildId);
        if (!guild) return;
        client.logger.log('Player',`Player destroyed in ${guild.id}`)
        const channel = guild.channels.cache.get(dispatcher.channelId);
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel(`Get ${client.user?.username}`)
                .setStyle(ButtonStyle.Link)
                .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user?.id}&permissions=${client.config.inv_perms}&scope=bot%20applications.commands`),
            new ButtonBuilder()
                .setLabel('Support Server')
                .setStyle(ButtonStyle.Link)
                .setURL(`${client.config.supportUri}`),
            new ButtonBuilder()
                .setLabel('Vote Me')
                .setStyle(ButtonStyle.Link)
                .setURL(`${client.config.topggUri}`)
        );
        const embed = client.embed()
        channel.send({
            embeds:[embed.setDescription('Left the voice channel and destroyed the player, want me to be 24/7 in vc then enable 24/7 mode.').setAuthor({name: `Player Destroy`,iconURL: `${client.user?.avatarURL()}`})],
            components:[row]
        })
    }
}
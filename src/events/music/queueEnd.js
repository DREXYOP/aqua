const _247 = require("../../schemas/_247");

module.exports = {
    name:'queueEnd',
    async run(client, player, track, dispatcher) {
        const guild = client.guilds.cache.get(dispatcher.guildId)
        const player1 = client.queue.get(dispatcher.guildId);
        if (!guild) return;
        // const channel = guild.channels.cache.get()

        if (dispatcher.loop === 'repeat') dispatcher.queue.unshift(track);
        if (dispatcher.loop === 'queue') dispatcher.queue.push(track);

        if (dispatcher.autoplay) {
            await dispatcher.Autoplay(track);
        } else {
            dispatcher.autoplay = false;
        }

        if (dispatcher.loop === 'off') {
            dispatcher.previous = dispatcher.current;
            dispatcher.current = null;
        }
        const stay = _247.findOne({guildId:guild.id});
       
        if(!stay){
            setTimeout(async () => {
                player1.destroy();
                const channel = guild.channels.cache.get(dispatcher.channelId);
                const embed = client.embed()
                channel.send({
                    embeds:[embed.setDescription('Left the voice channel and destroyed the player, want me to be 24/7 in vc then enable 24/7 mode.').setAuthor({name: `Queue Ended`,iconURL: `${client.user?.avatarURL()}`})]
                })
            }, 5000);
        }
    }
}
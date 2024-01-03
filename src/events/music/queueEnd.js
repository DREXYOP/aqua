module.exports = {
    name:'queueEnd',
    async run(client, player, track, dispatcher) {
        const guild = client.guilds.cache.get(dispatcher.guildId);
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
        setTimeout(async () => {
            const playerVoiceChannel = (client.guilds.cache.get(player.connection.guildId)).channels.cache.get(dispatcher.channelId);
            if (player &&
                playerVoiceChannel &&
                playerVoiceChannel.members.filter((x) => !x.user.bot).size <= 0) {
                if (player) {

                    player.destroy();
                }
            }
        }, 5000);
    }
}
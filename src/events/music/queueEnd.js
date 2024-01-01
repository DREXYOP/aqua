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

    }
}
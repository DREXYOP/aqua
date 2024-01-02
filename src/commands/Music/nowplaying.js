const Command = require('../../structures/Command');

class Nowplaying extends Command {
    constructor(client) {
        super(client, {
            name: 'nowplaying',
            description: {
                content: 'Shows the currently playing song',
                examples: ['nowplaying'],
                usage: 'nowplaying',
            },
            category: 'Music',
            aliases: ['np'],
            cooldown: 3,
            args: false,
            player: {
                voice: true,
                dj: false,
                active: true,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: [],
            },
            slashCommand: true,
            options: [],
        });
    }
    async run(ctx) {
        const client = ctx.client;
        const player = client.queue.get(ctx.guild.id);
        const track = player.current;
        const position = player.player.position;
        const duration = track.info.length;
        const bar = client.utils.progressBar(position, duration, 20);
        const embed1 = this.client
            .embed()
            .setAuthor({ name: 'Now Playing', iconURL: ctx.guild.iconURL({}) })
            .setThumbnail(track.info.thumbnail)
            .setDescription(`[${track.info.title}](${track.info.uri}) - Request By: ${track.info.requester}`)
            .addFields({
                name: 'Time',
                value: `\`${bar}\` ${client.utils.formatTime(position)} / ${client.utils.formatTime(duration)}`,
            });
        return await ctx.sendMessage({ embeds: [embed1] });
    }
}

module.exports = Nowplaying;
const Command = require('../../structures/Command');


class Shuffle extends Command {
    constructor(client) {
        super(client, {
            name: 'shuffle',
            description: {
                content: 'Shuffles the queue',
                examples: ['shuffle'],
                usage: 'shuffle',
            },
            category: 'Music',
            aliases: ['sh'],
            cooldown: 3,
            args: false,
            player: {
                voice: true,
                dj: true,
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
    async run( ctx) {
        const client = ctx.client;
        const player = client.queue.get(ctx.guild.id);
        const embed = this.client.embed();
        if (!player.queue.length)
            return await ctx.sendMessage({
                embeds: [
                    embed
                        .setDescription('There are no songs in the queue.'),
                ],
            });
        player.setShuffle(true);
        return await ctx.sendMessage({
            embeds: [embed.setDescription(`Shuffled the queue`)],
        });
    }
}


module.exports = Shuffle;
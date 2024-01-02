const Command = require("../../structures/Command");

class Remove extends Command {
    constructor(client) {
        super(client, {
            name: 'remove',
            description: {
                content: 'Removes a song from the queue',
                examples: ['remove 1'],
                usage: 'remove <song number>',
            },
            category: 'Music',
            aliases: ['rm'],
            cooldown: 3,
            args: true,
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
            options: [
                {
                    name: 'song',
                    description: 'The song number',
                    type: 4,
                    required: true,
                },
            ],
        });
    }
    async run(ctx, args) {
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
        if (isNaN(Number(args[0])))
            return await ctx.sendMessage({
                embeds: [
                    embed
                        .setDescription('That is not a valid number.'),
                ],
            });
        if (Number(args[0]) > player.queue.length)
            return await ctx.sendMessage({
                embeds: [
                    embed
                        .setDescription('That is not a valid number.'),
                ],
            });
        if (Number(args[0]) < 1)
            return await ctx.sendMessage({
                embeds: [
                    embed
                        .setDescription('That is not a valid number.'),
                ],
            });
        player.remove(Number(args[0]) - 1);
        return await ctx.sendMessage({
            embeds: [
                embed
                    .setDescription(`Removed song number ${Number(args[0])} from the queue`),
            ],
        });
    }
}


module.exports = Remove;
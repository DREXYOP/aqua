const Command = require("../../structures/Command");

class Skipto extends Command {
    constructor(client) {
        super(client, {
            name: 'skipto',
            description: {
                content: 'Skips to a specific song in the queue',
                examples: ['skipto 5'],
                usage: 'skipto <number>',
            },
            category: 'Music',
            aliases: ['st'],
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
                    name: 'number',
                    description: 'The number of the song you want to skip to',
                    type: 4,
                    required: true,
                },
            ],
        });
    }
    async run(ctx, args) {
        const client = this.client;
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
                        .setDescription('Please provide a valid number.'),
                ],
            });
        if (Number(args[0]) > player.queue.length)
            return await ctx.sendMessage({
                embeds: [
                    embed
                        .setDescription('Please provide a valid number.'),
                ],
            });
        if (Number(args[0]) < 1)
            return await ctx.sendMessage({
                embeds: [
                    embed
                        .setDescription('Please provide a valid number.'),
                ],
            });
        player.skip(Number(args[0]));
        return await ctx.sendMessage({
            embeds: [
                embed
                    .setDescription(`Skipped to song number ${args[0]}`),
            ],
        });
    }
}


module.exports = Skipto;
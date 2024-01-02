const Command = require("../../structures/Command");

class Volume extends Command {
    constructor(client) {
        super(client, {
            name: 'volume',
            description: {
                content: 'Sets the volume of the player',
                examples: ['volume 100'],
                usage: 'volume <number>',
            },
            category: 'Music',
            aliases: ['vol'],
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
                    description: 'The volume you want to set',
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
        const number = Number(args[0]);
        if (isNaN(number))
            return await ctx.sendMessage({
                embeds: [
                    embed
                        .setDescription('Please provide a valid number.'),
                ],
            });
        if (number > 300)
            return await ctx.sendMessage({
                embeds: [
                    embed
                        .setDescription('The volume can\'t be higher than 300.'),
                ],
            });
        if (number < 0)
            return await ctx.sendMessage({
                embeds: [
                    embed
                        .setDescription('The volume can\'t be lower than 0.'),
                ],
            });
        player.player.setVolume(number / 100);
        return await ctx.sendMessage({
            embeds: [
                embed
                    .setDescription(`Set the volume to ${(player.volume * 100).toFixed()}`),
            ],
        });
    }
}


module.exports = Volume;
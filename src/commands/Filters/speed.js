const { ApplicationCommandOptionType } = require('discord.js');
const Command = require('../../structures/Command');

class Speed extends Command {
    constructor(client) {
        super(client, {
            name: 'speed',
            description: {
                content: 'Sets the speed of the song',
                examples: ['speed 1.5'],
                usage: 'speed <number>',
            },
            category: 'Filters',
            aliases: ['speed'],
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
                user: ['ManageGuild'],
            },
            slashCommand: true,
            options: [
                {
                    name: 'speed',
                    description: 'The speed you want to set',
                    type: ApplicationCommandOptionType.Integer,
                    required: true,
                },
            ],
        });
    }
    async run(ctx, args) {
        const player = ctx.client.queue.get(ctx.guild.id);
        const embed = ctx.client.embed();
        const speed = Number(args[0]);
        if (isNaN(speed))
            return await ctx.sendMessage({
                embeds: [
                    embed.setDescription(`Please enter a valid number.`)
                ],
            });
        if (speed < 0.5 || speed > 5)
            return await ctx.sendMessage({
                embeds: [
                    embed.setDescription('Please provide a number between 0.5 and 5')
                ],
            });
        player.player.setTimescale({ speed: speed });
        return await ctx.sendMessage({
            embeds: [
                embed.setDescription(`speed has been set to ${speed}`)
            ],
        });
    }
}

module.exports = Speed;
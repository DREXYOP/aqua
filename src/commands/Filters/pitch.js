const { ApplicationCommandOptionType } = require('discord.js');
const Command = require('../../structures/Command');

class Pitch extends Command {
    constructor(client) {
        super(client, {
            name: 'pitch',
            description: {
                content: 'on/off the pitch filter',
                examples: ['pitch 1'],
                usage: 'pitch <number>',
            },
            category: 'filters',
            aliases: ['ph'],
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
                    name: 'number',
                    description: 'The number you want to set the pitch to',
                    type: ApplicationCommandOptionType.Integer,
                    required: true,
                },
            ],
        });
    }
    async run(ctx, args) {
        const player = ctx.client.queue.get(ctx.guild.id);
        const embed = ctx.client.embed();
        const number = Number(args[0]);
        if (isNaN(number))
            return await ctx.sendMessage({
                embeds: [
                    embed.setDescription(`Please enter a valid number.`)
                ],
            });
        if (number > 5 || number < 1)
            return await ctx.sendMessage({
                embeds: [
                    embed.setDescription('Please provide a number between 1 and 5')
                        
                ],
            });
        player.player.setTimescale({ pitch: number, rate: 1, speed: 1 });
        return await ctx.sendMessage({
            embeds: [
                embed.setDescription(`Pitch has been set to ${number}`)
            ],
        });
    }
}

module.exports = Pitch;
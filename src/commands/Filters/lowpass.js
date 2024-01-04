const Command = require('../../structures/Command');

class lowPass extends Command {
    constructor(client) {
        super(client, {
            name: 'lowpass',
            description: {
                content: 'on/off lowpass filter',
                examples: ['lowpass'],
                usage: 'lowpass <number>',
            },
            category: 'Filters',
            aliases: ['lp'],
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
                user: ['ManageGuild'],
            },
            slashCommand: false,
        });
    }
    async run(ctx) {
        const player = ctx.client.queue.get(ctx.guild.id);
        const embed = ctx.client.embed();
        if (player.filters.includes('lowpass')) {
            player.player.setLowPass({});
            player.filters.splice(player.filters.indexOf('lowpass'), 1);
            ctx.sendMessage({
                embeds: [
                    embed.setDescription('Lowpass filter has been disabled')
                ],
            });
        }
        else {
            player.player.setLowPass({ smoothing: 20 });
            player.filters.push('lowpass');
            ctx.sendMessage({
                embeds: [
                    embed.setDescription('Lowpass filter has been enabled')
                ],
            });
        }
    }
}

module.exports = lowPass;
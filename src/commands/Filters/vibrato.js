const Command = require('../../structures/Command');

class Vibrato extends Command {
    constructor(client) {
        super(client, {
            name: 'vibrato',
            description: {
                content: 'on/off vibrato filter',
                examples: ['vibrato'],
                usage: 'vibrato',
            },
            category: 'Filters',
            aliases: ['vb'],
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
        });
    }
    async run(ctx) {
        const player = ctx.client.queue.get(ctx.guild.id);
        const embed = ctx.client.embed();
        if (player.filters.includes('vibrato')) {
            player.player.setVibrato();
            player.filters.splice(player.filters.indexOf('vibrato'), 1);
            ctx.sendMessage({
                embeds: [
                    embed.setDescription('Vibrato filter has been disabled')
                ],
            });
        }
        else {
            player.player.setVibrato({ depth: 0.75, frequency: 4 });
            player.filters.push('vibrato');
            ctx.sendMessage({
                embeds: [
                    embed.setDescription('Vibrato filter has been enabled')
                ],
            });
        }
    }
}

module.exports = Vibrato;
const Command = require('../../structures/Command');

class NightCore extends Command {
    constructor(client) {
        super(client, {
            name: 'nightcore',
            description: {
                content: 'on/off nightcore filter',
                examples: ['nightcore'],
                usage: 'nightcore',
            },
            category: 'Filters',
            aliases: ['nc'],
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
    async run(ctx) {
        const player = ctx.client.queue.get(ctx.guild.id);
        const embed = ctx.client.embed();
        if (player.filters.includes('nightcore')) {
            player.player.setTimescale();
            player.filters.splice(player.filters.indexOf('nightcore'), 1);
            ctx.sendMessage({
                embeds: [
                    embed.setDescription('Nightcore filter has been disabled')
                ],
            });
        }
        else {
            player.player.setTimescale({ speed: 1.165, pitch: 1.125, rate: 1.05 });
            player.filters.push('nightcore');
            ctx.sendMessage({
                embeds: [
                    embed.setDescription('Nightcore filter has been enabled')
                ],
            });
        }
    }
}

module.exports = NightCore;
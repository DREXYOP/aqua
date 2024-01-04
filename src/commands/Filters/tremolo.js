const Command = require('../../structures/Command');

class Tremolo extends Command {
    constructor(client) {
        super(client, {
            name: 'tremolo',
            description: {
                content: 'on/off the tremolo filter',
                examples: ['tremolo'],
                usage: 'tremolo',
            },
            category: 'Filters',
            aliases: ['tremolo'],
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
            slashCommand: true,
            options: [],
        });
    }
    async run(ctx) {
        const player = ctx.client.queue.get(ctx.guild.id);
        const embed = ctx.client.embed();
        if (player.filters.includes('tremolo')) {
            player.player.setTremolo();
            player.filters.splice(player.filters.indexOf('tremolo'), 1);
            ctx.sendMessage({
                embeds: [
                    embed.setDescription('tremolo filter has been disabled')
                ],
            });
        }
        else {
            player.player.setTremolo({ depth: 0.75, frequency: 4 });
            player.filters.push('tremolo');
            ctx.sendMessage({
                embeds: [
                    embed.setDescription('tremolo filter has been enabled')
                ],
            });
        }
    }
}

module.exports = Tremolo;
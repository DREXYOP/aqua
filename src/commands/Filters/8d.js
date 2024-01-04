const Command  = require('../../structures/Command');

class _8d extends Command {
    constructor(client) {
        super(client, {
            name: '8d',
            description: {
                content: 'on/off 8d filter',
                examples: ['8d'],
                usage: '8d',
            },
            category: 'Filters',
            aliases: ['3d'],
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
        const player = client.queue.get(ctx.guild.id);
        const embed = ctx.client.embed();
        if (!player)
            return;
        if (player.filters.includes('8D')) {
            player.player.setRotation();
            player.filters.splice(player.filters.indexOf('8D'), 1);
            ctx.sendMessage({
                embeds: [
                    embed.setDescription(`8d filter has been disabled.`)
                ],
            });
        }
        else {
            player.player.setRotation({ rotationHz: 0.2 });
            player.filters.push('8D');
            ctx.sendMessage({
                embeds: [
                    embed.setDescription(`8d filter has been enabled`)
                ],
            });
        }
    }
}

module.exports = _8d;
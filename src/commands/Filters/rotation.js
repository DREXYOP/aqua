const Command = require('../../structures/Command');

class Rotation extends Command {
    constructor(client) {
        super(client, {
            name: 'rotation',
            description: {
                content: 'on/off rotation filter',
                examples: ['rotation'],
                usage: 'rotation',
            },
            category: 'Filters',
            aliases: ['rt'],
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
        if (player.filters.includes('rotation')) {
            player.player.setRotation();
            player.filters.splice(player.filters.indexOf('rotation'), 1);
            ctx.sendMessage({
                embeds: [
                    embed.setDescription('rotation filter has been disabled')
                ],
            });
        }
        else {
            player.player.setRotation({ rotationHz: 0 });
            player.filters.push('rotation');
            ctx.sendMessage({
                embeds: [
                    embed.setDescription('rotation filter has been enabled')
                ],
            });
        }
    }
}

module.exports = Rotation;
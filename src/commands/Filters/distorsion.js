const Command = require('../../structures/Command.js');

class Distorsion extends Command {
    constructor(client) {
        super(client, {
            name: 'distorsion',
            description: {
                content: 'on/off distorsion filter',
                examples: ['distorsion'],
                usage: 'distorsion',
            },
            category: 'Filters',
            aliases: ['distorsion'],
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
        if (player.filters.includes('distorsion')) {
            player.player.setDistortion({});
            player.filters.splice(player.filters.indexOf('distorsion'), 1);
            ctx.sendMessage({
                embeds: [
                    embed.setDescription('Distorsion filter has been disabled')
                ],
            });
        }
        else {
            player.player.setDistortion({
                sinOffset: 0,
                sinScale: 1,
                cosOffset: 0,
                cosScale: 1,
                tanOffset: 0,
                tanScale: 1,
                offset: 0,
                scale: 1,
            });
            player.filters.push('distorsion');
            ctx.sendMessage({
                embeds: [
                    embed.setDescription('Distorsion filter has been enabled')
                ],
            });
        }
    }
}

module.exports = Distorsion;
const Command = require('../../structures/Command');

class Karaoke extends Command {
    constructor(client) {
        super(client, {
            name: 'karaoke',
            description: {
                content: 'on/off the karaoke filter',
                examples: ['karaoke'],
                usage: 'karaoke',
            },
            category: 'Filters',
            aliases: ['kk'],
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
        if (player.filters.includes('karaoke')) {
            player.player.setKaraoke();
            player.filters.splice(player.filters.indexOf('karaoke'), 1);
            ctx.sendMessage({
                embeds: [
                    embed.setDescription('Karaoke filter has been disabled')
                ],
            });
        }
        else {
            player.player.setKaraoke({
                level: 1,
                monoLevel: 1,
                filterBand: 220,
                filterWidth: 100,
            });
            player.filters.push('karaoke');
            ctx.sendMessage({
                embeds: [
                    embed.setDescription('Karaoke filter has been enabled')
                ],
            });
        }
    }
}

module.exports = Karaoke;
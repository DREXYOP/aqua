const Command = require('../../structures/Command');

class Pause extends Command {
    constructor(client) {
        super(client, {
            name: 'pause',
            description: {
                content: 'Pauses the current song',
                examples: ['pause'],
                usage: 'pause',
            },
            category: 'Music',
            aliases: [],
            cooldown: 3,
            args: false,
            player: {
                voice: true,
                dj: false,
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
        const player = this.client.queue.get(ctx.guild.id);
        const embed = this.client.embed();
        if (!player.paused) {
            player.pause();
            return await ctx.sendMessage({
                embeds: [embed.setDescription(`Paused the song`).setAuthor({
                    name: `${this.name}`,
                    iconURL: `${this.client.user?.avatarURL()}`
                })],
            });
        }
        else {
            return await ctx.sendMessage({
                embeds: [
                    embed
                        .setAuthor({
                            name: `${this.name}`,
                            iconURL: `${this.client.user?.avatarURL()}`
                        })
                        .setDescription(`The song is already paused`),
                ],
            });
        }
    }
}

module.exports = Pause;
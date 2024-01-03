const Command = require('../../structures/Command')

class Leave extends Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            description: {
                content: 'Leaves the voice channel',
                examples: ['leave'],
                usage: 'leave',
            },
            category: 'Music',
            aliases: ['dc','disconnect'],
            cooldown: 3,
            args: false,
            player: {
                voice: true,
                dj: true,
                active: false,
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
        if (player) {
            ctx.sendMessage({
                embeds: [
                    embed
                        .setDescription(`Left <#${player.player.connection.channelId}>`)
                        .setAuthor({
                            name: `Leave`,
                            iconURL: `${this.client.user?.avatarURL()}`
                        })
                ],
            });
            player.destroy();
        }
        else {
            ctx.sendMessage({
                embeds: [
                    embed
                        .setDescription(`I'm not in a voice channel`)
                        .setAuthor({
                            name: `Leave`,
                            iconURL: `${this.client.user?.avatarURL()}`
                        })
                ],
            });
        }
    }
}


module.exports = Leave;
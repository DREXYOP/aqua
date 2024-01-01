const Command = require('../../structures/Command')

class Skip extends Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            description: {
                content: 'Skips the current song',
                examples: ['skip'],
                usage: 'skip',
            },
            category: 'Music',
            aliases: ['sk'],
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
        const client = ctx.client;
        const player = client.queue.get(ctx.guild.id);
        const embed = this.client.embed();
        if (player.queue.length === 0)
            return await ctx.sendMessage({
                embeds: [
                    embed
                        .setAuthor({
                            name: `Skip`,
                            iconURL: `${this.client.user?.avatarURL()}`
                        })
                        .setDescription('There are no songs in the queue.'),
                ],
            });
        player.skip();
        if (!ctx.isInteraction) {
            ctx.message?.react('👍');
            await ctx.sendMessage({
                embeds: [
                    embed
                        .setAuthor({
                            name: `Skip`,
                            iconURL: `${this.client.user?.avatarURL()}`
                        })
                        .setDescription(`Skipped [${player.current.info.title}](${player.current.info.uri})`),
                ],
            });
        }
        else {
            return await ctx.sendMessage({
                embeds: [
                    embed
                        .setAuthor({
                            name: `Skip`,
                            iconURL: `${this.client.user?.avatarURL()}`
                        })
                        .setDescription(`Skipped [${player.current.info.title}](${player.current.info.uri})`),
                ],
            });
        }
    }
}


module.exports = Skip;
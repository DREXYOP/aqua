const Command = require('../../structures/Command');

class Resume extends Command {
    constructor(client) {
        super(client, {
            name: 'resume',
            description: {
                content: 'Resumes the current song',
                examples: ['resume'],
                usage: 'resume',
            },
            category: 'music',
            aliases: ['r'],
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
        const client = ctx.client;
        const player = client.queue.get(ctx.guild.id);
        const embed = this.client.embed();
        if (!player.paused)
            return await ctx.sendMessage({
                embeds: [
                    embed
                        .setAuthor({
                            name: `${this.name}`,
                            iconURL: `${this.client.user?.avatarURL()}`
                        })
                        .setDescription('The player is not paused.'),
                ],
            });
        player.pause();
        return await ctx.sendMessage({
            embeds: [embed.setDescription(`Resumed the player`).setAuthor({
                name: `${this.name}`,
                iconURL: `${this.client.user?.avatarURL()}`
            })],
        });
    }
}


module.exports = Resume;
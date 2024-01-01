const Command = require('../../structures/Command');

class Loop extends Command {
    constructor(client) {
        super(client, {
            name: 'loop',
            description: {
                content: 'loop the current song or the queue',
                examples: ['loop', 'loop queue', 'loop song'],
                usage: 'loop',
            },
            category: 'Music',
            aliases: ['loop'],
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
        const embed = ctx.client.embed()
        const player = ctx.client.queue.get(ctx.guild.id);
        switch (player.loop) {
            case 'off':
                player.loop = 'repeat';
                return await ctx.sendMessage({
                    embeds: [
                        embed
                            .setAuthor({
                                name: `Skip`,
                                iconURL: `${this.client.user?.avatarURL()}`
                            })
                            .setDescription(`**Looping the song**`),
                    ],
                });
            case 'repeat':
                player.loop = 'queue';
                return await ctx.sendMessage({
                    embeds: [
                        embed
                            .setAuthor({
                                name: `Skip`,
                                iconURL: `${this.client.user?.avatarURL()}`
                            })
                            .setDescription(`**Looping the queue**`),
                    ],
                });
            case 'queue':
                player.loop = 'off';
                return await ctx.sendMessage({
                    embeds: [
                        embed
                            .setAuthor({
                                name: `Skip`,
                                iconURL: `${this.client.user?.avatarURL()}`
                            })
                            .setDescription(`**Looping is now off**`),
                    ],
                });
        }
    }
}


module.exports = Loop;
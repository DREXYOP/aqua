const Command = require('../../structures/Command');

class Stop extends Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            description: {
                content: 'Stops the music and clears the queue',
                examples: ['stop'],
                usage: 'stop',
            },
            category: 'Music',
            aliases: ['sp'],
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
        const embed = client.embed();
        player.queue = [];
        player.stop();
        return await ctx.sendMessage({
            embeds: [
                embed
                    .setDescription(`Stopped the music and cleared the queue`)
                    .setAuthor({
                        name: `Skip`,
                        iconURL: `${this.client.user?.avatarURL()}`
                    })
            ],
        });
    }
}


module.exports = Stop;
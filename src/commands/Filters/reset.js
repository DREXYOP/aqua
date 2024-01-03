const Command = require('../../structures/Command');

class Reset extends Command {
    constructor(client) {
        super(client, {
            name: 'reset',
            description: {
                content: 'Resets the active filters',
                examples: ['reset'],
                usage: 'reset',
            },
            category: 'filters',
            aliases: ['reset'],
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
        player.player.clearFilters();
        player.filters = [];
        return await ctx.sendMessage({
            embeds: [
                ctx.client.embed().setDescription(`All filters have been reset.`)
            ],
        });
    }
}

module.exports = Reset;
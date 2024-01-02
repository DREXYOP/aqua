const Command = require("../../structures/Command");

class Autoplay extends Command {
    constructor(client) {
        super(client, {
            name: 'autoplay',
            description: {
                content: 'Toggles autoplay',
                examples: ['autoplay'],
                usage: 'autoplay',
            },
            category: 'Music',
            aliases: ['ap'],
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
        const autoplay = player.autoplay;
        if (!autoplay) {
            embed.setDescription(`Autoplay has been enabled`);
            player.setAutoplay(true);
        }
        else {
            embed.setDescription(`Autoplay has been disabled`);
            player.setAutoplay(false);
        }
        ctx.sendMessage({ embeds: [embed] });
    }
}

module.exports = Autoplay;
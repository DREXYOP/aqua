const Command = require('../../structures/Command');

class LavaLink extends Command {
    constructor(client) {
        super(client, {
            name: 'lavalink',
            description: {
                content: 'Shows the current Lavalink stats',
                examples: ['lavalink'],
                usage: 'lavalink',
            },
            category: 'Misc',
            aliases: ['ll'],
            cooldown: 3,
            args: false,
            player: {
                voice: false,
                dj: false,
                active: false,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: [],
            },
            slashCommand: true,
        });
    }

    async run(ctx, args) {
        const embed = ctx.client.embed();
        embed.setTitle('Lavalink Stats');
        embed.setThumbnail(ctx.client.user.avatarURL({}));
        embed.setTimestamp();

        ctx.client.shoukaku.nodes.forEach((node) => {
            try {
                embed.addFields({
                    name: 'Name',
                    value: `${node.name} (${node.stats ? '🟢' : '🔴'})`,
                });
                embed.addFields({ name: 'Player', value: `${node.stats.players}` });
                embed.addFields({ name: 'Playing Players', value: `${node.stats.playingPlayers}` });
                embed.addFields({
                    name: 'Uptime',
                    value: `${ctx.client.utils.formatTime(node.stats.uptime)}`,
                });
                embed.addFields({ name: 'Cores', value: `${node.stats.cpu.cores + ' Core(s)'}` });
                embed.addFields({
                    name: 'Memory Usage',
                    value: `${ctx.client.utils.formatBytes(node.stats.memory.used)}/${ctx.client.utils.formatBytes(node.stats.memory.reservable)}`,
                });
                embed.addFields({
                    name: 'System Load',
                    value: `${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%`,
                });
                embed.addFields({
                    name: 'Lavalink Load',
                    value: `${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%`,
                });
            } catch (e) {
                console.log(e);
            }
        });

        return await ctx.sendMessage({ embeds: [embed] });
    }
}

module.exports = LavaLink;

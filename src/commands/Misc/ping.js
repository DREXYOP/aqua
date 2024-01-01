const Command = require("../../structures/Command.js");


module.exports = class Ping extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: {
                content: 'Returns the latency of the bot.',
                usage: '{prefix}ping',
                examples: ['ping'],
            },
            aliases: ['pong'],
            category: 'Misc',
            cooldown: 3,
            player: {
                voice: false,
                dj: false,
                active: false,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ['SendMessages', 'ViewChannels', 'EmbedLinks'],
                user: [],
                voteRequired: false,
            },
            slashCommand: true,
        });
    }
    async run(ctx, args) {
        const msg = await ctx.sendDeferMessage('Pinging...');
        return await ctx.editMessage(`API Latency is: \`${Math.round(ctx.ping)}ms.\``);
    }
};
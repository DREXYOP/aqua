const Command = require("../../structures/Command.js");
const { ActionRowBuilder,ButtonBuilder,ButtonStyle} = require('discord.js');


module.exports = class Uptime extends Command {
    constructor(client) {
        super(client, {
            name: 'uptime',
            description: {
                content: 'Shows the uptime of the bot',
                usage: 'Uptime',
                examples: ['Uptime'],
            },
            aliases: ['ut'],
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
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel(`Get ${this.client.user?.username}`)
                .setStyle(ButtonStyle.Link)
                .setURL(`https://discord.com/api/oauth2/authorize?client_id=${this.client.user?.id}&permissions=${this.client.config.inv_perms}&scope=bot%20applications.commands`),
            new ButtonBuilder()
                .setLabel('Support Server')
                .setStyle(ButtonStyle.Link)
                .setURL(`${this.client.config.supportUri}`),
            new ButtonBuilder()
                .setLabel('Vote Me')
                .setStyle(ButtonStyle.Link)
                .setURL(`${this.client.config.topggUri}`)
        );
        return await ctx.sendMessage({
            content:`I Am Online Since \`${ctx.client.utils.formatTime(ctx.client.uptime)}\``,
            components:[row]
        });
    }
};
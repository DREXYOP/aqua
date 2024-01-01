const Command = require("../../structures/Command.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = class Ping extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            description: {
                content: 'Returns the invite link of the bot.',
                usage: '{prefix}invite',
                examples: ['invite'],
            },
            aliases: ['inv'],
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
        const embed = this.client.embed();
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel(`Get ${this.client.user?.username}`)
                .setStyle(ButtonStyle.Link)
                .setURL(`https://discord.com/api/oauth2/authorize?client_id=${this.client.user?.id}&permissions=8&scope=bot%20applications.commands`),
            new ButtonBuilder()
                .setLabel('Support Server')
                .setStyle(ButtonStyle.Link)
                .setURL(`${this.client.config.supportUri}`)
        );

        return await ctx.sendMessage({
            embeds: [
                embed
                    .setAuthor({
                        name: `${this.client.user?.username}`,
                        iconURL: `${this.client.user?.avatarURL()}`
                    })
                    .setDescription(`You can invite me by clicking the button below. Any bugs or outages? Join the support server!`),
            ],
            components: [row],
        });
    }
};

const os = require('os');
const Command = require("../../structures/Command.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

class About extends Command {
    constructor(client) {
        super(client, {
            name: 'about',
            description: {
                content: 'info about the bot',
                examples: ['about'],
                usage: 'about',
            },
            category: 'Misc',
            aliases: ['ab'],
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
            options: [],
        });
    }
    async run(ctx) {
        //    const tguilds = ctx.client.shard.fetchClientValues('guilds.cache.size').then(results => {
        // 	results.reduce((acc, guildCount) => acc + guildCount, 0)
        // }).catch(console.error);
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel(`Get ${this.client.user?.username}`)
                .setStyle(ButtonStyle.Link)
                .setURL(`https://discord.com/api/oauth2/authorize?client_id=${this.client.user?.id}&permissions=8&scope=bot%20applications.commands`),
            new ButtonBuilder()
                .setLabel('Support Server')
                .setStyle(ButtonStyle.Link)
                .setURL(`${this.client.config.supportUri}`),
            new ButtonBuilder()
                .setLabel('Vote Me')
                .setStyle(ButtonStyle.Link)
                .setURL(`${this.client.config.topggUri}`)
        );

        const osUptime = ctx.client.uptime;

        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMem = totalMem - freeMem;
        const botGuilds = this.client.guilds.cache.size;
        const botChannels = this.client.channels.cache.size;
        const botUsers = this.client.users.cache.size;
        const botCommands = this.client.commands.size;
        const botInfo = `
- **Developer**: [Drexy_xD#0](https://discord.com/users/983787597627273267)
- **Supporters**: [Indie Hq](https://discord.gg/jSnApadHJa)
- **Uptime**: ${this.client.utils.formatTime(osUptime)}
- **Credits**: This src is built by Drexy_xD with help from Indie Hq and other devs, a big thanks to all the devs who supported me make this src , some parts of this src are inspired from [brblacky/lavamusic](https://github.com/brblacky/lavamusic), there was no copying of code from any source which didn't allow it , the src was built totally with opensource pagkages along with some custom packages by the team. 
- **Total Commands**: ${botCommands}
  `;
        const embed = this.client.embed();
        return await ctx.sendMessage({
            embeds: [embed.setDescription(botInfo).setFooter({
                text: `thanks for choosing ${this.client.user.username}`,
                iconURL: `${this.client.user.avatarURL()}`
            }).setAuthor({
                name: `${this.client.user.username}`,
                iconURL: `${this.client.user.avatarURL()}`
            })
                .setTimestamp().setTitle('Bot Information:').setFooter({ text: `${ctx.author.username}`, iconURL: ctx.author.avatarURL() })
                .setTimestamp()],
            components: [row]
        });
    }
}

module.exports = About;
const { version } = require('discord.js');
const os = require('os');
const byteSize = require('byte-size')
const Command = require("../../structures/Command.js");


class Info extends Command {
    constructor(client) {
        super(client, {
            name: 'info',
            description: {
                content: 'Information about the bot',
                examples: ['info'],
                usage: '{prefix}info',
            },
            category: 'Misc',
            aliases: ['botinfo', 'bi'],
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
        const osType = os.type();
        const osRelease = os.release();
        const osUptime = os.uptime();
        const osHostname = os.hostname();
        const cpuArch = os.arch();
        const cpuCores = os.cpus().length;
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMem = totalMem - freeMem;
        const nodeVersion = process.version;
        const discordJsVersion = version;
        const botGuilds = this.client.guilds.cache.size;
        const botChannels = this.client.channels.cache.size;
        const botUsers = this.client.users.cache.size;
        const botCommands = this.client.commands.size;
        const botInfo = `
- **Operating System**: ${osType} ${osRelease}
- **Hostname**: ${osHostname}
- **Uptime**: ${this.client.utils.formatTime(osUptime)}
- **CPU Architecture**: ${cpuArch} (${cpuCores} cores)
- **Memory Usage**: ${this.client.utils.formatBytes(usedMem)} / ${this.client.utils.formatBytes(totalMem)} (${Math.round((usedMem / totalMem) * 100)}%)
- **Shards** - ${ctx.client.shard.count}
- **Shard ID** - ${ctx.guild.shard.id}
- **Cached** ${botGuilds} guilds, ${botChannels} channels, and ${botUsers} users
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
            .setTimestamp().setTitle('Bot Information:').setFooter({text:`${ctx.author.username}`, iconURL:ctx.author.avatarURL()})
            .setTimestamp()],
        });
    }
}

module.exports = Info;
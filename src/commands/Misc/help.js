const prefixSchema = require("../../schemas/prefixSchema.js");
const Command = require("../../structures/Command.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


module.exports = class Help extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            description: {
                content: 'Displays all the commands of the bot.',
                usage: 'help',
                examples: ['help','help <command>'],
            },
            aliases: ['h'],
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
            options: [
                {
                    name: 'command',
                    description: 'any command you want help with',
                    type: 3,
                    required: false,
                },
            ],
        });
    }
    async run(ctx, args) {
        this.client = ctx.client;
        const embed = this.client.embed();
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
        let prefix = await prefixSchema.findOne({guildId:ctx.guild.id});
        if(!prefix){
            prefix =  ctx.client.prefix;
        }
        // const msg = await ctx.sendDeferMessage('Fetching all commands...');
        const commands = this.client.commands.filter(cmd => cmd.category !== 'dev');
        const categories = commands
            .map(cmd => cmd.category)
            .filter((value, index, self) => self.indexOf(value) === index);
        if (!args[0]) {
            const fildes = [];
            categories.forEach(category => {
                fildes.push({
                    name: `${category} [${commands.filter(cmd => cmd.category === category).size}]`,
                    value: commands
                    .filter(cmd => cmd.category === category)
                    .map(cmd => `\`${cmd.name}\``)
                    .join(', '),
                    inline: false,
                });
            });
            const helpEmbed = embed
                .setThumbnail(`${this.client.user?.avatarURL()}`)
                .setAuthor({
                    name: `${this.client.user?.username} | ${this.name}`,
                    iconURL: `${ctx.author.avatarURL()}`
                })
                .setTimestamp()
                .setDescription(`Hey It's Me ${this.client.user?.username} a Versatile Music Bot With The Crisp of Awesome Music Quality With Over Powered Features`)
                .setFooter({
                    text: `thanks for choosing ${this.client.user?.username}`,
                    iconURL: `${this.client.user.avatarURL()}`
                });
            fildes.forEach(field => helpEmbed.addFields(field));
            ctx.sendMessage({ embeds: [helpEmbed], components:[row]});
        }else {
            const command = this.client.commands.get(args[0].toLowerCase());
            if (!command)
                return await ctx.sendMessage({
                    embeds: [
                        this.client
                            .embed()
                            .setDescription(`Command \`${args[0]}\` not found`),
                    ],
                });
            const embed = this.client.embed();
            const helpEmbed = embed
                .setAuthor({name:`Help Menu - ${command.name}`,iconURL:ctx.author.avatarURL()}).setDescription(`${command.description.content}
**Usage:** ${prefix}${command.description.usage}
**Examples:** ${command.description.examples.map(example => `${prefix}${example}`).join(',\n ')}
**Aliases:** ${command.aliases.map(alias => `\`${alias}\``).join(', ')}
**Category:** ${command.category}
**Cooldown:** ${command.cooldown} seconds
**Permissions:** ${command.permissions.user.length > 0
                        ? command.permissions.user.map(perm => `\`${perm}\``).join(', ')
                        : 'None'}
**Bot Permissions:** ${command.permissions.client.map(perm => `\`${perm}\``).join(', ')}
**Slash Command:** ${command.slashCommand ? 'Yes' : 'No'}
**Args:** ${command.args ? 'Yes' : 'No'}
**Player:** ${command.player.active ? 'Yes' : 'No'}
**Voice:** ${command.player.voice ? 'Yes' : 'No'}`);
            ctx.sendMessage({ embeds: [helpEmbed],components:[row] });
        }

    }
};
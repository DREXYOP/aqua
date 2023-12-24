const Command = require("../../structures/Command.js");


module.exports = class Help extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            description: {
                content: 'Displays all the commands of the bot.',
                usage: '{prefix}help',
                examples: ['a!help'],
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
        });
    }
    async run(ctx, args) {
        
        const embed = this.client.embed();
        const prefix = this.client.prefix;
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
                .setTitle('Help Menu')
                .setAuthor({
                    name: `${this.client.user.username}`,
                    iconURL: `${this.client.user.avatarURL()}`
                })
                .setTimestamp()
                .setDescription(`Hey It's Me ${this.client.user.username} a Versatile Music Bot With The Crisp of Awesome Music Quality With Over Powered Features`)
                .setFooter({
                    text: `thanks for choosing ${this.client.user.username}`,
                    iconURL: `${this.client.user.avatarURL()}`
                });
            fildes.forEach(field => helpEmbed.addFields(field));
            ctx.sendMessage({ embeds: [helpEmbed] });
        }

    }
};
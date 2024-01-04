const prefixData = require('../../schemas/prefixSchema.js');
const Command = require('../../structures/Command.js');

class Prefix extends Command {
    constructor(client) {
        super(client, {
            name: 'prefix',
            description: {
                content: 'Shows the bot\'s prefix',
                examples: ['prefix', 'prefix reset', 'prefix set !'],
                usage: 'prefix set, prefix reset, prefix set !',
            },
            category: 'Misc',
            aliases: ['prefix'],
            cooldown: 3,
            args: true,
            player: {
                voice: false,
                dj: false,
                active: false,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: ['ManageGuild'],
            },
            slashCommand: true,
            options: [
                {
                    name: 'set',
                    description: 'Sets the prefix',
                    type: 1,
                    options: [
                        {
                            name: 'prefix',
                            description: 'The prefix you want to set',
                            type: 3,
                            required: false,
                        },
                    ],
                },
                {
                    name: 'reset',
                    description: 'Resets the prefix to the default one',
                    type: 1,
                },
            ],
        });
    }
    async run(ctx, args) {
        const embed = this.client.embed();
        let prefix = await prefixData.findOne({guildId:ctx.guild.id});
        let subCommand;
        let pre;
        if (ctx.isInteraction) {
            subCommand = ctx.interaction.options.data[0].name;
            pre = ctx.interaction.options.data[0].options[0]?.value.toString();
        }
        else {
            subCommand = args[0];
            pre = args[1];
        }
        if(!subCommand){
            embed.setDescription(`The prefix for this server is \`${prefix ? prefix.prefix : this.client.prefix}\``);
            return await ctx.sendMessage({ embeds: [embed] }); 
        }
        switch (subCommand) {
            
            case 'set':
                if (!pre) {
                    embed.setDescription(`The prefix for this server is \`${prefix ? prefix.prefix : this.client.prefix}\``);
                    return await ctx.sendMessage({ embeds: [embed] });
                }
                if (pre.length > 3)
                    return await ctx.sendMessage({
                        embeds: [
                            embed.setDescription(`The prefix can't be longer than 3 characters`),
                        ],
                    });
                if (!prefix) {
                    prefix = await prefixData.create({prefix:pre,guildId:ctx.guild.id});
                    return await ctx.sendMessage({
                        embeds: [
                            embed.setDescription(`The prefix for this server is now \`${prefix.prefix}\``),
                        ],
                    });
                }
                else {
                    await prefixData.findOneAndUpdate({guildId:ctx.guild.id}, {prefix:pre});
                    prefix = await prefixData.findOne({guildId:ctx.guild.id});
                    return await ctx.sendMessage({
                        embeds: [
                            embed.setDescription(`The prefix for this server is now set to \`${prefix.prefix}\``),
                        ],
                    });
                }
            case 'reset':
                if (!prefix)
                    return await ctx.sendMessage({
                        embeds: [
                            embed.setDescription(`The prefix for this server is already set to \`${this.client.prefix}\``),
                        ],
                    });
                await prefixData.deleteOne({guildId:ctx.guild.id});
                prefix = await prefixData.findOne({guildId:ctx.guild.id});
                return await ctx.sendMessage({
                    embeds: [
                        embed.setDescription(`The prefix for this server is now \`${this.client.prefix}\``),
                    ],
                });
        }
    }
}

module.exports = Prefix;
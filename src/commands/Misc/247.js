const Command = require("../../structures/Command.js");
const _247Schema = require('../../schemas/_247.js');

module.exports = class _247 extends Command {
    constructor(client) {
        super(client, {
            name: '247',
            description: {
                content: 'enables/disables the 24/7 mode.',
                usage: '247 enable/disable',
                examples: ['24/7 enable','24/7 disable'],
            },
            aliases: ['24/7'],
            category: 'Misc',
            cooldown: 3,
            player: {
                voice: true,
                dj: false,
                active: false,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ['SendMessages', 'ViewChannels', 'EmbedLinks', 'Connect', 'Speak'],
                user: [],
                voteRequired: true,
            },
            slashCommand: true,
        });
    }
    async run(ctx) {
        const embed = ctx.client.embed();
        const data = await _247Schema.findOne({ guildId: ctx.guild.id });
        console.log(data);
        if(!data){
            const newData = {
                guildId: ctx.guild.id,
                voiceId: ctx.member.voice.channel.id,
                channelId: ctx.channel.id,
                _247:true
            }
            await _247Schema.create(newData);
            return await ctx.sendMessage({
                    embeds: [
                        embed
                            .setAuthor({
                                name: `24/7`,
                                iconURL: `${this.client.user?.avatarURL()}`
                            })
                            .setDescription(`Enabled 24/7 mode for this server.`)
                            .setFooter({text:`${ctx.author.username}`, iconURL:ctx.author.avatarURL()})
                            .setTimestamp()
                    ],
            })
        } else {
            await _247Schema.deleteOne({guildId:ctx.guild.id});
            return await ctx.sendMessage({
                    embeds: [
                        embed
                            .setAuthor({
                                name: `24/7`,
                                iconURL: `${this.client.user?.avatarURL()}`
                            })
                            .setDescription(`Disabled 24/7 mode for this server.`)
                            .setFooter({text:`${ctx.author.username}`, iconURL:ctx.author.avatarURL()})
                            .setTimestamp()
                    ],
            })
        }
    }
};
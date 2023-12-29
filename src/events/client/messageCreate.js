const Context = require("../../structures/Context.js");
const prefixData = require("../../schemas/prefixSchema.js")

const {
    CommandInteraction,
    Interaction,
    Collection,
    ChannelType,
    InteractionType,
    PermissionFlagsBits,
} = require('discord.js');
module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client,message) {
        if (
            message.author.bot ||
            !message.guild ||
            message.system ||
            message.webhookId
        ) return;


        if (message.partial) await message.fetch();
        
        

        const ctx = new Context(message);
        const prefix = await prefixData.findOne({guildId:message.guild.id});
        const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (message.content.match(mention)) {
            if (message.channel.permissionsFor(client.user).has([PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.ViewChannel])) {
                return await message.reply({ content: `Hey, my prefix for this server is \`${prefix ? prefix.prefix : client.prefix}\` Want more info? then do \`${prefix ? prefix.prefix : client.prefix}help\`\nStay Safe, Stay Awesome!` }).catch((err) => {console.log(err)});
            }
        }

        // const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${prefix ? prefix.prefix : client.prefix})\\s*`);
        if (!prefixRegex.test(message.content)) return;
        const [matchedPrefix] = message.content.match(prefixRegex);

        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.aliases.get(commandName);

        ctx.setArgs(args);

        if (!command) return;
        client.logger.log("command",`${command.name} used by ${ctx.author.id}`);
        let dm = message.author.dmChannel;
        if (typeof dm === 'undefined') dm = await message.author.createDM();

        if (!message.inGuild() || !message.channel.permissionsFor(message.guild.members.me).has(PermissionFlagsBits.ViewChannel)) return;

        if (!message.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)) return await message.author.send({ content: `I don't have **\`SEND_MESSAGES\`** permission in \`${message.guild.name}\`\nchannel: <#${message.channelId}>` }).catch(() => { });

        if (!message.guild.members.me.permissions.has(PermissionFlagsBits.EmbedLinks)) return await message.channel.send({ content: 'I don\'t have **`EMBED_LINKS`** permission.' }).catch(() => { });

        if (command.permissions) {
            if (command.permissions.client) {
                if (!message.guild.members.me.permissions.has(command.permissions.client)) return await message.reply({ content: 'I don\'t have enough permissions to execute command.' });
            }

            if (command.permissions.user) {
                if (!message.member.permissions.has(command.permissions.user)) return await message.reply({ content: 'You don\'t have enough permissions to use command.' });

            }
            if (command.permissions.dev) {
                if (client.config.owners) {
                    const findDev = client.config.owners.find((x) => x === message.author.id);
                    if (!findDev) return;
                }

            }
        }

       
        if (command.args) {
            if (!args.length) return await message.reply({ content: `Please provide the required arguments. \`${command.description.examples}\`` });
        }
        if (command.player) {
            if (command.player.voice) {
                if (!message.member.voice.channel)
                    return await message.reply({
                        content: `:x: You must be connected to a voice channel to use the \`${command.name}\` command!`,
                    });
                if (!message.guild.members.me.permissions.has(PermissionFlagsBits.Speak))
                    return await message.reply({
                        content: `:x: I don't have \`CONNECT\` permissions to execute \`${command.name}\` command.`,
                    });
                if (!message.guild.members.me.permissions.has(PermissionFlagsBits.Speak))
                    return await message.reply({
                        content: `:x: I don't have \`SPEAK\` permissions to execute \`${command.name}\` command.`,
                    });
                if (message.member.voice.channel.type === ChannelType.GuildStageVoice &&
                    !message.guild.members.me.permissions.has(PermissionFlagsBits.RequestToSpeak))
                    return await message.reply({
                        content: `:x: I don't have \`REQUEST TO SPEAK\` permission to execute \`${command.name}\` command.`,
                    });
                if (message.guild.members.me.voice.channel) {
                    if (message.guild.members.me.voice.channelId !== message.member.voice.channelId)
                        return await message.reply({
                            content: `:x: You are not connected to the same voice channel as me <#${message.guild.members.me.voice.channel.id}> to use \`${command.name}\` command.`,
                        });
                }
            }
            if (command.player.active) {
                if (!client.queue.get(message.guildId))
                    return await message.reply({
                        content: 'Nothing is playing right now.',
                    });
                if (!client.queue.get(message.guildId).queue)
                    return await message.reply({
                        content: 'Nothing is playing right now.',
                    });
                if (!client.queue.get(message.guildId).current)
                    return await message.reply({
                        content: 'Nothing is playing right now.',
                    });
            }
            if (command.player.dj) {
                (()=>{});
            }
        }
        if (!client.cooldowns.has(commandName)) {
            client.cooldowns.set(commandName, new Collection());
        }
        const now = Date.now();
        const timestamps = client.cooldowns.get(commandName);
        const cooldownAmount = Math.floor(command.cooldown || 5) * 1000;
        if (!timestamps.has(message.author.id)) {
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }
        else {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            const timeLeft = (expirationTime - now) / 1000;
            if (now < expirationTime && timeLeft > 0.9) {
                return await message.reply({
                    content: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${commandName}\` command.`,
                });
            }
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }
        if (args.includes('@everyone') || args.includes('@here'))
            return await message.reply({
                content: 'You can\'t use this command with everyone or here.',
            });

        try {

            return await command.run(ctx, ctx.args);

        } catch (error) {
            await message.channel.send({ content: 'An unexpected error occured, the developers have been notified!' }).catch(() => { });
            console.error(error);
        }

    }
}
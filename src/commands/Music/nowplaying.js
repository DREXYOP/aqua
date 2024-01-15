const Command = require('../../structures/Command');
const { nowPlayingCard } = require('../../structures/CanvasCard');
const { AttachmentBuilder, ActionRowBuilder,ButtonStyle, ButtonBuilder } = require('discord.js');


class Nowplaying extends Command {
    constructor(client) {
        super(client, {
            name: 'nowplaying',
            description: {
                content: 'Shows the currently playing song',
                examples: ['nowplaying'],
                usage: 'nowplaying',
            },
            category: 'Music',
            aliases: ['np'],
            cooldown: 3,
            args: false,
            player: {
                voice: true,
                dj: false,
                active: true,
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
        const client = ctx.client;
        const player = client.queue.get(ctx.guild.id);
        const track = player.current;
        const position = player.player.position;
        const duration = track.info.length;
        const row = new ActionRowBuilder().addComponents(
            // new ButtonBuilder()
            //     .setLabel(`Get ${this.client.user?.username}`)
            //     .setStyle(ButtonStyle.Link)
            //     .setURL(`https://discord.com/api/oauth2/authorize?client_id=${this.client.user?.id}&permissions=${this.client.config.inv_perms}&scope=bot%20applications.commands`),
            // new ButtonBuilder()
            //     .setLabel('Support Server')
            //     .setStyle(ButtonStyle.Link)
            //     .setURL(`${this.client.config.supportUri}`),
            new ButtonBuilder()
                .setLabel('Vote Me')
                .setStyle(ButtonStyle.Link)
                .setURL(`${this.client.config.topggUri}`)
        );
        const percent = Math.round((position / duration) * 100);
        // const bar = client.utils.progressBar(position, duration, 20);
        const card = new nowPlayingCard();
        card
            .setAuthor(`requested by ${track.info.requester.username}`)
            .setColor(`auto`)
            .setTheme(`classic`)
            .setName(track.info.title)
            .setThumbnail(track.info.thumbnail)
            .setStartTime(`0:00`)
            .setProgress(percent)
            .setEndTime(`${ctx.client.utils.formatTime(duration)}`)
        const cardBuffer = await card.build();
        const attachment = new AttachmentBuilder(cardBuffer, { name: `nowplayingimg.png` });
        const embed1 = this.client
            .embed()
            .setAuthor({ name: 'Now Playing', iconURL: ctx.author.avatarURL({}) })
            .setImage(`attachment://nowplayingimg.png`)
            // .setThumbnail(track.info.thumbnail)
            // .setDescription(`[${track.info.title}](${track.info.uri}) - Request By: ${track.info.requester}`)
            // .addFields({
            //     name: 'Time',
            //     value: `\`${bar}\` ${client.utils.formatTime(position)} / ${client.utils.formatTime(duration)}`,
            // });
        return await ctx.sendMessage({ embeds: [embed1] , files:[attachment], components:[row] });
    }
}

module.exports = Nowplaying;
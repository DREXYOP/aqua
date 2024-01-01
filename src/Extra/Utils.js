const { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, ComponentType } = require('discord.js');
const byt_es = require('bytes');
const pretty_time = require('ms');

module.exports = class Utils {
    formatTime(ms) {
        return pretty_time(ms);
    }
    chunk(array, size) {
        const chunked_arr = [];
        let index = 0;
        while (index < array.length) {
            chunked_arr.push(array.slice(index, size + index));
            index += size;
        }
        return chunked_arr;
    }
    formatBytes(bytes, decimals = 2) {
        return byt_es(bytes);
    }
    formatNumber(number) {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    parseTime(string) {
        const time = string.match(/([0-9]+[d,h,m,s])/g);
        if (!time)
            return 0;
        let ms = 0;
        for (const t of time) {
            const unit = t[t.length - 1];
            const amount = Number(t.slice(0, -1));
            if (unit === 'd')
                ms += amount * 24 * 60 * 60 * 1000;
            else if (unit === 'h')
                ms += amount * 60 * 60 * 1000;
            else if (unit === 'm')
                ms += amount * 60 * 1000;
            else if (unit === 's')
                ms += amount * 1000;
        }
        return ms;
    }
    progressBar(current, total, size = 20) {
        const percent = Math.round((current / total) * 100);
        const filledSize = Math.round((size * current) / total);
        const emptySize = size - filledSize;
        const filledBar = '-'.repeat(filledSize);
        const emptyBar = '_'.repeat(emptySize);
        const progressBar = `${filledBar}${emptyBar} ${percent}%`;
        return progressBar;
    }
    async paginate(ctx, embed) {
        if (embed.length < 2) {
            if (ctx.isInteraction) {
                ctx.deferred
                    ? ctx.interaction.followUp({ embeds: embed })
                    : ctx.interaction.reply({ embeds: embed });
                return;
            }
            else {
                ctx.channel.send({ embeds: embed });
                return;
            }
        }
        let page = 0;
        const getButton = (page) => {
            const firstEmbed = page === 0;
            const lastEmbed = page === embed.length - 1;
            const pageEmbed = embed[page];
            const first = new ButtonBuilder()
                .setCustomId('fast')
                .setEmoji('⏪')
                .setStyle(ButtonStyle.Primary);
            if (firstEmbed)
                first.setDisabled(true);
            const back = new ButtonBuilder()
                .setCustomId('back')
                .setEmoji('◀️')
                .setStyle(ButtonStyle.Primary);
            if (firstEmbed)
                back.setDisabled(true);
            const next = new ButtonBuilder()
                .setCustomId('next')
                .setEmoji('▶️')
                .setStyle(ButtonStyle.Primary);
            if (lastEmbed)
                next.setDisabled(true);
            const last = new ButtonBuilder()
                .setCustomId('last')
                .setEmoji('⏩')
                .setStyle(ButtonStyle.Primary);
            if (lastEmbed)
                last.setDisabled(true);
            const stop = new ButtonBuilder()
                .setCustomId('stop')
                .setEmoji('⏹️')
                .setStyle(ButtonStyle.Danger);
            const row = new ActionRowBuilder().addComponents(first, back, stop, next, last);
            return { embeds: [pageEmbed], components: [row] };
        };
        const msgOptions = getButton(0);
        let msg;
        if (ctx.isInteraction) {
            msg = ctx.deferred
                ? await ctx.interaction.followUp({
                    ...msgOptions,
                    fetchReply: true,
                })
                : await ctx.interaction.reply({
                    ...msgOptions,
                    fetchReply: true,
                });
        }
        else {
            msg = await ctx.channel.send({
                ...msgOptions,
                fetchReply: true,
            });
        }
        let author;
        if (ctx instanceof CommandInteraction) {
            author = ctx.user;
        }
        else {
            author = ctx.author;
        }
        const filter = (int) => int.user.id === author.id;
        const collector = msg.createMessageComponentCollector({
            componentType: ComponentType.Button,
            filter,
            time: 60000,
        });
        collector.on('collect', async (interaction) => {
            if (interaction.user.id === author.id) {
                await interaction.deferUpdate();
                if (interaction.customId === 'fast') {
                    if (page !== 0) {
                        page = 0;
                        const newEmbed = getButton(page);
                        await interaction.editReply(newEmbed);
                    }
                }
                if (interaction.customId === 'back') {
                    if (page !== 0) {
                        page--;
                        const newEmbed = getButton(page);
                        await interaction.editReply(newEmbed);
                    }
                }
                if (interaction.customId === 'stop') {
                    collector.stop();
                    await interaction.editReply({
                        embeds: [embed[page]],
                        components: [],
                    });
                }
                if (interaction.customId === 'next') {
                    if (page !== embed.length - 1) {
                        page++;
                        const newEmbed = getButton(page);
                        await interaction.editReply(newEmbed);
                    }
                }
                if (interaction.customId === 'last') {
                    if (page !== embed.length - 1) {
                        page = embed.length - 1;
                        const newEmbed = getButton(page);
                        await interaction.editReply(newEmbed);
                    }
                }
            }
            else {
                await interaction.reply({
                    content: 'You can\'t use this button',
                    ephemeral: true,
                });
            }
        });
        collector.on('end', async () => {
            await msg.edit({ embeds: [embed[page]], components: [] });
        });
    }
}

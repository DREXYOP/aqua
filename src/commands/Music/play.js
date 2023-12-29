const Command = require('../../structures/Command')
class Play extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            description: {
                content: 'Plays a song from YouTube or Spotify',
                examples: [
                    'play https://www.youtube.com/watch?v=QH2-TGUlwu4',
                    'play https://open.spotify.com/track/6WrI0LAC5M1Rw2MnX2ZvEg',
                ],
                usage: 'play <song>',
            },
            category: 'Music',
            aliases: ['p'],
            cooldown: 3,
            args: true,
            player: {
                voice: true,
                dj: false,
                active: false,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks', 'Connect', 'Speak'],
                user: [],
            },
            slashCommand: true,
            options: [
                {
                    name: 'song',
                    description: 'The song you want to play',
                    type: 3,
                    required: true,
                    autocomplete: true,
                },
            ],
        });
    }
    async run(ctx, args) {
        this.client = ctx.client;
        const query = args.join(' ');
        let player = ctx.client.queue.get(ctx.guild.id);
        const vc = ctx.member;
        
        if (!player)
            player = await ctx.client.queue.create(ctx.guild, vc.voice.channel, ctx.channel, ctx.client.shoukaku.getNode());
        const res = await ctx.client.queue.search(query);
        const embed = ctx.client.embed();
        switch (res.loadType) {
            case 'LOAD_FAILED':
                ctx.sendMessage({
                    embeds: [
                        embed
                            .setDescription('There was an error while searching.'),
                    ],
                });
                break;
            case 'NO_MATCHES':
                ctx.sendMessage({
                    embeds: [
                        embed
                            .setDescription('There were no results found.'),
                    ],
                });
                break;
            case 'TRACK_LOADED': {
                const track = player.buildTrack(res.tracks[0], ctx.author);
                if (player.queue.length > ctx.client.config.maxQueueSize)
                    return await ctx.sendMessage({
                        embeds: [
                            embed
                                .setColor(this.client.color.red)
                                .setDescription(`The queue is too long. The maximum length is ${client.config.maxQueueSize} songs.`),
                        ],
                    });
                player.queue.push(track);
                await player.isPlaying();
                ctx.sendMessage({
                    embeds: [
                        embed
                            .setDescription(`Added [${res.tracks[0].info.title}](${res.tracks[0].info.uri}) to the queue.`),
                    ],
                });
                break;
            }
            case 'PLAYLIST_LOADED':
                if (res.length > client.config.maxPlaylistSize)
                    return await ctx.sendMessage({
                        embeds: [
                            embed
                                .setDescription(`The playlist is too long. The maximum length is ${client.config.maxPlaylistSize} songs.`),
                        ],
                    });
                for (const track of res.tracks) {
                    const pl = player.buildTrack(track, ctx.author);
                    if (player.queue.length > this.client.config.maxQueueSize)
                        return await ctx.sendMessage({
                            embeds: [
                                embed
                                    .setDescription(`The queue is too long. The maximum length is ${this.client.config.maxQueueSize} songs.`),
                            ],
                        });
                    player.queue.push(pl);
                }
                await player.isPlaying();
                ctx.sendMessage({
                    embeds: [
                        embed
                            .setDescription(`Added ${res.tracks.length} songs to the queue.`),
                    ],
                });
                break;
            case 'SEARCH_RESULT': {
                const track1 = player.buildTrack(res.tracks[0], ctx.author);
                if (player.queue.length > ctx.client.config.maxQueueSize)
                    return await ctx.sendMessage({
                        embeds: [
                            embed
                                .setDescription(`The queue is too long. The maximum length is ${ctx.client.config.maxQueueSize} songs.`),
                        ],
                    });
                player.queue.push(track1);
                await player.isPlaying();
                ctx.sendMessage({
                    embeds: [
                        embed
                            .setDescription(`Added [${res.tracks[0].info.title}](${res.tracks[0].info.uri}) to the queue.`),
                    ],
                });
                break;
            }
        }
    }
}

module.exports = Play;
const { ClusterManager } = require('discord-hybrid-sharding');
const { token } = require('./src/config.json');


const manager = new ClusterManager(`${__dirname}/src/index.js`, {
    totalShards: "auto",
    token: token,
    mode: "process",
    shardsPerClusters: 2
});

manager.on("clusterCreate", (cluster) => {
    cluster.on("ready", () => {
        console.log("[Cluster Manager ==> Cluster] Cluster \"" + cluster.id + "\" entered ready");
    });
    cluster.on("reconnecting", () => {
        console.log("[Cluster Manager ==> Cluster] Cluster \"" + cluster.id + "\" is reconnecting to discord WS");
    });
    cluster.on("error", () => {
        console.log("[Cluster Manager ==> Cluster] Cluster \"" + cluster.id + "\" got errored");
    });
    console.log("[Cluster Manager ==> Cluster] Cluster \"" + cluster.id + "\" created");
});
manager
    .spawn({ timeout: -1 })
    .then(() => {
        console.log("[Cluster Manager] The bot is now ready and all shards are connected to Discord Websocket.");
    });
const moosic  = require("./client/aquaClient.js");
new moosic(require("./config.json").token , require("./config.json"));

process.on('unhandledRejection', (reason, p) => {
    console.log(reason, p);
});

process.on('uncaughtException', (err, origin) => {
    console.log(err, origin);
});


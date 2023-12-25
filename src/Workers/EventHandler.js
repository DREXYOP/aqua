const {readdirSync} = require("node:fs")
const {join} = require("path")


 class ClientEventHandler {
    constructor(client) {
        this.client = client
        
        client.logger.debug('Client Events', 'Loading events')
    }

    start() {
        const eventFiles = readdirSync(join(__dirname, "..","events","client")).filter(file => file.endsWith('.js'));
     let nic = 0;
        for (const file of eventFiles) {
            
            const event = require(`../events/client/${file}`);
            if (event.once) {
                this.client.once(event.name, (...args) => event.execute( this.client, ...args));
            } else {
                this.client.on(event.name, (...args) => event.execute(this.client,...args));
            }
            nic++;
        }
        this.client.logger.debug('Client EVENTS', `Loaded ${nic} events`)
    }
    
}


 class MusicEventHandler {
    constructor(client) {
        this.client = client
        
        client.logger.debug('Music EVENTS', 'Loading events')
    }

    start() {
        const eventFiles = readdirSync(join(__dirname, "..","events","music")).filter(file => file.endsWith('.js'));
     let nic = 0;
        for (const file of eventFiles) {
            
            let event = require(`../events/music/${file}`);
        
        this.client.shoukaku.on(event.name, (...args) => event.run(this.client , ...args));
            nic++;
        }
        this.client.logger.debug('Music EVENTS', `Loaded ${nic} events`)
    }
    
}

module.exports = {ClientEventHandler,MusicEventHandler}
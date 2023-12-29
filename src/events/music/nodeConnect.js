module.exports = {
    name:"nodeConnect",
    async run(client, node) {
      client.logger.log("NODE",`Node ${node.name} is ready.`);
    }
  }; 
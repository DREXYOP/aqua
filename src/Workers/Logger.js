const moment = require("moment");
const date = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;
const colors = require('colors');
colors.enable();
module.exports = class Logger {

    error(error , content) {
        console.error(`[${date}]`.green, ` : [DEBUG]`.red, `[${error}]`.yellow, ` =>  ${content}`.cyan);
    }

    debug(name, content) {
        console.log(`[${date}]`.green, ` : [DEBUG]`.red, `[${name}]`.yellow, ` =>  ${content}`.cyan);
    }

    event(name, content) {

        console.log(`[${date}]`.green, ` : [EVENT]`.red, `[${name}]`.yellow, ` =>  ${content}`.blue);
    }

    log(name, content) {

        console.log(`[${date}]`.green, ` : [LOGS]`.red, `[${name}]`.yellow, ` =>  ${content}`.blue);
    }


}
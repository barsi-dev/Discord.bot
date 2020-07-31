// const config = require('./config.json');
const mineflayer = require('mineflayer');
let args = process.argv.slice(2);
console.log('>>>>>>>>' + args);

var bot = mineflayer.createBot({
	host: args[0], // optional
	port: args[1], // optional
	username: args[2], // email and password are required only for
	password: args[3],
	version: false, // false corresponds to auto version detection (that's the default), put for example "1.8.8" if you need a specific version
});

bot.on('login', () => {
	console.log(`Logged in as ${bot.username}`);
});

const { prefix: PRE, token } = require('./config.json');
const discord = require('discord.js');
const fs = require('fs');

const client = new discord.Client();

client.commands = new discord.Collection();

const cmdFiles = fs
	.readdirSync('./cmds/')
	.filter((file) => file.endsWith('.js'));

client.once('ready', () => {
	console.log('Bot online!');
});

client.on('message', async (message) => {
	if (!message.content.startsWith(PRE) || message.author.bot) return;

	const args = message.content.slice(PRE.length).split(' ');
	const command = args[0].toLowerCase();

	for (nc of cmdFiles) {
		if (nc.startsWith(command)) {
			let newCmd = require(`./cmds/${command}.js`);
			client.commands.set(newCmd.name, newCmd);
			await client.commands.get(command).execute(message, args);
		}
	}
});

client.login(token);

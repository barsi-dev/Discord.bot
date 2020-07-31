const { prefix: PRE, token: TOKEN } = require('./config.json');
const discord = require('discord.js');
const fs = require('fs');

const client = new discord.Client();

client.commands = new discord.Collection();

const cmdFiles = fs
	.readdirSync('./cmds/')
	.filter((file) => file.endsWith('.js'));

for (const file of cmdFiles) {
	let newCmd = require(`./cmds/${file}`);
	client.commands.set(newCmd.name, newCmd);
}

let help = cmdFiles
	.map((x) => {
		let temp = x.split('.');
		temp = temp[0].toString();

		let test = client.commands.get(temp);
		return `   ${PRE}${test.name} - ${test.description}\n`;
	})
	.join('');

client.once('ready', () => {
	console.log('Bot online!');
});

client.on('message', (message) => {
	if (!message.content.startsWith(PRE) || message.author.bot) return;
	const args = message.content.slice(PRE.length).split(' ');
	const commandName = args.shift().toLowerCase();

	if (commandName === 'help') {
		message.channel.send(`Bot Commands: \n\`\`\`${help}\`\`\``);
		return;
	}

	if (!client.commands.has(commandName)) return;
	const command = client.commands.get(commandName);

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.channel.send(
			`I can't execute that command inside DMs, ${message.author}!`
		);
	}

	if (command.dmOnly && message.channel.type !== 'dm') {
		return message.channel.send(
			`I'm sorry. You must DM the bot for that command to work, ${message.author}`
		);
	}

	// console.log(client.commands);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply(`'\$${command}' is not a command`);
	}
});

client.login(TOKEN);

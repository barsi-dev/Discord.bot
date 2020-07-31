const { spawn } = require('child_process');

module.exports = {
	name: 'createcbot',
	description: 'This command creates a cracked mc bot',
	help: `/createcbot <alias> <ip> <port> <username>`,
	execute(message, args) {
		if (args[0].toLowerCase() === 'help')
			return message.channel.send(`\`${this.description}\n${this.help}\``);
		if (!message.member.roles.cache.has('735080627652526130')) return;

		const ls = spawn('pm2', [
			'start',
			`--name=${args[0]}`,
			'routes/newbot.js',
			'--',
			`${args[1]}`,
			`${args[2]}`,
			`${args[3]}`,
		]);
	},
};

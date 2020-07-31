const { spawn } = require('child_process');

module.exports = {
	name: 'startbot',
	description: 'This command start a mc bot',
	execute(message, args) {
		// if(!message.guild.roles.cache.has('735080627652526130')) return
		if (!message.member.roles.cache.has('735080627652526130')) return;

		const ls = spawn('pm2', ['start', `${args[0]}`]);
	},
};

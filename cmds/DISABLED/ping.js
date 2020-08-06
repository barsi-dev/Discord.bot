module.exports = {
	name: 'ping',
	description: 'This is a ping command!',
	guildOnly: true,
	execute(message, args) {
		message.reply('pong!').then((r) => r.delete({ timeout: 5000 }));
	},
};

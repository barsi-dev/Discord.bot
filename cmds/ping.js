module.exports = {
	name: 'ping',
	description: 'This is a ping command!',
	guildOnly: true,
	execute(message, args) {
		message.channel.send('pong!');
	},
};

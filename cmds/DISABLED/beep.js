module.exports = {
	name: 'beep',
	description: 'This is a beep command!',
	execute(message, args) {
		message.channel.send('boop!');
	},
};

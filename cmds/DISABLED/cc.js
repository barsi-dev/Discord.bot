module.exports = {
	name: 'cc',
	description: 'Creates a text channel',
	guildOnly: true,
	execute(message, args) {
		if (!args.length) {
			return message.channel.send(
				`You didn't provide any arguments, ${message.author}!`
			);
		}

		let channelName = args.shift();

		message.guild.channels
			.create(channelName, {
				reason: 'Needed a cool new channel',
				topic: args.join(' '),
			})
			// .then(console.log)
			.catch(console.error);
	},
};

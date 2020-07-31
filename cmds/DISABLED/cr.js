module.exports = {
	name: 'cr',
	description:
		'This command removes the channel where the command is being executed',
	execute(message, args) {
		if (!args.length) {
			return message.channel
				.send(`You didn't provide a reason, ${message.author}!`)
				.then((msg) => msg.delete({ timeout: 5000 }));
		}

		let reason = args.join(' ');

		message.channel.delete(reason).then(console.log).catch(console.error);
	},
};

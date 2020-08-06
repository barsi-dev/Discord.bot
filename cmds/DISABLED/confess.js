module.exports = {
	name: 'confess',
	description: 'Confess something to the bot anonymously | DM ONLY',
	dmOnly: true,
	execute(message, args) {
		let confession = args.join(' ');
		const channel = message.client.channels.cache
			.get('738043556903649320')
			.send(confession);
	},
};

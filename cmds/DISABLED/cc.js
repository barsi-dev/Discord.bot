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
		console.log(message.guild.channels.cache.find((c) => c.name === 'test4'));
		// let category = '736861967725363312';
		// category = message.guild.channels.cache.find(
		// (c) => c.name === 'Text Channels' && c.type === 'category'
		// );
		// if (!category) {
		// return message.channel.send('Could not find Text Channel category');
		// }

		// let channelName = args.shift();

		// message.guild.channels
		// .create(channelName, {
		// type: 'text',
		// reason: 'Needed a cool new channel',
		// topic: args.join(' '),
		// })
		// .then((channel) => {
		// channel.setParent(category.id);
		// console.log(channel);
		// })
		// .catch(console.error);
	},
};

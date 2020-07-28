module.exports = {
	name: 'roll',
	description: 'This command rolls a dice',
	execute(message, args) {
		message.reply(`You rolled a **${Math.round(Math.random() * 6)}**`);
	},
};

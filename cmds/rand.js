module.exports = {
	name: 'rand',
	description:
		'This command generates a random number given a range. If range is not given, a number is randomly generated from 0-100.',
	execute(message, args) {
		let range = 100;

		if (!args.length) {
			// console.log('>>');
			message.channel.send(
				`A random number has been generated, and it's a **${Math.round(
					Math.random() * range
				)}**`
			);
			// message.channel.send(`A random number has been generated, and it's a **25**`);
		} else {
			let newArgs = args[0].split('-').map((x) => parseInt(x));
			if (!newArgs[1]) {
				range = newArgs[0];
				message.channel.send(
					`A random number has been generated, and it's a **${Math.round(
						Math.random() * range
					)}**`
				);
				return;
			}
			if (newArgs[0] > newArgs[1]) {
				let temp = newArgs[0];
				newArgs[0] = newArgs[1];
				newArgs[1] = temp;
			}
			range = newArgs[1] - newArgs[0];
			message.channel.send(
				`A random number has been generated, and it's a **${
					Math.round(Math.random() * range) + newArgs[0]
				}**`
			);
		}
	},
};

const request = require('request');
const validUrl = require('valid-url');

let cooldown = new Set();

module.exports = {
	name: 'short',
	description: 'Generates a short URL to your longURL',
	usage: '/short <longURL> <slug>',
	execute(message, args) {
		if (!args[0] || args[0] === 'help') {
			message.delete({ timeout: 10000 }).catch((err) => console.error(err));
			return message.channel
				.send(`\`\`\`${this.usage}\`\`\``)
				.then((msg) => msg.delete({ timeout: 10000 }));
		}

		if (cooldown.has(message.author.id)) {
			message.delete({ timeout: 10000 }).catch((err) => console.error(err));
			return message.channel
				.send('```You have to wait 1 minute between short-url creation```')
				.then((msg) => msg.delete({ timeout: 10000 }));
		}

		if (!validUrl.isUri(args[0])) {
			message.delete({ timeout: 10000 }).catch((err) => console.error(err));
			return message.channel
				.send('```Not a valid URL```')
				.then((msg) => msg.delete({ timeout: 10000 }));
		}

		let options = {
			method: 'POST',
			url: 'https://url.barsi.me/api/url/shorten',
			headers: { 'Content-Type': 'application/json' },
			body: { longUrl: args[0], slug: args[1] },
			json: true,
		};

		request(options, function (error, response, body) {
			if (error) throw new Error(error);

			// If slug exists, body.res is populated
			if (body.res) {
				message.delete({ timeout: 10000 }).catch((err) => console.error(err));
				return message.channel
					.send(`\`\`\`${body.res}\`\`\``)
					.then((msg) => msg.delete({ timeout: 10000 }));
			}

			// (429) Rate Limiting -- Too many request
			if (response.statusCode === 429) {
				message.delete({ timeout: 10000 }).catch((err) => console.error(err));
				return message.channel
					.send(
						'```You tried to create too many links.\nTry again in a few mins```'
					)
					.then((msg) => msg.delete({ timeout: 10000 }));
			}

			message.delete({ timeout: 10000 }).catch((err) => console.error(err));
			message.channel
				.send(`\`\`\`${body.shortUrl}\`\`\``)
				.then((msg) => msg.delete({ timeout: 10000 }));

			cooldown.add(message.author.id);

			setTimeout(() => {
				cooldown.delete(message.author.id);
			}, 60 * 1000); //seconds * milliseconds
		});
	},
};

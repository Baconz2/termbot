const Discord = require("discord.js"); // imports the discord.js library
const fs = require("fs"); // imports the filesystem library
const spawnSync = require("child_process").spawnSync;
require("dotenv").config(); // load and configure .env file

const client = new Discord.Client(); // makes new client

client.once("ready", () => {
	console.log("supposedly running?");
});

client.on("message", async (message) => {
	if (message.content.startsWith(".term ")) {
		const args = message.content.split(" ").slice(1);
		try {
			const comm = spawnSync(args[0], args.slice(1));
			const evaled = `stderr: ${comm.stderr.toString()}\nstdout"${comm.stdout.toString()}`
			const cleaned = clean(evaled);
			const sendString = `\`\`\`bash\n${cleaned}\n\`\`\``;
			if (sendString.length >= 2000) {
				return {
					text: "The resulting output was too large, so here it is as a text file:",
					file: cleaned,
					name: "output.txt"
				};
			} else {
				return sendString;
			}
		} catch (err) {
			return `\`ERROR\` \`\`\`xl\n$s{clean(err)}\n\`\`\``;
		}
	}
});

// functions from esmbot to do things
function optionalReplace(token) {
	return token === "" ? "" : "<redacted>";
};

// clean(text) to clean message of any private info or mentions
// modified to assume text is always a string
function clean(text) {
	return text
		.replace(/`/g, `\`${String.fromCharCode(8203)}`)
		.replace(/@/g, `@${String.fromCharCode(8203)}`)
		.replace(/</g, `<${String.fromCharCode(8203)}`)
		.replace(process.env.TOKEN, optionalReplace(process.env.TOKEN))
		// .replace(process.env.MASHAPE, optionalReplace(process.env.MASHAPE))
		// .replace(process.env.CAT, optionalReplace(process.env.CAT))
		// .replace(process.env.GOOGLE, optionalReplace(process.env.GOOGLE))
		// .replace(process.env.DBL, optionalReplace(process.env.DBL))
		// .replace(process.env.MONGO, optionalReplace(process.env.MONGO))
		// .replace(process.env.TWITTER_KEY, optionalReplace(process.env.TWITTER_KEY))
		// .replace(process.env.CONSUMER_SECRET, optionalReplace(process.env.CONSUMER_SECRET))
		// .replace(process.env.ACCESS_TOKEN, optionalReplace(process.env.ACCESS_TOKEN))
		// .replace(process.env.ACCESS_SECRET, optionalReplace(process.env.ACCESS_SECRET));
		
		// these last ones are commented out because this bot doesnt have them in the .env
};

client.login(process.env.TOKEN); // starts bot with token from .env

const Discord = require("discord.js"); // imports the discord.js library
const fs = require("fs"); // imports the filesystem library
const {spawnSync} = require( 'child_process' );

const client = new Discord.Client(); // makes new client
const token = fs.readFileSync("token.txt").toString(); // reads token from file token.txt

client.once("ready", () => {
	console.log("supposedly running?");
});

client.on("message", async (message) => {
	if (message.content.startsWith(".term ")) {
		const args = message.content.split(" ").slice(1);
		try {
			const comm = spawnSync(args[0], args.slice(1));
			const evaled = `stderr: ${comm.stderr.toString()}\nstdout"${comm.stdout.toString()}`
			const cleaned = await clean(evaled);
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
			return `\`ERROR\` \`\`\`xl\n$s{await clean(err)}\n\`\`\``;
		}
	}
});

client.login(token); // starts bot with specified token

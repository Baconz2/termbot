import { Client } from "discord.js"
import { writeFile, unlink } from "fs/promises"
import { exec } from "child_process"
import dotenv from "dotenv"

dotenv.config(); // load and configure .env file
const client = new Client(); // makes new client
const messageStart = `${process.env.PREFIX}`;

client.once("ready", () => {
	console.log("bot running");
});

client.on("message", async (message) => {
	if (message.content.startsWith(messageStart)) {
		const command = message.content.slice(messageStart.length);
		console.log("running command", command);
		exec(command, async (_, stdout, stderr) => {
			const formatted = `stderr:\n${stderr}\nstdout:\n${stdout}`
			const cleaned = clean(formatted);
			const sendString = `\`\`\`bash\n${cleaned}\n\`\`\``;
			if (sendString.length > 2000) {
				await writeFile(`${process.cwd()}/output.txt`, cleaned);
				await message.channel.send("The resulting output was too large, so here it is as a text file:", {
					files: [{
						attachment: `${process.cwd()}/output.txt`,
						name: "output.txt"
					}]
				});
				await unlink(`${process.cwd()}/output.txt`);
			} else {
				await message.channel.send(sendString);
			}
		});
	}
});

// functions from esmbot to do things
function optionalReplace(token) {
	return token === "" ? "" : "<redacted>";
};

// clean(text) to clean message of any private info or mentions
// modified to assume text is always a string
function clean(text) {
  if (typeof text !== "string")
    text = util.inspect(text, { depth: 1 });
	return text
		.replace(/`/g, `\`${String.fromCharCode(8203)}`)
		.replace(/@/g, `@${String.fromCharCode(8203)}`)
		.replace(/</g, `<${String.fromCharCode(8203)}`)
		.replace(process.env.TOKEN, optionalReplace(process.env.TOKEN))
};

client.login(process.env.TOKEN); // starts bot with token from .env

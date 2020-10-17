const { clean } = require("../utils/misc.js");

exports.run = async (message, args) => {
  const code = args.join(" ");
  try {
	const { spawnSync } = require( 'child_process' );
	const comm = spawnSync( args[0], args.slice(1) );
	const evaled = `stderr: ${comm.stderr.toString()}\nstdout: ${comm.stdout.toString()}`
    const cleaned = await clean(evaled);
    const sendString = `\`\`\`bash\n${cleaned}\n\`\`\``;
    if (sendString.length >= 2000) {
      return {
        text: "The result was too large, so here it is as a file:",
        file: cleaned,
        name: "result.txt"
      };
    } else {
      return sendString;
    }
  } catch (err) {
    return `\`ERROR\` \`\`\`xl\n${await clean(err)}\n\`\`\``;
  }
};

exports.aliases = ["term"];
exports.category = 8;
exports.help = "Executes Bash commands";
exports.params = "[code]";

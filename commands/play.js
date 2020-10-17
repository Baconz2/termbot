const soundPlayer = require("../utils/soundplayer.js");
const urlRegex = /(?:\w+:)?\/\/(\S+)/;
const searchRegex = /^(sc|yt)search:/;

exports.run = async (message, args) => {
  if (!args[0]) return `${message.author.mention}, you need to provide what you want to play!`;
  const query = args.join(" ").trim();
  const search = urlRegex.test(query) ? query : (searchRegex.test(query) ? query : `ytsearch:${query}`);
  await soundPlayer.play(encodeURIComponent(search), message, true);
};

exports.aliases = ["p"];
exports.category = 7;
exports.help = "Plays a song or adds it to the queue";
exports.requires = "sound";
exports.params = "[url]";
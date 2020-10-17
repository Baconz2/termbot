const magick = require("../utils/image.js");
const { promisify } = require("util");
  
exports.run = async (message) => {
  message.channel.sendTyping();
  const image = await require("../utils/imagedetect.js")(message);
  if (image === undefined) return `${message.author.mention}, you need to provide a GIF to slow down!`;
  if (image.type !== "gif") return `${message.author.mention}, that isn't a GIF!`;
  const buffer = await magick.run({
    cmd: "speed",
    path: image.path,
    slow: true,
    type: image.type.toUpperCase(),
    delay: image.delay ? (100 / image.delay.split("/")[0]) * image.delay.split("/")[1] : 0
  });
  return {
    file: buffer,
    name: "slow.gif"
  };
};
  
exports.aliases = ["slowdown", "slower", "gifspeed2"];
exports.category = 5;
exports.help = "Makes a GIF slower";
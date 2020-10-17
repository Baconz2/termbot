const magick = require("../utils/image.js");

exports.run = async (message) => {
  message.channel.sendTyping();
  const image = await require("../utils/imagedetect.js")(message);
  if (image === undefined) return `${message.author.mention}, you need to provide a GIF to freeze!`;
  if (image.type !== "gif") return `${message.author.mention}, that isn't a GIF!`;
  const buffer = await magick.run({
    cmd: "freeze",
    path: image.path,
    loop: false,
    type: image.type.toUpperCase(),
    delay: image.delay ? (100 / image.delay.split("/")[0]) * image.delay.split("/")[1] : 0
  });
  return {
    file: buffer,
    name: `freeze.${image.type}`
  };
};

exports.aliases = ["noloop", "once"];
exports.category = 5;
exports.help = "Makes a GIF only play once";
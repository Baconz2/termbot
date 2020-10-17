const magick = require("../utils/image.js");

exports.run = async (message, args) => {
  const image = await require("../utils/imagedetect.js")(message);
  if (image === undefined) return `${message.author.mention}, you need to provide an image/GIF to make a motivational poster!`;
  const newArgs = args.filter(item => !item.includes(image.url) );
  if (args.length === 0) return `${message.author.mention}, you need to provide some text to make a motivational poster!`;
  const processMessage = await message.channel.createMessage("<a:processing:479351417102925854> Processing... This might take a while");
  const [topText, bottomText] = newArgs.join(" ").split(/(?<!\\),/).map(elem => elem.trim());
  const buffer = await magick.run({
    cmd: "motivate",
    path: image.path,
    top: topText.replace(/&/g, "\\&amp;").replace(/>/g, "\\&gt;").replace(/</g, "\\&lt;").replace(/"/g, "\\&quot;").replace(/'/g, "\\&apos;"),
    bottom: bottomText ? bottomText.replace(/&/g, "\\&amp;").replace(/>/g, "\\&gt;").replace(/</g, "\\&lt;").replace(/"/g, "\\&quot;").replace(/'/g, "\\&apos;") : "",
    type: image.type.toUpperCase(),
    delay: image.delay ? (100 / image.delay.split("/")[0]) * image.delay.split("/")[1] : 0
  });
  if (processMessage.channel.messages.get(processMessage.id)) await processMessage.delete();
  return {
    file: buffer,
    name: `motivate.${image.type}`
  };
};

exports.aliases = ["motivational", "motiv", "demotiv", "demotivational", "poster", "motivation"];
exports.category = 5;
exports.help = "Creates a motivational poster";

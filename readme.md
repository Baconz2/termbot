### idk really

this bot, based off esmBot (because i can't code lmao) is a great way to get a wicked digital wedgie

the command (terminal, located at commands/terminal.js), will allow *anything* to run
### yes, even sudo 
(although it does ask for your pass in the terminal)
<img src="https://media.discordapp.net/attachments/734119604007206953/766902082623635518/unknown.png">
so make sure you haven't recently run any sudo commands, otherwise *you could be able to run rm on the entire drive*


## Usage


The bot is only supported on Linux/Unix-like operating systems. If you want to run it locally for testing purposes, you should install ImageMagick (version >=7), FFmpeg, MongoDB, and the Microsoft core fonts:


On most Debian/Ubuntu-based distros you will need to build ImageMagick from source instead of installing from apt/similar package managers.
Instructions to do so can be found here: https://imagemagick.org/script/install-source.php
```shell
sudo apt-get install imagemagick ffmpeg mongodb ttf-mscorefonts-installer
```
# notice: i'm not too sure what's exactly required for *only* the terminal command, but experiment around and let me know
After that, you should install the rest of the dependencies using npm:

```shell
npm install
```

And set up Lavalink: https://github.com/Frederikam/Lavalink#server-configuration

Finally, fill in the info inside `.env.example`, rename it to `.env`, and run `app.js`.

If you need any help with setting up the bot locally, feel free to ask in the #self-hosting channel on the [esmBot Support server](https://discord.gg/vfFM7YT).

## Credits
Icon by [Stellio](https://twitter.com/SteelStellio).
All images, sounds, and fonts are copyright of their respective owners.

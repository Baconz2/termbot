### Terminal Bot

this bot allows you to do things no person should be able to do. run terminal commands directly on your host.

i strongly reccomend running this in a vm for your own saftey. i have also not tested this on windows, but i doubt it'd work.
does stdout/stderr even exist on windows?

anyway, install dependencies with `npm install`, and run the bot with `node index.js`

running commands with sudo prompts your password in the terminal you launched the bot from, unless you ran any sudo commands within the last ~5 minutes.
this is kind of a problem if you're gonna run the bot on your host (which you shouldn't do anyway)

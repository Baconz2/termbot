### Terminal Bot

this discord bot allows you to do things no person should be able to do. run terminal commands directly on your host.

i strongly reccomend running this in a vm for your own saftey.

# how do i install this retched thing

install dependencies with `npm install`

add `TOKEN={your token}` and `PREFIX={your prefix}` to `.env`, changing as needed

and run the bot with `node index.js`

# notice
running commands with sudo prompts your password in the terminal you launched the bot from, unless you ran any sudo commands in that terminal within the last ~5 minutes.
this is kind of a problem if you're gonna run the bot on your host (which you shouldn't do anyway). 

raspbian is dumb with sudo and allows the pi user to always run sudo by default, so watch out for that.

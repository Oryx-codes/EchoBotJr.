const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./storage/config.json");
const ms = require("ms");

//Bot Transitions
const beta = false;
const status = true;
const console_mode = false;
const logging = false;

client.on("ready", async () => {
  if (!beta) {
    console.log(
      `Bot has started, with ${client.users.size} users, in ${
        client.channels.size
      } channels of ${client.guilds.size} guilds.`
    );
  } else {
    console.log(
      `Bot started in Beta Mode: ${client.guilds.size} Guilds, ${
        client.channels.size
      } Channels and with ${client.users.size} Users!`
    );
  }

  if (!beta) {
    client.user.setActivity("https://echo-studios.co.uk", { type: "PLAYING" });
    client.user.setStatus("online");
  } else {
    client.user.setActivity("Beta Mode");
    client.user.setStatus("idle");
  }
});

client.on("guildMemberAdd", member => {
  const channel = member.guild.channels.find(ch => ch.name === "welcome");
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});

client.on("message", async message => {
  let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));

  if (message.guild === null) {
      return;
  } else if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: config.prefix
    };
  }

  const prefix = prefixes[message.guild.id].prefixes;

  const language = "eng";

  if (!message.guild || message.author.bot) return;

  let msg = message.content.toUpperCase();
  let args;
  let cmd;
  if (!console_mode) {
    args = message.content.slice(prefix.length).trim().split(" ");
    cmd = args.shift().toLowerCase();
  }
  let msgContent = message.content.toLowerCase().trim().split(" ");
  if(console_mode) {
      cmd = msg.shift()
      args = msgContent.slice(cmd)
  }
  if(msgContent.includes('prefix')) {message.channel.send(`My prefix on this Server is **${prefix}**`)}

  let mprefix = msg.slice(0, prefix.length)
  let uprefix = prefix.toUpperCase()

  if(!console_mode){
      if(mprefix !== uprefix) return;
  }

  if(logging){
      message.channel.send(`args: "${args}", cmd: "${cmd}", msg: "${msg}", mprefix: "${mprefix}", prefix: "${uprefix}", Console Mode: ${console_mode}, triggered: ${mprefix == uprefix}`)
  }

  if(message.author.bot) return;

  try{
      let commandFile = require(`./commands/${cmd}.js`);
      commandFile.run(client, message, args, prefix, language, beta)
  } catch (err) {
      console.log(err)
  };
});

client.on('error', console.error);

if(!beta){
    client.login(config.token.main)
} else {
    client.login(config.token.beta)
}
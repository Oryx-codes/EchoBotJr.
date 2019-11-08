const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const config = require("/storage/config.json");
const ms = require("ms");

//Bot Transitions
const beta = false;
const status = true;
const console_mode = false;

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
    if (message.author.id !== "5") {
      let dmauthor = message.author;
      let dmmessage = message.content;
      let dmembed = new Discord.RichEmbed()
        .setDescription("Incoming DM Support Request")
        .setColor("#00ffff")
        .addField("Author", message.author.username)
        .addField("Author ID", message.author.id)
        .addField("SUpport Message", dmmessage);
      client.channels.find(ch => ch.name === "dm-support").send(dmembed);
      dmauthor.send("Your Message has been Sent!");
    }
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
    args = message.content
      .slice(prefix.length)
      .trim()
      .split(" ");
  }
});

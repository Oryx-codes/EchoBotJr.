const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (args == 0)return message.reply("You forgot who you want to unmute!")
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have the required Permissions!");
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let muterole = message.guild.roles.find(`name`, "muted");

    let member = message.mentions.members.first();

    member.removeRole(muterole).catch(console.error);
    message.channel.send(`The Member ${member} got unmuted!`)
    }

module.exports.help = {
  name: "unmute"
}
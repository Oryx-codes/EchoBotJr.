const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (args == 0)return message.reply("You forgot who you want to mute!")
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have the required Permissions!");
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be muted!");

  let muterole = message.guild.roles.find(`name`, "muted");
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions: []
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        })
      })
    }catch(e){
      console.log(e.stack);
    }}

let member = message.mentions.members.first();

member.addRole(muterole).catch(console.error);
message.channel.send(`The Member ${member} got muted!`)

}

module.exports.help = {
  name: "mute"
}
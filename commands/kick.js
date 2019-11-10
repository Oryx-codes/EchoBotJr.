const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    message.delete().catch(O_o=>{});
    if(!message.member.hasPermission("2")) return message.channel.send("You need to be able to kick members for this!").then(msg => {msg.delete(3000)});
    let removeuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!removeuser) return message.channel.send("You did not Specify a User.").then(msg => {msg.delete(3000)});
    let removereason = args.join(" ").slice(22);
    if(removeuser.hasPermission("KICK_MEMBERS")) return message.channel.send("This Member has too many Powers").then(msg => {msg.delete(3000)});
    let kickEmbed = new Discord.RichEmbed()
    .setDescription("=Kick=")
    .setColor("#c18413")
    .addField("Kicked User", removeuser)
    .addField("Kicked By", `<@${message.author.id}>`)
    .addField("Kicked In", message.channel)
    .addField("Reason", removereason);

    let removeChannel = message.guild.channels.find(`name`, "logs");
    if(!removeChannel) return message.channel.send("Can't Find Logs Channel!")

    message.guild.member(removeuser).kick(removereason);
    removeChannel.send(kickEmbed);

}

module.exports.help = {
    name: "kick"
}
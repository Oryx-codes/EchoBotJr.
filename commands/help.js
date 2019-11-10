const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let dmauth = message.author;

    let hembed = new Discord.RichEmbed()
    .setDescription("=𝕳𝖊𝖑𝖕=")
    .setColor("#7a1616")
    .addField("Moderation Commands", "addrole\n ban\n clear\n kick\n mute\n removerole\n unmute\n warn")
    .addField("Info", "Ping");

    message.delete().catch(O_o=>{});
    dmauth.send(hembed)
    message.channel.send("Check your DM's!").then(msg => {msg.delete(3000)});
}

module.exports.help = {
    name: "help"
}
const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    message.delete().catch(O_o=>{});
    let bicon = client.user.displayAvatarURL;
    let community = require("../storage/community.json")
    let botEmbed = new Discord.RichEmbed()

    .setDescription("Echo Studios Community Links")
    .setAuthor("EchoJr: Created by Vixel")
    .setColor("#003182")
    .addField("Youtube Channel", community.links.youtube)
    .addField("Discord Server", community.links.discord)
    .addField("Official Instagram", community.links.insta)
    .addField("Patreon Page", community.links.patreon)
    .addField("Twitter Page", community.links.twitter)
    .addField("Website", community.links.website)
    .setThumbnail(bicon);

    return message.channel.send(botEmbed).then(msg => msg.delete(10000));
}

module.exports.help = {
    name: "community"
}
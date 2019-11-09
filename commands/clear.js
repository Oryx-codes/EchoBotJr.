const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("8912")) return message.reply("You do not have the Permissions Required to run this Command.");
    if(!args[0]) return message.channel.send("We need a number to remove 1-100");
    if(args[0] > 100){
        return message.reply("That Number is too Big, Please Select a Number 1-100");
    }
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(2000));
    });

}

module.exports.help = {
    name: "clear"
}
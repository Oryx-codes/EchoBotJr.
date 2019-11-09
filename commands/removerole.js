const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
        //!removerole @Vixel Command
    message.delete().catch(O_o=>{});
    let mainguild = message.guild.name
    if(!message.member.hasPermission("268435456")) return message.reply("You do not have the required Permissions.");
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("I could not find that User.")
    let role = args.join(" ").slice(22);
    if(!role) return message.reply("Make sure to Specify a Role.")
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.reply("Couldn't find that role.");

    if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that Role.");
    await(rMember.removeRole(gRole.id))

    try{
        rMember.send(`RIP, you lost ${gRole.name} in ${mainguild}.`)
    } catch(err) {
        message.channel.send(`RIP to <@${rMember.id}>, We removed ${gRole.name} from them. We tried to DM them, but their DMs are locked.`)
    }
}

module.exports.help = {
    name: "removerole"
}
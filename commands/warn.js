const Discord = require("discord.js")
const fs = require("fs")
const ms = require("ms")
let warns = JSON.parse(fs.readFileSync("././data/warnings.json", "utf8"));

module.exports.run = async (client, message, args) => {

    let dmauthW = message.author;
    let godset = message.guild.id;

    if(!message.member.hasPermission("MANAGE_ROLES")) return dmauthW.send("You do not have the required Permissions!");
    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    if(!wUser) return message.reply("I could not find a user with that name, or you did not specify one.")
    if(wUser.hasPermission("MANAGE_ROLES")) return message.reply("This person can not be warned at your permission level.");
    let reason = args.join(" ").slice(22)
    if(!reason) return message.reply("You did not specify a reason.")

    if(!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    }

    warns[wUser.id].warns++;

    fs.writeFile("././data/warnings.json", JSON.stringify(warns), (err) => {
        if(err) console.log(err)
    });

    let warnEmbed = new Discord.RichEmbed()
    .setDescription("Warn")
    .setAuthor(message.author.username)
    .setColor("#fc6400")
    .addField("Warned User", `<@${wUser.id}>`)
    .addField("Warned In", message.channel)
    .addField("Number of Warnings", warns[wUser.id].warns)
    .addField("Reason", reason);

    let warnchannel = message.guild.channels.find(`name`, "logs");
    if(!warnchannel) return message.reply("Could not find a Channel Named 'logs' Please Create One");

    warnchannel.send(warnEmbed);

    if(warns[wUser.id].warns === 3){
        let muterole = message.guild.roles.find(`name`, "muted")
        if(!muterole) {
            try{
        muterole = await message.guild.createRole({
          name: "muted",
          mentionable: true,
          color: "#595959",
          permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
            } catch(err) {
            console.log(err);
            }
        }

        let mutetime = "5m";

        await(wUser.addRole(muterole.id)).then(wUser.send(`You have been muted in ${message.guild.name} for 3 Warnings.`))

        setTimeout(function(){
            wUser.removeRole(muterole.id)
            wUser.send(`You have been unmuted in ${message.guild.name}.`)
        }, ms(mutetime))
    }

    if(warns[wUser.id].warns === 7) {
        wUser.kick()
        let kickchannel = message.guild.channels.find(`name`, "logs");
        kickchannel.send(`<@${wUser.id}> Has been Kicked for 7 Warnings.`)
    }

    if(warns[wUser.id].warns === 12) {
        wUser.ban()
        let kickchannel = message.guild.channels.find(`name`, "logs");
        kickchannel.send(`<@${wUser.id}> Has been Banned for 12 Warnings.`)
    }

}

module.exports.help = {
    name: "warn"
}
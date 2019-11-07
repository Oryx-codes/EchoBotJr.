const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client();
const config = require("./storage/config.json");
const ms = require('ms')

//Bot Transitions
const beta = false
const status = true


client.on('ready', async() =>{
  if (!beta){
console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)
  } else {
console.log(`Bot started in Beta Mode: ${client.guilds.size} Guilds, ${client.channels.size} Channels and with ${client.users.size} Users!`)
  }

  if (!beta) {
    client.user.setActivity('https://echo-studios.co.uk', { type: 'PLAYING' },);
    client.user.setStatus('online')
  } else {
    client.user.setActivity('Beta Mode');
    client.user.setStatus('idle')
  }

});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});

client.on('message', async message => {

  let prefixes = JSON.parse(fs.readFileSync

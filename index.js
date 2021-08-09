const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});

const Discord = require('discord.js')
///npm i discord.js@12.5.3
const client = new Discord.Client()
const Database = require('st.db')
const db = new Database('Lines')
const prefix = process.env.prefix
client.on("ready", () => {
  console.log(`[ - Bot is Online - ]`);
  console.log(`Name Bot : ${client.user.username}`);
  console.log(`Guilds : ${client.guilds.cache.size}`);
  console.log(`Users : ${client.users.cache.size}`);
  console.log(`Channels : ${client.channels.cache.size}`);
  client.user.setActivity(`${prefix}help`, {
    type: "PLAYING"
  });
});
client.on("message", message =>{
if(message.content.startsWith(prefix + "set-line")){
const args = message.content.split(" ").slice(1).join(" ")
if(!args) return message.channel.send("**Please Type Line Link**")
db.set("line", args)
const embed = new Discord.MessageEmbed()
.setTitle("✅ | Done Change Line")
.setColor("GREEN")
message.channel.send(embed)
}
})

client.on("message", message =>{
if(message.content.startsWith(prefix + "set-channel")){
const ch = message.mentions.channels.first()
if(!ch) return message.channel.send("**Ex :"+prefix+"set-channel #channel **")

db.set("ch", ch.id)
const embed = new Discord.MessageEmbed()
.setTitle("✅ | Done Change Channel")
.setColor("GREEN")
.setDescription(`Line Channel : ${ch}`)
message.channel.send(embed)
}
})

client.on("message", message =>{
if(message.content === prefix + "rest"){
  
db.delete("line")
db.delete("chs")
const embed = new Discord.MessageEmbed()
.setTitle("✅ | Done Rest All Database")
.setColor("GREEN")
message.channel.send(embed)
}
})

client.on('message', function(message) {
const line = db.fetch('line')
const ch = db.fetch("ch")
let args = message.content.split(" ").slice('').join(" ");
if(message.author.bot)return;
const lch = message.channel.id === ch
if (!lch) return false;
if(message.content.startsWith('')){
message.channel.send({files:[line]})
}
});

client.on('message', function(message) {
    if(message.content.startsWith(prefix + "line")) {
      if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR"))
      return message.reply("**You Don't Have ` ADMINISTRATOR ` Permission**");
   message.channel.send({files:[db.fetch('line')]})
    message.delete()
}
});

client.on("message", message =>{
if(message.content === prefix + "help"){
const embed = new Discord.MessageEmbed()
.setAuthor("Commands :", client.user.avatarURL())
.setThumbnail(message.author.avatarURL())
.setColor("BLUE")
.addField(`${prefix}set-line`, "To Change Line Image")
.addField(`${prefix}set-channel`, "To Change Line Channel")
.addField(`${prefix}line`, "To Send Line")
.setFooter("© !ZombieX#0001")
message.channel.send(embed)
}
})
client.login(process.env.token) 

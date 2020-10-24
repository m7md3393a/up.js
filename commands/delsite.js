const Discord = require("discord.js")
const db = require("quick.db")
const fs = require('fs')
const yaml = require("js-yaml");
const { re } = require("mathjs");// made byy darkboy
const { mainprefix , token } = yaml.load(fs.readFileSync("./config.yml"));

module.exports = {
    name: "delete",
    description: "delsite",
    run: async (client, message, args) => {
        let prefix = await db.get(`prefix_${message.guild.id}`);
        if(prefix === null) prefix = mainprefix;
      
        let projectname = args[0]
        if (!projectname) return message.reply(`:rolling_eyes: **EXMAPLE**\n${prefix}delsite {GlitchProjectLink} `);
        let database = db.get(`projects_${message.author.id}`)
        if(database) {
            let data = database.find(x => x.project === projectname)
            if(!data) return message.reply(":rolling_eyes: unable to find this link on database")
            let value = database.indexOf(data)
            delete database[value]
            var filter = database.filter(x => {
                return x !== null && x !== ''
            })
            db.set(`projects_${message.author.id}`, filter)
            return message.reply(`Deleted the **${projectname}** project from our uptimer\n:white_check_mark:`)
        } else {
            return message.reply(":rolling_eyes: unable to find command!")

        }
    }
}
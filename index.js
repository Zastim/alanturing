const Discord = require('discord.js');
const {prefix, token} = require('./config.json');
const {isAsync} = require('./lib/utils');

const gif = 'https://media.discordapp.net/attachments/473148192259571712/693663842806398986/3x_9.gif';
const gif2 = 'https://tenor.com/view/skeleton-dancing-skeletondancing-gif-5094083';

const bot = new Discord.Client();

const turingCommands = require('./plugins/turing');
const turingGames = require('./plugins/minigames');

const commands = {...turingCommands, ...turingGames};

const ac_type = 'PLAYING';
const ac_name = '/roleta 2.0';

var ocupied;

bot.on('ready', () => {
    bot.user.setPresence({
        activity: {
            name: ac_name,
            type: ac_type,
        },

        status: 'online',
    }).then(() => {
        console.log(`O Pai tá on.`);
        ocupied = false;
    });
});

bot.on('message', async message => {
    if((message.content == gif || message.content == gif2) && !message.author.bot) message.channel.send(gif);
    else if (message.content.startsWith(prefix) && !message.author.bot && !ocupied) {
        const args = message.content.slice(prefix.length).split(' ');
        const command = args.shift().toLowerCase();

        ocupied = true;

        if (!(command in commands)) {
            ocupied = false;
            return await message.channel.send('Que isso');
        }

        if(command in commands) {
            if (isAsync(commands[command])) {
                await commands[command](message, args);
            } 
            else {
                commands[command](message, args);
            }
        }

        ocupied = false;
 
    }
    else if (message.author.id === '716828755003310091') {
        if(message.content.startsWith('Que porra de música é essa que tá tocando caraio!: **')) {
            const song = cutstr(message.content, 'Que porra de música é essa que tá tocando caraio!: **', '**');

            bot.user.setPresence({
                activity: {
                    name: song,
                    type: 'LISTENING',
                },
    
                status: 'online',
            });
        }
        else if(message.content.startsWith('Sai Minerva filha da puta.')) {
            bot.user.setPresence({
                activity: {
                    name: ac_name,
                    type: ac_type,
                },
    
                status: 'online',
            });
        }

    }
});

bot.on('messageDelete', async message => {
    if (message.author.id === '716828755003310091' && message.content.startsWith('Que porra de música é essa que tá tocando caraio!: **')) {
        bot.user.setPresence({
        activity: {
            name: ac_name,
            type: ac_type,
        },

        status: 'online',
        });
    }
});

bot.login(token);


function cutstr(str, before, after) {
    str = str.substring(str.indexOf(before) + before.length);
    return str.substring(0, str.indexOf(after));
}

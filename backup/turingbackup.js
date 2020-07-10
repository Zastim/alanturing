const help = '```asciidoc\n= Imagens =\nks(1, 2, 3 ou 4), uri, logica, gusta e gustahd, nil, rbt, dance, f\n\n= Outros =\nconhecimento (int)\nuri (int ou "rnd")\n\n= Minigames =\nroleta\n[a roleta poderá te dar timeout até ser revivido por alguém]```';

var fs = require('fs');
var userData = JSON.parse(fs.readFileSync('storage/userData.json', 'utf8'));

module.exports = {
    'help': (message, args) => {
        message.channel.send('Ajuda o maluco');
        message.channel.send(help);
    },

    //------------------------- IMAGENS -------------------------//
    'gusta': (message, args) => {
        message.channel.send('https://cdn.discordapp.com/attachments/723176229502582866/723176306145230968/gusta.png');
    },

    'f': (message, args) => {
        var n = Math.floor((Math.random() * 8) + 1);
        switch(n) {
            case(1): {
                message.channel.send('https://cdn.discordapp.com/attachments/723176229502582866/724792562124062760/f.jpg');
                break;
            }
            case(2): {
                message.channel.send('https://cdn.discordapp.com/attachments/723176229502582866/724792566687596564/f2.png');
                break;
            }
            case(3): {
                message.channel.send('https://cdn.discordapp.com/attachments/723176229502582866/724792568235425812/f3.jpg');
                break;
            }
            case(4): {
                message.channel.send('https://cdn.discordapp.com/attachments/723176229502582866/724792570223525908/f4.jpg');
                break;
            }
            case(5): {
                message.channel.send('https://cdn.discordapp.com/attachments/723176229502582866/724792572467216445/f6.jpg');
                break;
            }
            case(6): {
                message.channel.send('https://cdn.discordapp.com/attachments/723176229502582866/724792573952000060/f7.png');
                break;
            }
            case(7): {
                message.channel.send('https://cdn.discordapp.com/attachments/723176229502582866/724792574769889280/f5.png');
                break;
            }
            case(8): {
                message.channel.send('https://cdn.discordapp.com/attachments/723176229502582866/724792585125625968/f8.jpg');
                break;
            }
        }
    },

    'gustahd': (message, args) => {
        message.channel.send('https://cdn.discordapp.com/attachments/723176229502582866/723176327225802792/gustahd.png');
    },

    'ks1': (message, args) => {
        message.channel.send('https://cdn.discordapp.com/attachments/723176229502582866/723176358913507348/ks.png');
    },

    'ks2': (message, args) => {
        message.channel.send('https://cdn.discordapp.com/attachments/723176229502582866/723176372255588362/ks2.png');
    },

    'ks3': (message, args) => {
        message.channel.send('https://cdn.discordapp.com/attachments/723176229502582866/723176383320293472/ks3.png');
    },

    'ks4': (message, args) => {
        message.channel.send('https://cdn.discordapp.com/attachments/723176229502582866/724984254357962802/Screenshot_95.png');
    },

    'logica': (message, args) => {
        message.channel.send('https://cdn.discordapp.com/attachments/723176229502582866/723176345810632724/herc.png');
    },

    'nil': (message, args) => {
        message.channel.send('https://cdn.discordapp.com/attachments/723176229502582866/723176395987091606/nil2.png');
    },

    'uri': (message, args) => {
        if(!args[0]) {
            message.channel.send('https://cdn.discordapp.com/attachments/723176229502582866/723176407974281236/selo_uri.png');
            return;
        }
        else if(isNaN(args[0]) && args[0] != "rnd") {
            message.channel.send('Inputa direito vei');
            return;
        }
        if(args[0] == "rnd") args[0] = Math.floor((Math.random() * 3090) + 1001);
        var ex = parseInt(Number(args[0]));
        if(ex < 1001 || ex > 3090) {
            message.channel.send('De 1001 a 3090 campeao');
            return;
        }

        const https = require('https');

        https.get(`https://www.urionlinejudge.com.br/repository/UOJ_${ex}.html`, response => {
        let data = '';

        response.on('data', chunk => {
            data += chunk;
        });

        response.on('end', async () => {
            const exnum = replaceTags(cutstr(data, '<title>', '</title>'));
            data = cutstr(data, '<div class="problem">', '</body>');
        
            const ex = replaceTags(cutstr(data, '<div class="description">', '</div>'));
            const img = replaceTags(cutstr(data, '<img alt="" src="', '"'));
            const input = replaceTags(cutstr(data, '<div class="input">', '</div>'));
            const output = replaceTags(cutstr(data, '<div class="output">', '</div>'));
        
            const msgs = [''];
            let i = 0;
            ex.split('\n\n').forEach(m => {
                if ((msgs + m).length >= 2000) {
                    msgs[++i] = '';
                }
        
                msgs[i] += '\n\n' + m;
            });
        
            const files = img !== '' ? { files: [img] } : null;
            await message.channel.send(exnum).then(async () => {
                msgs.forEach(async (m, ii) => {
                    await message.channel.send(m, (ii === i) ? files : null);
                });
            
                await message.channel.send(`**Entrada:**\n${input}`).then(() => {
                    message.channel.send(`**Saída:**\n${output}`);
                });
            });
        });
        

        }).on("error", err => {
        console.log("Error: " + err.message);
        message.channel.send("Deu ruim aqui");
        });

    },
    'rbt': (message, args) => {
        message.channel.send('https://media.giphy.com/media/XIqCQx02E1U9W/giphy.gif');
    },
    'dance': (message, args) => {
        message.channel.send('https://media.discordapp.net/attachments/473148192259571712/693663842806398986/3x_9.gif');
    },
    //-----------------------------------------------------------//

    //------------------------ MINIGAMES ------------------------//
    'roleta': (message, args, bot) => {
        const morto = message.member.guild.roles.cache.find(role => role.name === "Morto");
        const vivo = message.member.guild.roles.cache.find(role => role.name === "Sobrevivente");
        
        message.channel.send(menciona(message.author) + ' gira a roleta...');
        
        var tiro = bang();
        if(tiro < 2) {
            message.channel.send('O gatilho é puxado...');
            message.channel.send('<:pistola:723538558601920613> <:boomm:723538542911029318>');
            message.channel.send(message.author.username + ' está morto no chat.');
            message.member.roles.add(morto);
            message.member.roles.remove(vivo);
        }
        else {
            message.channel.send('O gatilho é puxado...');
            message.channel.send('<:pistola:723538558601920613> <:bang:723540242656919634>');
            message.channel.send(message.author.username + ' sobrevive para contar a história.');
            message.member.roles.add(vivo);
            message.member.roles.remove(morto);
        }
        
    }, 

    /*'reviver': (message, args) => {
        const morto = message.member.guild.roles.cache.find(role => role.name === "Morto");
        message.channel.send('https://media.giphy.com/media/XIqCQx02E1U9W/giphy.gif');
    },*/

    //---------------------- CONHECIMENTOS ----------------------//
    'conhecimento': (message, args) => {

        if(isNaN(args[0])) {
            message.channel.send('Inputa direito vei');
            return;
        }

        var c = parseInt(Number(args[0]));

        if (c < 1) {
            message.channel.send('Conhecimentos começam em 1.');
            return;
        }
        else if(c > 10 && c != 25) {
            message.channel.send('No momento só tenho 10 conhecimentos para repassar.');
            return;
        }

        message.channel.send('Conhecimento ' + c);
        switch(c-1) {
            case 0: {
                message.channel.send('Ciência é uma equação diferencial. Religião é a condição de contorno.');
                break;
            }
            case 1: {
                message.channel.send('Eu acredito que às vezes são as pessoas que ninguém espera nada que fazem as coisas que ninguém consegue imaginar.');
                break;
            }
            case 2: {
                message.channel.send('As máquinas me surpreendem muito frequentemente.');
                break;
            }
            case 3: {
                message.channel.send('Nós só podemos ver um pouco do futuro, mas o suficiente para perceber que há muito a fazer.');
                break;
            }
            case 4: {
                message.channel.send('Eu não fico muito impressionado com argumentos teológicos, independentemente daquilo que eles estão sendo usado para apoiar. Esses argumentos frequentemente se revelaram insatisfatórios no passado.');
                break;
            }
            case 5: {
                message.channel.send('O corpo fornece alguma coisa para o espírito cuidar e usar.');
                break;
            }
            case 6: {
                message.channel.send('A idéia por trás de computadores digitais pode ser explicada dizendo que estas máquinas têm a intenção de realizar qualquer operação que pode ser realizada por uma equipe.');
                break;
            }
            case 7: {
                message.channel.send('Supostamente, o cérebro humano é algo parecido com um notebook que é adquirido em papelaria : mecanismo e milhares de pequenas folhas brancas.');
                break;
            }
            case 8: {
                message.channel.send('Raciocínio matemático pode ser considerado um tanto esquematicamente como o exercício de uma combinação de duas instalações , o que podemos chamar de intuição e criatividade.');
                break;
            }
            case 9: {
                message.channel.send('Um computador pode ser chamado de "inteligente" se ele pode enganar uma pessoa a pensar que é um ser humano.');
                break;
            }
            case 24: {
                message.channel.send('O Irineu é o churrasqueiro mais raro de Bauru. Ele pode ser encontrado no CTI durante eventos de pebolim');
                break;
            }
        }
    },
    //-----------------------------------------------------------//

}

function cutstr(str, before, after) {
    if (str == '') {
        return str;
    }

    if (str.indexOf(before) === -1 || str.indexOf(after) === -1) {
        return '';
    }

    str = str.substring(str.indexOf(before) + before.length);
    return str.substring(0, str.indexOf(after));
}

function replaceTags(str) {
    return str.replace(/<p( (class="center"|style="text-align: ?center;?"))?>/gm, '\n')
        .replace(/<p>/gm, '\n')
        .replace(/<\/p>/gm, '\n')
        .replace(/<strong>/gm, '**')
        .replace(/<\/strong>/gm, '**')
        .replace(/<em>/gm, '_')
        .replace(/<\/em>/gm, '_')
        .replace(/<sup>/gm, '^')
        .replace(/<\/sup>/gm, '')
        .replace(/<sub>/gm, '[')
        .replace(/<\/sub>/gm, ']')
        .replace(/<br \/>/gm, '\n')
        .replace(/&lt;/gm, '<')
        .replace(/&gt;/gm, '>')
        .replace(/&nbsp;/gm, ' ')
        .replace(/([\t]+|[ ]{2,})/gm, '')
        .replace(/[\n]{3,}/gm, '\n\n')
        .replace(/<img alt="" src="[^\n]+$\n?/gm, '')
        .trim();
}

function bang() {
    var shot = Math.floor((Math.random() * 6) + 1);
    return shot;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function menciona(autor) {
    return "<@" + autor.id + ">";
}
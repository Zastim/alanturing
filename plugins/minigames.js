var fs = require('fs');
var userData = JSON.parse(fs.readFileSync('storage/userData.json', 'utf8'));

module.exports = {
    //------------------------ ROLETA ------------------------//
    'roleta': (message, args, bot) => {
        const morto = message.member.guild.roles.cache.find(role => role.name === "Morto");
        const vivo = message.member.guild.roles.cache.find(role => role.name === "Sobrevivente");
        
        message.channel.send(menciona(message.author) + ' gira a roleta...');

        if(!userData[message.author.id]) userData[message.author.id] = {
            timesDied: 0, timesSurvived: 0, timesRolled: 0, timesRevived: 0
        }
        
        var tiro = bang();
        if(tiro < 2) {
            message.channel.send('O gatilho é puxado...');
            message.channel.send('<:pistola:723538558601920613> <:boomm:723538542911029318>');

            userData[message.author.id].timesDied++;

            if(userData[message.author.id].timesDied == 1) {
                message.channel.send(message.author.username + ' morre pela primeira vez!');
            }
            else {
                message.channel.send(message.author.username + ' está morto no chat pela **' + userData[message.author.id].timesDied + 'ª** vez!');
            }

            message.member.roles.add(morto);
            message.member.roles.remove(vivo);

        }
        else {
            message.channel.send('O gatilho é puxado...');
            message.channel.send('<:pistola:723538558601920613> <:bang:723540242656919634>');

            userData[message.author.id].timesSurvived++;
            if(userData[message.author.id].timesSurvived == 1) {
                message.channel.send(message.author.username + ' sobrevive à roleta pela primeira vez!');
            }
            else {
                message.channel.send(message.author.username + ' sobrevive pela **' + userData[message.author.id].timesSurvived + 'ª** vez!');
            }

            message.member.roles.add(vivo);
            message.member.roles.remove(morto);

        }

        userData[message.author.id].timesRolled++;

        fs.writeFileSync('storage/userData.json', JSON.stringify(userData));     
    },

    'rscore': (message, args, bot) => {
        let sender = message.author.id;

        if(!(sender in userData)) {
            message.channel.send("Nunca jogou na vida lek");
            return;
        }

        let mortes = userData[sender].timesDied;
        let vidas = userData[sender].timesSurvived;
        let roladas = userData[sender].timesRolled;
        let revividas = userData[sender].timesRevived;
        let taxa = (vidas/mortes).toFixed(1);
        message.channel.send(`Pontuação de ${menciona(message.author)} na roleta:\n\`\`\`asciidoc\nVezes que jogou:: ${roladas}\nVezes foi morto:: ${mortes}\nVezes que sobreviveu:: ${vidas}\nRazão de mortes:: 1 / ${taxa}\nVezes que Reviveu alguém:: ${revividas}\`\`\``);
    },

    'somatorio': (message, args) => {
        let tmortes = 0;
        let tvidas = 0;
        let troladas = 0;

        userData.forEach(somatorio)

        function somatorio(item) {
            tmortes += item.timesDied;
            tvidas += item.timesSurvived;
            troladas += item.timesRolled;
        }

        message.channel.send(```\´\´\´c\nTotal de vezes jogado: ${troladas}\nTotal de sobrevivências: ${tvidas}\nTotal de mortes: ${tmortes}\n```);
    },

    'reviver': (message, args) => {
        if(!(message.mentions.members.first())) {
            return message.reply("Mencione quem você quer reviver.");
        }

        const morto = message.member.guild.roles.cache.find(role => role.name === "Morto");
        const revivido = message.member.guild.roles.cache.find(role => role.name === "Revivido");

        let sender = message.author.id;

        if(!userData[sender].timesRevived) userData[sender] = {
            timesDied: userData[sender].timesDied, timesSurvived: userData[sender].timesSurvived, timesRolled: userData[sender].timesRolled, timesRevived: 0
        }

        let pessoa = message.mentions.members.first();
        if(!(pessoa.roles.cache.find(role => role.name === "Morto"))) {
            return message.reply('Você não pode trazer a vida de volta aos vivos.');
        }

        if(message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send(`Com o poder concedido a ele pelos deuses da Computaria, ${menciona(message.author)} traz ${pessoa} de volta aos vivos do chat.`);
            pessoa.roles.remove(morto);
            pessoa.roles.add(revivido);
            userData[sender].timesRevived++;
        }
        else {
            message.channel.send(`${menciona(message.author)} suplica aos deuses da Computaria para que ${pessoa} possa usar o chat denovo...`);
            let suplica = Math.floor((Math.random() * 10) + 1);
            console.log(suplica);
                        
            if(suplica < 5) {
                message.channel.send("E o pedido é aceito!\n" + pessoa + " está de volta aos vivos.");
                pessoa.roles.remove(morto);
                pessoa.roles.add(revivido);
                userData[sender].timesRevived++;
            } 
            else if(suplica < 7) {
                message.channel.send("O pedido é aceito com uma condição: **A vida do orador é levada como pagamento**.");
                pessoa.roles.remove(morto);
                pessoa.roles.add(revivido);
                message.author.roles.add(morto);
                userData[sender].timesRevived++;
            }
            else if(suplica < 9) {
                message.channel.send("Mas o pedido é recusado.");
            }
            else {
                message.channel.send("A ousadia de " + menciona(message.author) + " foi tão grande que irritou os deuses.\nUm relâmpago cai do céu e leva sua vida também.");
                message.author.roles.add(morto);
                userData[sender].timesDied++;
            }
        }
        
    },
    
}

function bang() {
    var shot = Math.floor((Math.random() * 6) + 1);
    return shot;
}

function menciona(autor) {
    return "<@" + autor.id + ">";
}
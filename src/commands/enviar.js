const { EmbedBuilder, PermissionsBitField, PermissionFlagsBits, Discord, Embed, IntegrationExpireBehavior } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("enviar")
    .setDescription("Enviar uma mensagem ou um embed pra um canal especifico.")
    .addChannelOption((canal) => canal.setName('canal').setDescription('Selecione o canal.').setRequired(true))
    .addStringOption((embed) => embed.setName('embed'). setDescription('Falarei por meio de embed.').setRequired(false))
    .addStringOption((normal) => normal.setName('normal'). setDescription('Falarei por meio de mensagem normal').setRequired(false))
    .addStringOption((titulo) => titulo.setName('titulo'). setDescription('Titulo do embed').setRequired(false))
    .addUserOption((autor) => autor.setName('autor'). setDescription('Autor do embed').setRequired(false))
    .addStringOption((imagem) => imagem.setName('imagem'). setDescription('Link da imagem do embed').setRequired(false))
    .addStringOption((footer) => footer.setName('footer'). setDescription('Footer do embed').setRequired(false))
    .addBooleanOption((timestamp) => timestamp.setName('timestamp'). setDescription('Adicionar timestamp (s/n)').setRequired(false))
    .addStringOption((thumbnail) => thumbnail.setName('thumbnail'). setDescription('Link da imagem thumbnail').setRequired(false))
    .addStringOption((link) => link.setName('link'). setDescription('Link anexado').setRequired(false))
    .addStringOption((color) => color.setName('color'). setDescription('Cor do embed Hex').setRequired(false)),
    run: async (client, interaction) => {
        if(!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)){
            interaction.reply({ content: `Voce nao tem permissao pra utilizar esse comando.`, ephemeral: true})
        } else {
            let embed_fala = interaction.options.getString("embed");
            let normal_fala = interaction.options.getString("normal");

            if(!embed_fala && !normal_fala){
                interaction.reply(`Escolha pelo menos uma opcao.`)
            } else {
                if(!embed_fala) embed_fala = " ";
                if(!normal_fala) normal_fala = " ";
                let user = interaction.options.getUser("autor");
                let string = interaction.options;
                let embed = new EmbedBuilder()
                .setColor(interaction.options.getString("color"))
                .setTitle(interaction.options.getString("titulo"))
                .setURL(string.getString("link"))
                .setThumbnail(string.getString("thumbnail"))
                .setImage(string.getString("imagem"))
                .setTimestamp()
                .setFooter({ text: string.getString("footerode") })
                .setAuthor({ name: user.username, iconURL: user.displayAvatarURL({ dynamic: true }) })
                .setDescription(embed_fala);

                if(embed_fala == " "){
                    interaction.reply({ content: ` Sua mensagem foi enviada `, ephemeral: true})
                    const canalembedum = interaction.options.getChannel("canal").id
                    const enviar = interaction.client.channels.cache.get(canalembedum)
                    enviar.send({ content: `${normal_fala}` })
                } else if(normal_fala == " ") {
                    interaction.reply({ content: ` Sua mensagem foi enviada!`, ephemeral: true })
                    const canalembedumm = interaction.options.getChannel("canal").id
                    const enviar = interaction.client.channels.cache.get(canalembedumm)
                    enviar.send({ embeds: [embed] })
                } else {
                    interaction.reply({ content: ` Sua mensagem foi enviada!`, ephemeral: true })
                    const canalembedummm = interaction.options.getChannel("canal").id
                    const enviar = interaction.client.channels.cache.get(canalembedummm)
                    enviar.send({ content: `${normal_fala}`, embeds: [embed] })
                }
            }
        }
    }
 };
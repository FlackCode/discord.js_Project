const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { setMessageId } = require('../../state')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('namecolor')
        .setDescription('Opens up a menu where you can choose your role color!'),

    async execute(interaction) {
        await interaction.deferReply()
        const emojis = ['🔴', '🟢', '🔵']
        const colorNames = ['Red', 'Green', 'Blue']
        let embed = new EmbedBuilder()
            .setTitle('Pick a role color')
            .setColor('White')

        for (let i = 0; i < emojis.length; i++) {
            let emoji = emojis[i]
            let colorName = colorNames[i]
            embed.addFields({
                name: `${emoji} ${colorName}`,
                value: ' ',
                //inline: true
            })
        }

        const message = await interaction.editReply({
            embeds: [embed],
            ephemeral: true
        })

        for (let emoji of emojis) {
            await message.react(emoji)
        }

        setMessageId(message.id)
    }
}

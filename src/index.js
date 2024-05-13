require('dotenv').config();
const { Client, GatewayIntentBits, TextChannel} = require('discord.js');
const CharacterAI = require('./CharacterAI');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
    ],
});


const characterAI = new CharacterAI();

async function startBot() {
    try {
        console.log('Bot is ready');

        // Authenticate with the CharacterAI service
        await characterAI.authenticateWithToken(process.env.AIToken);

        // Place your character's id here
        const characterId = "sEiSmGMnzTdaO7PxIcAPhccXGUh6OPt57E-r595wbE0";

        // Create or continue chat
        await characterAI.createChat(characterId);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

client.once('ready', startBot);

client.on('messageCreate', async message => {
    // Check if the message is from a specific channel and not from the bot itself
    if (message.channel.id === '986523772628660255' && !message.author.bot) {
        try {
            // Start typing to show the user that the bot is processing the request
            const textChannel = message.channel instanceof TextChannel ? message.channel : null;
            textChannel.sendTyping();

            // Send the message content to the CharacterAI module for processing
            const response = await characterAI.sendMessageToAI(message.content);
            // Send the AI response back to the user
            message.channel.send(response);
        } catch (error) {
            console.error('Error:', error.message);
            message.channel.send('An error occurred while processing your request.');
        }
    }
});

// Your Discord bot token
client.login(process.env.BotToken);

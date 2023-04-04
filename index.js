require('dotenv/config');
const { Client, IntentsBitField } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers,
  ],
});

client.on('ready', () => {
  console.log('The bot is online!');
});

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);
// Set which topics you want the bot to talk about when sending Conversation Starters
const TOPICS = [
  'movie facts',
  'gaming history',
  'the best video games',
  'video games from 1990 to 2020',
  'game character'
];
// Set the personailty for when the bot sends a Conversation Starters
async function generateConversationStarter(topic) {
  const conversationLog = [
    {
      role: 'system',
      content:
        'You are a chatbot on Discord. Your personality is rude but funny, witty, and sarcastic. You want to make people laugh when you talk to them. If you encounter inappropriate or disrespectful questions, you should mock the asker for asking such questions but avoid providing offensive answers.'
    },
    {
      role: 'user',
      content: `Tell the Discord server something interesting about ${topic}.` // Set the how you want the Conversation Starter to be asked to the bot
    }
  ];
  const result = await openai
    .createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: conversationLog
    })
    .catch((error) => {
      console.log(`OPENAI ERR: ${error}`);
    });

  return result.data.choices[0].message.content;
}

async function getRandomConversationStarter() {
  const randomTopic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
  return await generateConversationStarter(randomTopic);
}
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== process.env.CHANNEL_ID) return;

  const isMention = message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`);
  const isReply = message.reference && message.reference.messageId && (await message.channel.messages.fetch(message.reference.messageId)).author.id === client.user.id;

  if (!isMention && !isReply) return;

  let conversationLog = [{ role: 'system', content: 'You are a chatbot on Discord. Your personality is rude but funny, witty, and sarcastic. You want to make people laugh when you talk to them. If you encounter inappropriate or disrespectful questions, you should mock the asker for asking such questions but avoid providing offensive answers.' }];

  try {
    await message.channel.sendTyping();

    let prevMessages = await message.channel.messages.fetch({ limit: 15 });
    prevMessages.reverse();
    prevMessages.forEach((msg) => {
      if (msg.author.id === client.user.id) {
        conversationLog.push({ role: 'assistant', content: msg.content });
      } else if (msg.author.id === message.author.id) {
        conversationLog.push({ role: 'user', content: msg.content });
      }
    });
    
    const result = await openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationLog,
      })
      .catch((error) => {
        console.log(`OPENAI ERR: ${error}`);
      });
    
    message.reply(result.data.choices[0].message.content);
  } catch (error) {
    console.log(`ERR: ${error}`);
  }
});

let lastMessageTimestamp = Date.now();

client.on('messageCreate', (message) => {
  if (message.channel.id === process.env.CHANNEL_ID) {
    lastMessageTimestamp = Date.now();
  }
});
// Set time for when the bot will send a Conversation Starters
setInterval(async () => {
  const currentTime = Date.now();
  const timeSinceLastMessage = currentTime - lastMessageTimestamp;
  const idleTimeLimit = 1 * 60 * 1000; // 2 hours in milliseconds

  if (timeSinceLastMessage >= idleTimeLimit) {
    const channel = client.channels.cache.get(process.env.CHANNEL_ID);
    const conversationStarter = await getRandomConversationStarter();
    channel.send(conversationStarter);
    lastMessageTimestamp = Date.now();
  }
}, 60 * 1000); // Check every minute

client.login(process.env.TOKEN);

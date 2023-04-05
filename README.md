# ChetGPT - Discord Conversation Bot


ChetGPT is a conversation bot for you Discord. Users can talk to ChetGPT by mentioning it (@) or replying to its messages. 

Requirements
  - You need a OpenAI API key (https://platform.openai.com/account/api-keys)
  - You need to create a Discord bot (https://discord.com/developers/applications)
  - You need Developer Mode enabled on Discord (https://www.thewindowsclub.com/how-to-enable-the-developer-mode-on-discord-for-pc-and-web)
  - Visual Studio Code for testing (https://code.visualstudio.com/)
  - Sparked Host for 24/7 live server (https://sparkedhost.com/discord-bot-hosting)

Current Feature of ChetGPT
  - Conversation Starters
    - You can setup topics for ChetGPT. ChetGPT will pick from these topics and send a natural conversation starters.
    - You can set how long you want ChetGPT to send a conversation starters.
    - You can set the personality for the conversation starter messages.

  - Overall Personality
    - You can set the personality for ChetGPT. Right now it is set as "You are a chatbot on Discord. Your personality is rude but funny, witty, and sarcastic."
_______________________________________________________________________

## Setup

1) Set up a Discord Bot
  - Name the bot whatever you want (doesn't need to be ChetGPT)
  - Add profile picture 
  - On the left side click "Bot"
    - Add the same profile picture 
    - Toggle on PUBLIC BOT, PRESENCE INTENT, SERVER MEMBERS INTENT, and MESSAGE CONTENT INTENT
  - On the left side again click "OAUTH2" then "URL Generator"
    - Under SCOPES click "bot"
    - Under BOT PERMISSIONS click "Read Messages/View Channels", "Send Messages", "Read Message History"
  - On the botton of this page click "Copy" and then paste the URL into your browser.
    - Follow the the next steps by Discord to add your bot to your server.
    - Once down your bot will now be added to your Discord

2) Setting up ChetGPT
  - DO NOT SHARE YOUR API KEY OR DISCORD TOKEN WITH ANYONE!
  - Turn on Developer Mode on Discord (https://www.thewindowsclub.com/how-to-enable-the-developer-mode-on-discord-for-pc-and-web)
  - Download and unzip the code from this GitHub
  - Open Visual Studio Code and click "Open Folder" 
    - Click the unzipped ChetGPT folder
  - On the left side click ".env" (This is where you will put your Discord TOKEN, OpenAI API Key, and Channel ID)
    - Go back to your Discord bot settings (https://discord.com/developers/applications).
      - Click "Reset Token" or "View Token" then copy and paste the token after the "=" on the TOKEN line in the ".env"
    - Go to OpenAI API Key website (https://platform.openai.com/account/api-keys)
      - Click "Create Secret Key" then paste it after the "=" on the APT_KEY line in the ".env"
    - Open Discord make sure Developer Mode is on.
      - Right click the channel you want your bot to chat in then select "Copy ID" 
      - Paste it after the "=" on the CHANNEL_ID line in the ".env"
    - Now File Save or CTRL+S to save the work you have just done.
    
3) Testing Your Bot
  - Back over to Visual Studio Code
    - On the top click "Terminal" then "New Terminal" 
    - In the Terminal type the command "npm install discord.js"
    - In the Terminal type the command "npm install openai"
    - In the Terminal type the command "node index.js" 
    - Let the command run and you at the end of all the text you should see "bot is online"
  - Back to Discord
    - Now your bot should be online with a green bot
    - You can test the bot by @ing it or replying to it's messages
    - If all is working, you can tweak settings as you see fit.

4) Tweak Settings
  - Overall Personailty (Line 68 on Visual Studio Code)
    - You can change the bots personailty. You can tell it to be nice, rude, mean, funny, etc...
    - Be as detailed as you want but note sometimes it doesn't get it right everytime
    - Make sure to say within the quotation marks ' ' when making changes
  - Changing Topics (Line 21 on Visual Studio Code)
    - ChetGPT has topics you can change for conversation starters. Change these topics that best fits your community. 
    - Make sure to say within the quotation marks ' ' when making changes
    - You can also set the personailty for how the message is sent out. This is seperate from the Overall Personailty.
- Conversation Starters Timer (Line 109 on Visual Studio Code)
    - You can change how long ChetGPT will send a conversation starter based on the last message in chat.
    - Currently the time is set like this 120 * 60 * 1000 (MINS * SECONDS * MS). You only need to change the "120" to the amount of minutes you want the time set to
    - Currently this is set to 2 hours but change it as you see fit.
- Test Your Bot Again

5) Keeping Your Bot Live 24/7
  - Follow the video by Sparked Host (https://youtu.be/qVc12Wu-4ic)
  - You only need to copy over .env, index.js, package-lock, package.json - Everything else will be created by Sparked Host.
  

Future Features
  - Assigning certain to use your bot. Currently anyone could use it.
  - Connecting ChatGPT to the internet for the latest infomation
  - "time out" users who are being rude to only users.
    
  


  
  


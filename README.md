# Twitch Auto-reply Bot
### Usage
Listening to the messages in Twitch Chatroom, and react upon the specific command.

### Features
1. 10 seconds cooldown time to avoind flooding the chatroom
2. food list → read the txt file 
3. Commands：
  - 晚餐時間 (dinner time) → return random food for resommendation
  - 午餐時間 (lunch time) → return random food for resommendation
  - 睡覺時間 (sleep time) → return "Goodnight"
  - 老麥時間 (McDonald time)→ return a random combo from McDonald's
  - 飲料時間 (bubble tea time)→ return a random bubble tea selection in Taiwan
4. menu_crawler.py : Web srapping for the milktea and McDonald's menu.

### Execution on the local machine
1. Creat an `.env` file to store the environment variables: `TWITCH_BOT_USERNAME` and `TWITCH_BOT_OATH_TOKEN`
2. Install node.js
3. Run `node server.js` in the terminal

### Deploy on Render
1. Add a web service by importing the Github repository
2. Set the build command `yarn`
3. Set the start command `npm run start`
4. Set the environment variables: `TWITCH_BOT_USERNAME` and `TWITCH_BOT_OATH_TOKEN`

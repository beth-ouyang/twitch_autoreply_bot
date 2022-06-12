# Twitch 自動回話機器人
### 主要功能
聊天室輸入指令 → 回傳文字

### Features
1. 監聽聊天室，收到指令後回傳指定內容
2. 10秒CD
3. 食物列表 → 讀取txt檔
4. 目前有的指令：
  - 晚餐時間 → 回傳隨機食物
  - 午餐時間 → 回傳隨機食物
  - 睡覺時間 → 回傳晚安
  - 老麥時間 → 回傳隨機套餐（只有超值全餐 嘿嘿）
  - 飲料時間 → 回傳隨機飲料
5. menu_crawler.py : 飲料菜單＆麥當勞菜單爬蟲
### 執行方式
#### 在本機執行
1. 下載 node.js
2. 執行：終端機 node server.js
#### Or you can deploy on Heroku:
[Twitch Chat Bot Tutorial - Create & Deploy with node.js, tmi.js, & Heroku](https://www.youtube.com/watch?v=gBX7S9i74GU&t=1290s)



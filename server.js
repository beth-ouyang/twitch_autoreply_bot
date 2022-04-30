const {readFileSync, promises: fsPromises} = require('fs');
const tmi = require('tmi.js');
var use_cnt = 0;
var foodsList = readFoodList('./food_list.txt');
var stamp_arr = ['nlnlYes', 'nlnlOMG', 'BloodTrail', 'StinkyCheese', 'BabyRage', 'BrainSlug', 'KappaPride', 'PogChamp', 'TPFufun', 'cmonBruh', 'SwiftRage', 'PunOko', 'SabaPing', 'FamilyMan', 'BegWan', 'SeemsGood', 'OSFrog'];


const client = new tmi.Client({
	connection:{
		reconnect: true
	},
	channels: ['never_loses'],
	identity: {
		username: 'username',
		password: 'password' //twitchgenerator.com
	},
});

// console.log(selectFood(foodsList))

client.connect();
client.on('connected', onConnectedHandler);

client.on('message', echoDinner);

//////////////////////////////////////////////////////////

function echoDinner(channel, tags, message, self, food_list=foodsList) {
    if (self) { return; } // Ignore messages from the bot
  
    const commandName = replaceEMOTES(message).trim();
    var emote = selectEMOTES()

    // If the command is known, let's execute it
    if (commandName === '!晚餐時間') {
        use_cnt += 1
        var food = selectFood(food_list);
        client.say(channel, `@${tags["display-name"]} 晚餐吃${food} ${emote} `);
        
        console.log(`* ${commandName} 被使用了 ${use_cnt}次`);
    }

    if (commandName === '!午餐時間') {
        use_cnt += 1
        var food = selectFood(food_list);
        client.say(channel, `@${tags["display-name"]} 午餐吃${food} ${emote} `);
        
        console.log(`* ${commandName} 被使用了 ${use_cnt}次`);
    }

}


function replaceEMOTES (str){
    const rule = /[a-zA-Z\d]/ig;
    return str.replaceAll(rule,"");
}

function selectFood (list) {
    const len = list.length;
    return list[Math.floor(Math.random() * len)];
}

function selectEMOTES() {
    const len = stamp_arr.length;
    return stamp_arr[Math.floor(Math.random() * len)];
}

function readFoodList(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split('\n');
    return arr;
}

function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

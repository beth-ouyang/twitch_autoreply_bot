const { readFileSync, promises: fsPromises } = require('fs');
const tmi = require('tmi.js');

var door_open = true;
var use_cnt = 0;
var goodnoght_cnt = 0;
var foodsList = readFoodList('./food_list.txt');
var stamp_arr = ['nlnlYes', 'nlnlOMG', 'BloodTrail', 'StinkyCheese', 'BabyRage', 'BrainSlug', 'KappaPride', 'PogChamp', 'TPFufun', 'cmonBruh', 'SwiftRage', 'PunOko', 'SabaPing', 'FamilyMan', 'BegWan', 'SeemsGood', 'OSFrog', 'RaccAttack'];

const client = new tmi.Client({
    connection: {
        reconnect: true
    },
    channels: ['never_loses'],
    identity: {
        username: 'your_username',
        password: 'your_password' //get from → twitchgenerator.com
    },
});


client.connect();
client.on('connected', onConnectedHandler);

client.on('message', echoDinner);


//////////////////////////////////////////////////////////

function echoDinner(channel, tags, message, self, food_list = foodsList) {
    if (self) { return; }
    var emote = selectEMOTES();

    if (message.includes('!晚餐時間') & door_open == true) {
        var food = selectFood(food_list);

        door_open = false;
        use_cnt += 1;

        client.say(channel, `@${tags["display-name"]} 晚餐吃${food} ${emote} `);
        console.log(`* 機器皮皮蝦被呼喚了 ${use_cnt}次`);

        setTimeout(function() { door_open = true }, 10000);
    }

    if (message.includes('!午餐時間') & door_open == true) {
        var food = selectFood(food_list);

        door_open = false
        use_cnt += 1

        client.say(channel, `@${tags["display-name"]} 午餐吃${food} ${emote} `);
        console.log(`* 機器皮皮蝦被呼喚了 ${use_cnt}次`);

        setTimeout(function() { door_open = true }, 10000);
    }

    if (message.includes('!睡覺時間') & door_open == true) {
        var food = selectFood(food_list);

        door_open = false
        goodnoght_cnt += 1

        client.say(channel, `@${tags["display-name"]} 古德奈 <3 `);
        console.log(`* 有 ${goodnoght_cnt} 個人加入了睡睡幫 zZZ`);

        setTimeout(function() { door_open = true }, 10000);
    }


}


function replaceEMOTES(str) {
    const rule = /[a-zA-Z\d]/ig;
    return str.replaceAll(rule, "");
}

function selectFood(list) {
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

function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

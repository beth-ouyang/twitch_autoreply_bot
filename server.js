require('dotenv').config();

const { readFileSync, promises: fsPromises } = require('fs');
const tmi = require('tmi.js');

var door_open = true;
var use_cnt = 0;
var goodnoght_cnt = 0;
const CD_time = 5000
const foodsList = readFoodList('./FoodListFolder/food_list.txt');
const mcList = readFoodList('./FoodListFolder/mc_set_list.txt');
const drinkList = readFoodList('./FoodListFolder/drink_list.txt');
const stamp_arr = ['nlnlYes', 'nlnlOMG', 'BloodTrail', 'StinkyCheese', 'BabyRage', 'OhMyDog', 'KappaPride', 'PogChamp', 'TPFufun', 'cmonBruh', 'SwiftRage', 'PunOko', 'SabaPing', 'FamilyMan', 'BegWan', 'SeemsGood', 'OSFrog', 'RaccAttack', 'Poooound', 'DxCat', ' ChefFrank', 'SeriousSloth'];

const client = new tmi.Client({
    connection: {
        reconnect: true
    },
    channels: ['never_loses', 'achiaaaaka'],
    identity: {
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_BOT_OATH_TOKEN
    },
});


client.connect();
client.on('connected', onConnectedHandler);

client.on('message', echoDinner);

// console.log(readFoodList('./mc_set_list.txt'))

//////////////////////////////////////////////////////////

function echoDinner(channel, tags, message, self) {
    if (self) { return; }
    var emote = selectEMOTES();

    if (message.includes('!晚餐時間') & door_open == true) {
        var food = randomSelect(foodsList);

        door_open = false;
        use_cnt += 1;

        client.say(channel, `@${tags["display-name"]} 晚餐吃${food} ${emote} `);
        console.log(`* 機器皮皮蝦被呼喚的第${use_cnt}次 by ${tags["display-name"]}`);

        setTimeout(function() { door_open = true }, CD_time);
    }

    if (message.includes('!午餐時間') & door_open == true) {
        var food = randomSelect(foodsList);

        while (tags.username == 'raccattack850811' && (food.includes('麵') | food.includes('米粉') | food.includes('羹'))) {
            food = randomSelect(foodsList);
        }

        door_open = false
        use_cnt += 1

        client.say(channel, `@${tags["display-name"]} 午餐吃${food} ${emote} `);
        console.log(`* 機器皮皮蝦被呼喚的第${use_cnt}次 by ${tags["display-name"]}`);

        setTimeout(function() { door_open = true }, CD_time);
    }

    if (message.includes('!睡睡時間') & door_open == true) {
        door_open = false
        goodnoght_cnt += 1

        if (tags.username == 'achiaaaaka') {
            client.say(channel, `大家估奈 DxCat `)
        }

        client.say(channel, `@${tags["display-name"]} 估奈 GivePLZ `);
        console.log(`* ${tags["display-name"]}加入了睡睡幫 zZZ`);

        setTimeout(function() { door_open = true }, CD_time);
    }

    if (message.includes('!老麥時間') & door_open == true) {
        var food = randomSelect(mcList);

        door_open = false
        use_cnt += 1

        client.say(channel, `@${tags["display-name"]} 老麥就選${food} ${emote} `);
        console.log(`* 機器皮皮蝦被呼喚的第${use_cnt}次 by ${tags["display-name"]}`);

        setTimeout(function() { door_open = true }, CD_time);
    }

    if (message.includes('!飲料時間') & door_open == true) {
        var drink = randomSelect(drinkList);

        door_open = false
        use_cnt += 1

        client.say(channel, `@${tags["display-name"]} 來喝個${drink} ${emote} `);
        console.log(`* 機器皮皮蝦被呼喚的第${use_cnt}次 by ${tags["display-name"]}`);

        setTimeout(function() { door_open = true }, CD_time);
    }


}


function replaceEMOTES(str) {
    const rule = /[a-zA-Z\d]/ig;
    return str.replaceAll(rule, "");
}

function randomSelect(list) {
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
    return arr.filter(el => el);
}

function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
    res.sendStatus(200);
}

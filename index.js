let CronJob = require('cron').CronJob;
const https = require('https');
let TelegramBot = require('node-telegram-bot-api');
let token = '1721909040:AAExnS3IJjgEGiJTAAEQTkDvKrOi4f3f8xg';
const data = require('fs').readFileSync('/CHECKLIST.pdf')
let bot = new TelegramBot(token, {polling: true});
let options = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'ИӘ,ҚАТЫСАМЫН', callback_data: 'ИӘ,ҚАТЫСАМЫН' }],
        ]
    })
};
const fileOptions = {
    filename: 'CHECKLIST.pdf',
    contentType: 'application/pdf',
};
bot.onText(/\/start/, function (msg, match) {
    let notes = [
        {
            text: '⏰Кеш жарық, тегін онлайн вебинарда ӨТЕ КӨП пайдалы ақпаратпен бөлісетін боламыз.\n' +
                '🤔Дайынсыз ба?! Вебинарға қатысуды растау ИӘ,ҚАТЫСАМЫН -деген батырманы басыңыз.\n',
            time: '14:46',
            button: true,
        },
        {
            text: '✅Тегін онлайн вебинарға қатысу үшін, төмендегі сілтемені басып өз орныңызды алыңыз👇 \n https://start.bizon365.ru/room/88694/botakoniratbekkyzy',
            time: '14:32',
            button: false
        },
        {
            text: '🥳Вебинар басталуына бір сағаттан аз уақыт қалды\n' +
                'Дайындалып отырсыз ба? \n https://start.bizon365.ru/room/88694/botakoniratbekkyzy',
            time: '19:10',
            button: false
        },
        {
            text: '⏳Жарты сағат қана қалды, тура 30 минуттан соң бастаймыз, дайынсыз ба?',
            time: '19:20',
            button: false
        },
        {
            text: '🥳Онлайн вебинарымыз басталды, төмендегі сілтемемен өтіп тез-тез жайғаса қойыңыз⏰👇 \n https://start.bizon365.ru/room/88694/botakoniratbekkyzy',
            time: '19:50',
            button: false
        },
        {
            text: '😃Сіз көрінбейсіз ғой?! Бәрі мықты контентті тамашалауды бастап кетті, сізді таппай отырмын🤔 \n' +
                '✅Тездетіп төмендегі сілтемені басып вебинарға кіріңіз👇 \n' +
                'https://start.bizon365.ru/room/88694/botakoniratbekkyzy',
            time: '20:00',
            button: false
        },
        {
            text: '😱Мәәә, қазір Төлеген мырзаның өз интернет дүкенің ашып қалай 1.300.000 теңге табысқа қалай шыққаның талдап жатырмыз🔥 \n' +
                'Қызықтан құр қалмай, вебинарға қатысыңыз👇 \n' +
                'https://start.bizon365.ru/room/88694/botakoniratbekkyzy',
            time: '20:05',
            button: false
        },
        {
            text: '😅Ойбууу... Әлі кірмепсіз ғой орын алып қатысамын деп едіңіз🤔 \n' +
                'Әлі де кеш емес, ЕҢ ПАЙДАЛЫ бөлім әлі алда🔥 \n' +
                '👇Вебинарға кіріңіз👇 \n' +
                'https://start.bizon365.ru/room/88694/botakoniratbekkyzy',
            time: '20:10',
            button: false
        }
    ]
    var userId = msg.from.id;
    bot.sendMessage(userId, `
🥳ҚҰТТЫҚТАЙМЫН \n
Табысқа жетуге бір қадам жақындадыңыз! Тегін онлайн вебинарға өз орныңызды алып үлгердіңіз! \n
Сізге УӘДЕ еткен сыйлығым🎁👇 \n
📥Вебинар эфирінін сілтемесін сізге SMS-пен жіберемін 
`)
    bot.sendDocument(msg.from.id, data, {}, fileOptions);
    setInterval(function () {
        new CronJob('* * * * * *', function () {
            for (let i = 0; i < notes.length; i++) {
                let curDate = new Date().getHours() + ':' + new Date().getMinutes();
                if (notes[i]['time'] === curDate) {
                    if (notes[i]['button'] === true) {
                        bot.sendMessage(msg.from.id, notes[i]['text'],options);
                    } else {
                        bot.sendMessage(msg.from.id, notes[i]['text'])
                    }
                    notes.splice(i, 1);
                }
            }
        }, null, true, 'Europe/Kiev');
    }, 1000);

})
bot.on('callback_query', function (msg) {
    let button = msg.data;
    let robot = "ИӘ,ҚАТЫСАМЫН";
    if (button === robot) {
        bot.sendMessage(msg.from.id, "https://start.bizon365.ru/room/88694/botakoniratbekkyzy");
    }
});





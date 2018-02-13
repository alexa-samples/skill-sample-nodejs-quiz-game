'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: このコメント以下の項目に注意してください。
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this:  var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
const APP_ID = undefined;

//This function returns a descriptive sentence about your data.  Before a user starts a quiz, they can ask about a specific data element,
//like "Ohio."  The skill will speak the sentence from this function, pulling the data values from the appropriate record in your data.
function getSpeechDescription(item)
{
    let sentence = item.PrefectureName + " は、コード番号 " + item.PrefectureOrder + "番の都道府県で、ローマ字表記は <break strength='strong'/><say-as interpret-as='spell-out'> " + item.Romanization + "</say-as>です。 " + item.PrefectureName + " の花として " + item.PrefectureFlower + " が指定されています。 " + item.PrefectureName + " の県庁所在地は " + item.PrefecturalOfficeLocation + "です。 " + item.PrefectureName + " をあなたのアレクサアプリに追加しました。  ほかに、どの都道府県や都市について知りたいですか?";
    return sentence;
}

//We have provided two ways to create your quiz questions.  The default way is to phrase all of your questions like: "What is X of Y?"
//If this approach doesn't work for your data, take a look at the commented code in this function.  You can write a different question
//structure for each property of your data.
function getQuestion(counter, property, item)
{
    //Alexa will handle how the ordinals are pronounced. She'll correctly say "first" instead of "1th", or "second" instead of "2th"
    return "第 " + counter + "問です。 " + item.PrefectureName + " の " + formatCasing(property) + " は何ですか?";

    /*
    switch(property)
    {
        case "City":
            return "Here is the " + counter + "th question. In what city do the " + item.League + "'s "  + item.Mascot + " play?";
        break;
        case "Sport":
            return "Here is the " + counter + "th question. What sport do the " + item.City + " " + item.Mascot + " play?";
        break;
        case "HeadCoach":
            return "Here is the " + counter + "th question. Who is the head coach of the " + item.City + " " + item.Mascot + "?";
        break;
        default:
            return "Here is the " + counter + "th question. What is the " + formatCasing(property) + " of the "  + item.Mascot + "?";
        break;
    }
    */
}

//This is the function that returns an answer to your user during the quiz.  Much like the "getQuestion" function above, you can use a
//switch() statement to create different responses for each property in your data.  For example, when this quiz has an answer that includes
//a state romanization, we add some SSML to make sure that Alexa spells that romanization out (instead of trying to pronounce it.)
function getAnswer(property, item)
{
    switch(property)
    {
        case "Romanization":
            return item.PrefectureName + " の " + formatCasing(property) + " は <say-as interpret-as='spell-out'>" + item[property] + "</say-as>です。 "
        default:
            return item.PrefectureName + " の " + formatCasing(property) + " は " + item[property] + "です。 "
    }
}

//This is a list of positive speechcons that this skill will use when a user gets a correct answer.  For a full list of supported
//speechcons, go here: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference
const speechConsCorrect = ["あっはっは", "あら", "あらあ", "イェイ", "うっひゃあ", "うっひょう", "うふふ", "おー", "おおー", "おっ",
"おめでとう", "乾杯", "そうそう", "は〜い", "はっはっは", "万歳", "ピンポーン", "ほ〜", "やったあ",
"やっほう", "ようし", "わ〜い", "わあーっ", "わっしょい"];

//This is a list of negative speechcons that this skill will use when a user gets an incorrect answer.  For a full list of supported
//speechcons, go here: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference
const speechConsWrong = ["あ〜あ", "あいたた", "あちゃあ", "あっとー", "ありゃ", "あれれ", "うぅ", "ううっ", "え〜", "おっと", "およよ", 
"ぎゃあ", "しくしく", "とほほ", "ドンマイ", "ひいっ", "ぶう", "むっ"];

//This is the welcome message for when a user starts the skill without a specific intent.
const WELCOME_MESSAGE = "都道府県クイズゲームへようこそ!  47都道府県とそれらの県庁所在地について質問できます。または、クイズを始めることもできます。  何をしますか?";

//This is the message a user will hear when they start a quiz.
const START_QUIZ_MESSAGE = "了解です。 都道府県に関する10個のクイズを出します。";

//This is the message a user will hear when they try to cancel or stop the skill, or when they finish a quiz.
const EXIT_SKILL_MESSAGE = "都道府県クイズゲームで遊んでくれてありがとうございます!  また今度遊びましょう!";

//This is the message a user will hear after they ask (and hear) about a specific data element.
const REPROMPT_SPEECH = "ほかに、どの都道府県や都市について知りたいですか?";

//This is the message a user will hear when they ask Alexa for help in your skill.
const HELP_MESSAGE = "私は日本の都道府県についてたくさんのことを知っています。  都道府県または都市について聞いてくれれば、わたしが知っていることをお伝えします。  もしくは、「クイズをはじめて」と伝えていただければ、あなたの知識をテストすることもできます。  何をしますか?";


//This is the response a user will receive when they ask about something we weren't expecting.  For example, say "pizza" to your
//skill when it starts.  This is the response you will receive.
function getBadAnswer(item) { return "すみません。 " + item + " は、このスキルの中でわたしがよく知っているものではありません。 " + HELP_MESSAGE; }

//This is the message a user will receive after each question of a quiz.  It reminds them of their current score.
function getCurrentScore(score, counter) { return "あなたの今のスコアは " + counter + " 点中 " + score + " 点です。 "; }

//This is the message a user will receive after they complete a quiz.  It tells them their final score.
function getFinalScore(score, counter) { return "あなたの最終スコアは " + counter + " 点中 " + score + " 点です。 "; }

//These next four values are for the Alexa cards that are created when a user asks about one of the data elements.
//This only happens outside of a quiz.

//スキルでカードを使いたくない場合は、USE_CARDS_FLAGをfalseにします。
//trueにする場合、各データに対応する画像を用意する必要があります。 
const USE_CARDS_FLAG = true;

//This is what your card title will be.  For our example, we use the name of the state the user requested.
function getCardTitle(item) { return item.PrefectureName;}

//This is the small version of the card image.  We use our data as the naming convention for our images so that we can dynamically
//generate the URL to the image.  The small image should be 720x400 in dimension.
function getSmallImage(item) { return "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/state_flag/720x400/" + item.Romanization + ".png"; }

//This is the large version of the card image.  It should be 1200x800 pixels in dimension.
function getLargeImage(item) { return "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/state_flag/1200x800/" + item.Romanization + ".png"; }

//=========================================================================================================================================
//TODO: このデータをあなたのものと置き換えてください。
//=========================================================================================================================================
const data = [
                {PrefectureName: "北海道", Romanization: "hokkaido", PrefecturalOfficeLocation: "札幌", PrefectureFlower: "ハマナス", PrefectureOrder: 1 },
                {PrefectureName: "青森県", Romanization: "aomori", PrefecturalOfficeLocation: "青森", PrefectureFlower: "りんごの花", PrefectureOrder: 2 },
                {PrefectureName: "岩手県", Romanization: "iwate", PrefecturalOfficeLocation: "盛岡", PrefectureFlower: "キリ", PrefectureOrder: 3 },
                {PrefectureName: "宮城県", Romanization: "miyagi", PrefecturalOfficeLocation: "仙台", PrefectureFlower: "ミヤギノハギ", PrefectureOrder: 4 },
                {PrefectureName: "秋田県", Romanization: "akita", PrefecturalOfficeLocation: "秋田", PrefectureFlower: "フキのとう", PrefectureOrder: 5 },
                {PrefectureName: "山形県", Romanization: "yamagata", PrefecturalOfficeLocation: "山形", PrefectureFlower: "べにばな", PrefectureOrder: 6 },
                {PrefectureName: "福島県", Romanization: "fukushima", PrefecturalOfficeLocation: "福島", PrefectureFlower: "ネモトシャクナゲ", PrefectureOrder: 7 },
                {PrefectureName: "茨城県", Romanization: "ibaraki", PrefecturalOfficeLocation: "水戸", PrefectureFlower: "バラ", PrefectureOrder: 8 },
                {PrefectureName: "栃木県", Romanization: "tochigi", PrefecturalOfficeLocation: "宇都宮", PrefectureFlower: "ヤシオツツジ", PrefectureOrder: 9 },
                {PrefectureName: "群馬県", Romanization: "gunma", PrefecturalOfficeLocation: "前橋", PrefectureFlower: "レンゲツツジ", PrefectureOrder: 10 },
                {PrefectureName: "埼玉県", Romanization: "saitama", PrefecturalOfficeLocation: "さいたま", PrefectureFlower: "サクラソウ", PrefectureOrder: 11 },
                {PrefectureName: "千葉県", Romanization: "chiba", PrefecturalOfficeLocation: "千葉", PrefectureFlower: "なのはな", PrefectureOrder: 12 },
                {PrefectureName: "東京都", Romanization: "tokyo", PrefecturalOfficeLocation: "東京", PrefectureFlower: "ソメイヨシノ", PrefectureOrder: 13 },
                {PrefectureName: "神奈川県", Romanization: "kanagawa", PrefecturalOfficeLocation: "横浜", PrefectureFlower: "ヤマユリ", PrefectureOrder: 14 },
                {PrefectureName: "新潟県", Romanization: "niigata", PrefecturalOfficeLocation: "新潟", PrefectureFlower: "チューリップ", PrefectureOrder: 15 },
                {PrefectureName: "富山県", Romanization: "toyama", PrefecturalOfficeLocation: "富山", PrefectureFlower: "チューリップ", PrefectureOrder: 16 },
                {PrefectureName: "石川県", Romanization: "ishikawa", PrefecturalOfficeLocation: "金沢", PrefectureFlower: "クロユリ", PrefectureOrder: 17 },
                {PrefectureName: "福井県", Romanization: "fukui", PrefecturalOfficeLocation: "福井", PrefectureFlower: "スイセン", PrefectureOrder: 18 },
                {PrefectureName: "山梨県", Romanization: "yamanashi", PrefecturalOfficeLocation: "甲府", PrefectureFlower: "フジサクラ", PrefectureOrder: 19 },
                {PrefectureName: "長野県", Romanization: "nagano", PrefecturalOfficeLocation: "長野", PrefectureFlower: "リンドウ", PrefectureOrder: 20 },
                {PrefectureName: "岐阜県", Romanization: "gifu", PrefecturalOfficeLocation: "岐阜", PrefectureFlower: "レンゲ", PrefectureOrder: 21 },
                {PrefectureName: "静岡県", Romanization: "shizuoka", PrefecturalOfficeLocation: "静岡", PrefectureFlower: "ツツジ", PrefectureOrder: 22 },
                {PrefectureName: "愛知県", Romanization: "aichi", PrefecturalOfficeLocation: "名古屋", PrefectureFlower: "カキツバタ", PrefectureOrder: 23 },
                {PrefectureName: "三重県", Romanization: "mie", PrefecturalOfficeLocation: "津", PrefectureFlower: "ハナショウブ", PrefectureOrder: 24 },
                {PrefectureName: "滋賀県", Romanization: "shiga", PrefecturalOfficeLocation: "大津", PrefectureFlower: "シャクナゲ", PrefectureOrder: 25 },
                {PrefectureName: "京都府", Romanization: "kyoto", PrefecturalOfficeLocation: "京都", PrefectureFlower: "しだれ桜", PrefectureOrder: 26 },
                {PrefectureName: "大阪府", Romanization: "osaka", PrefecturalOfficeLocation: "大阪", PrefectureFlower: "ウメ サクラソウ", PrefectureOrder: 27 },
                {PrefectureName: "兵庫県", Romanization: "hyogo", PrefecturalOfficeLocation: "神戸", PrefectureFlower: "ノジギク", PrefectureOrder: 28 },
                {PrefectureName: "奈良県", Romanization: "nara", PrefecturalOfficeLocation: "奈良", PrefectureFlower: "奈良八重桜", PrefectureOrder: 29 },
                {PrefectureName: "和歌山県", Romanization: "wakayama", PrefecturalOfficeLocation: "和歌山", PrefectureFlower: "ウメ", PrefectureOrder: 30 },
                {PrefectureName: "鳥取県", Romanization: "tottori", PrefecturalOfficeLocation: "鳥取", PrefectureFlower: "20世紀梨の花", PrefectureOrder: 31 },
                {PrefectureName: "島根県", Romanization: "shimane", PrefecturalOfficeLocation: "松江", PrefectureFlower: "ボタン", PrefectureOrder: 32 },
                {PrefectureName: "岡山県", Romanization: "okayama", PrefecturalOfficeLocation: "岡山", PrefectureFlower: "ももの花", PrefectureOrder: 33 },
                {PrefectureName: "広島県", Romanization: "hiroshima", PrefecturalOfficeLocation: "広島", PrefectureFlower: "モミジ", PrefectureOrder: 34 },
                {PrefectureName: "山口県", Romanization: "yamaguchi", PrefecturalOfficeLocation: "山口", PrefectureFlower: "夏みかんの花", PrefectureOrder: 35 },
                {PrefectureName: "徳島県", Romanization: "tokushima", PrefecturalOfficeLocation: "徳島", PrefectureFlower: "すだちの花", PrefectureOrder: 36 },
                {PrefectureName: "香川県", Romanization: "kagawa", PrefecturalOfficeLocation: "高松", PrefectureFlower: "オリーブ", PrefectureOrder: 37 },
                {PrefectureName: "愛媛県", Romanization: "ehime", PrefecturalOfficeLocation: "松山", PrefectureFlower: "みかんの花", PrefectureOrder: 38 },
                {PrefectureName: "高知県", Romanization: "kochi", PrefecturalOfficeLocation: "高知", PrefectureFlower: "ヤマモモ", PrefectureOrder: 39 },
                {PrefectureName: "福岡県", Romanization: "fukuoka", PrefecturalOfficeLocation: "福岡", PrefectureFlower: "ウメ", PrefectureOrder: 40 },
                {PrefectureName: "佐賀県", Romanization: "saga", PrefecturalOfficeLocation: "佐賀", PrefectureFlower: "クスの花", PrefectureOrder: 41 },
                {PrefectureName: "長崎県", Romanization: "nagasaki", PrefecturalOfficeLocation: "長崎", PrefectureFlower: "雲仙ツツジ", PrefectureOrder: 12 },
                {PrefectureName: "熊本県", Romanization: "kumamoto", PrefecturalOfficeLocation: "熊本", PrefectureFlower: "リンドウ", PrefectureOrder: 43 },
                {PrefectureName: "大分県", Romanization: "oita", PrefecturalOfficeLocation: "大分", PrefectureFlower: "豊後梅", PrefectureOrder: 44 },
                {PrefectureName: "宮崎県", Romanization: "miyazaki", PrefecturalOfficeLocation: "宮崎", PrefectureFlower: "はまゆう", PrefectureOrder: 45 },
                {PrefectureName: "鹿児島県", Romanization: "kagoshima", PrefecturalOfficeLocation: "鹿児島", PrefectureFlower: "ミヤマキリシマ", PrefectureOrder: 46 },
                {PrefectureName: "沖縄県", Romanization: "okinawa", PrefecturalOfficeLocation: "那覇", PrefectureFlower: "デイゴ", PrefectureOrder: 47 }
            ];

//=========================================================================================================================================
//この行以降を編集すると、スキルが動かなくなる可能性があります。
//=========================================================================================================================================

const counter = 0;

const states = {
    START: "_START",
    QUIZ: "_QUIZ"
};

const handlers = {
     "LaunchRequest": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
     },
    "QuizIntent": function() {
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    },
    "AnswerIntent": function() {
        this.handler.state = states.START;
        this.emitWithState("AnswerIntent");
    },
    "AMAZON.HelpIntent": function() {
        this.response.speak(HELP_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
    }
};

const startHandlers = Alexa.CreateStateHandler(states.START,{
    "Start": function() {
        this.response.speak(WELCOME_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "AnswerIntent": function() {
        var item = getItem(this.event.request.intent.slots);

        if (item && item[Object.getOwnPropertyNames(data[0])[0]] != undefined)
        {
          console.log("\nMEMO's TEST\n");
            if (USE_CARDS_FLAG)
            {
                var imageObj = {smallImageUrl: getSmallImage(item), largeImageUrl: getLargeImage(item)};

                this.response.speak(getSpeechDescription(item)).listen(REPROMPT_SPEECH);
                this.response.cardRenderer(getCardTitle(item), getTextDescription(item), imageObj);
            }
            else
            {
                this.response.speak(getSpeechDescription(item)).listen(REPROMPT_SPEECH);
            }
        }
        else
        {
            this.response.speak(getBadAnswer(item)).listen(getBadAnswer(item));
        }

        this.emit(":responseReady");
    },
    "QuizIntent": function() {
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    },
    "AMAZON.RepeatIntent": function() {
        this.emitWithState("AskQuestion");
    },
    "AMAZON.StopIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function() {
        this.response.speak(HELP_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.emitWithState("Start");
    }
});


const quizHandlers = Alexa.CreateStateHandler(states.QUIZ,{
    "Quiz": function() {
        this.attributes["response"] = "";
        this.attributes["counter"] = 0;
        this.attributes["quizscore"] = 0;
        this.emitWithState("AskQuestion");
    },
    "AskQuestion": function() {
        if (this.attributes["counter"] == 0)
        {
            this.attributes["response"] = START_QUIZ_MESSAGE + " ";
        }

        let random = getRandom(0, data.length-1);
        let item = data[random];

        let propertyArray = Object.getOwnPropertyNames(item);
        let property = propertyArray[getRandom(1, propertyArray.length-1)];

        this.attributes["quizitem"] = item;
        this.attributes["quizproperty"] = property;
        this.attributes["counter"]++;

        let question = getQuestion(this.attributes["counter"], property, item);
        let speech = this.attributes["response"] + question;
 
        this.emit(":ask", speech, question);
    },
    "AnswerIntent": function() {
        let response = "";
        let speechOutput = "";
        let item = this.attributes["quizitem"];
        let property = this.attributes["quizproperty"]

        let correct = compareSlots(this.event.request.intent.slots, item[property]);

        if (correct)
        {
            response = getSpeechCon(true);
            this.attributes["quizscore"]++;
        }
        else
        {
            response = getSpeechCon(false);
        }

        response += getAnswer(property, item);

        if (this.attributes["counter"] < 10)
        {
            response += getCurrentScore(this.attributes["quizscore"], this.attributes["counter"]);
            this.attributes["response"] = response;
            this.emitWithState("AskQuestion");
        }
        else
        {
            response += getFinalScore(this.attributes["quizscore"], this.attributes["counter"]);
            speechOutput = response + " " + EXIT_SKILL_MESSAGE;

            this.response.speak(speechOutput);
            this.emit(":responseReady");
        }
    },
    "AMAZON.RepeatIntent": function() {
        let question = getQuestion(this.attributes["counter"], this.attributes["quizproperty"], this.attributes["quizitem"]);
        this.response.speak(question).listen(question);
        this.emit(":responseReady");
    },
    "AMAZON.StartOverIntent": function() {
        this.emitWithState("Quiz");
    },
    "AMAZON.StopIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function() {
        this.response.speak(HELP_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.emitWithState("AnswerIntent");
    }
});

function compareSlots(slots, value)
{
    for (var slot in slots)
    {
        if (slots[slot].value != undefined)
        {
            if (slots[slot].value.toString().toLowerCase() == value.toString().toLowerCase())
            {
                return true;
            }
        }
    }
    return false;
}

function getRandom(min, max)
{
    return Math.floor(Math.random() * (max-min+1)+min);
}

function getRandomSymbolSpeech(symbol)
{
    return "<say-as interpret-as='spell-out'>" + symbol + "</say-as>";
}

function getItem(slots)
{
    let propertyArray = Object.getOwnPropertyNames(data[0]);
    let value;

    for (let slot in slots)
    {
        if (slots[slot].value !== undefined)
        {
            value = slots[slot].value;
            for (let property in propertyArray)
            {
                let item = data.filter(x => x[propertyArray[property]].toString().toLowerCase() === slots[slot].value.toString().toLowerCase());
                if (item.length > 0)
                {
                    return item[0];
                }
            }
        }
    }
    return value;
}

function getSpeechCon(type)
{
    let speechCon = "";
    if (type) return "<say-as interpret-as='interjection'>" + speechConsCorrect[getRandom(0, speechConsCorrect.length-1)] + "! </say-as><break strength='strong'/>";
    else return "<say-as interpret-as='interjection'>" + speechConsWrong[getRandom(0, speechConsWrong.length-1)] + " </say-as><break strength='strong'/>";
}

function formatCasing(key)
{
    switch(key)
    {
        case "PrefectureName":
            return "都道府県名";
        case "Romanization":
            return "ローマ字表記";
        case "PrefecturalOfficeLocation":
            return "県庁所在地";
        case "PrefectureFlower":
            return "県の花";
        default: //PrefectureOrder
            return "都道府県コード番号";
    }
}

function getTextDescription(item)
{
    let text = "";

    for (let key in item)
    {
        text += formatCasing(key) + ": " + item[key] + "\n";
    }
    return text;
}

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers, startHandlers, quizHandlers);
    alexa.execute();
};

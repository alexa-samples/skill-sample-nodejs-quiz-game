/* eslint-disable  func-names */
/* eslint-disable  no-console */
/* eslint-disable  no-restricted-syntax */

// IMPORTANT: Please note that this template uses Dispay Directives,
// Display Interface for your skill should be enabled through the Amazon developer console
// See this screenshot - https://alexa.design/enabledisplay

const Alexa = require('ask-sdk-core');

/* INTENT HANDLERS */
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === `LaunchRequest`;
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(welcomeMessage)
      .reprompt(helpMessage)
      .getResponse();
  },
};

const QuizHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    console.log("Inside QuizHandler");
    console.log(JSON.stringify(request));
    return request.type === "IntentRequest" &&
           (request.intent.name === "QuizIntent" || request.intent.name === "AMAZON.StartOverIntent");
  },
  handle(handlerInput) {
    console.log("Inside QuizHandler - handle");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const response = handlerInput.responseBuilder;
    attributes.state = states.QUIZ;
    attributes.counter = 0;
    attributes.quizScore = 0;

    var question = askQuestion(handlerInput);
    var speakOutput = startQuizMessage + question;
    var repromptOutput = question;

    const item = attributes.quizItem;
    const property = attributes.quizProperty;

    if (supportsDisplay(handlerInput)) {
      const title = `第 ${attributes.counter} 問`;
      const primaryText = new Alexa.RichTextContentHelper().withPrimaryText(getQuestionWithoutOrdinal(property, item)).getTextContent();
      const backgroundImage = new Alexa.ImageHelper().addImageInstance(getBackgroundImage(attributes.quizItem.Abbreviation)).getImage();
      const itemList = [];
      getAndShuffleMultipleChoiceAnswers(attributes.selectedItemIndex, item, property).forEach((x, i) => {
        itemList.push(
          {
            "token" : x,
            "textContent" : new Alexa.PlainTextContentHelper().withPrimaryText(x).getTextContent(),
          }
        );
      });
      response.addRenderTemplateDirective({
        type : 'ListTemplate1',
        token : 'Question',
        backButton : 'hidden',
        backgroundImage,
        title,
        listItems : itemList,
      });
    }

    return response.speak(speakOutput)
                   .reprompt(repromptOutput)
                   .getResponse();
  },
};

const DefinitionHandler = {
  canHandle(handlerInput) {
    console.log("Inside DefinitionHandler");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return attributes.state !== states.QUIZ &&
           request.type === 'IntentRequest' &&
           request.intent.name === 'AnswerIntent';
  },
  handle(handlerInput) {
    console.log("Inside DefinitionHandler - handle");
    //GRABBING ALL SLOT VALUES AND RETURNING THE MATCHING DATA OBJECT.
    const item = getItem(handlerInput.requestEnvelope.request.intent.slots);
    const response = handlerInput.responseBuilder;

    //IF THE DATA WAS FOUND
    if (item && item[Object.getOwnPropertyNames(data[0])[0]] !== undefined) {
      if (useCardsFlag) {
        response.withStandardCard(
          getCardTitle(item),
          getTextDescription(item),
          getSmallImage(item),
          getLargeImage(item))
      }

      if(supportsDisplay(handlerInput)) {
        const image = new Alexa.ImageHelper().addImageInstance(getLargeImage(item)).getImage();
        const title = getCardTitle(item);
        const primaryText = new Alexa.RichTextContentHelper().withPrimaryText(getTextDescription(item, "<br/>")).getTextContent();
        response.addRenderTemplateDirective({
          type: 'BodyTemplate2',
          backButton: 'visible',
          image,
          title,
          textContent: primaryText,
        });
      }
      return response.speak(getSpeechDescription(item))
              .reprompt(repromptSpeech)
              .getResponse();
    }
    //IF THE DATA WAS NOT FOUND
    else
    {
      return response.speak(getBadAnswer(item))
              .reprompt(getBadAnswer(item))
              .getResponse();
    }
  }
};

const QuizAnswerHandler = {
  canHandle(handlerInput) {
    console.log("Inside QuizAnswerHandler");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return attributes.state === states.QUIZ &&
           request.type === 'IntentRequest' &&
           request.intent.name === 'AnswerIntent';
  },
  handle(handlerInput) {
    console.log("Inside QuizAnswerHandler - handle");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const response = handlerInput.responseBuilder;

    var speakOutput = ``;
    var repromptOutput = ``;
    const item = attributes.quizItem;
    const property = attributes.quizProperty;
    const isCorrect = compareSlots(handlerInput.requestEnvelope.request.intent.slots, item[property]);

    if (isCorrect) {
      speakOutput = getSpeechCon(true);
      attributes.quizScore += 1;
      handlerInput.attributesManager.setSessionAttributes(attributes);
    } else {
      speakOutput = getSpeechCon(false);
    }

    speakOutput += getAnswer(property, item);
    var question = ``;
    //IF YOUR QUESTION COUNT IS LESS THAN 10, WE NEED TO ASK ANOTHER QUESTION.
    if (attributes.counter < 10) {
      speakOutput += getCurrentScore(attributes.quizScore, attributes.counter);
      question = askQuestion(handlerInput);
      speakOutput += question;
      repromptOutput = question;

      if (supportsDisplay(handlerInput)) {
        const title = `第 ${attributes.counter} 問`;
        const primaryText = new Alexa.RichTextContentHelper().withPrimaryText(getQuestionWithoutOrdinal(attributes.quizProperty, attributes.quizItem)).getTextContent();
        const backgroundImage = new Alexa.ImageHelper().addImageInstance(getBackgroundImage(attributes.quizItem.Abbreviation)).getImage();
        const itemList = [];
        getAndShuffleMultipleChoiceAnswers(attributes.selectedItemIndex, attributes.quizItem, attributes.quizProperty).forEach((x, i) => {
          itemList.push(
            {
              "token" : x,
              "textContent" : new Alexa.PlainTextContentHelper().withPrimaryText(x).getTextContent(),
            }
          );
        });
        response.addRenderTemplateDirective({
          type : 'ListTemplate1',
          token : 'Question',
          backButton : 'hidden',
          backgroundImage,
          title,
          listItems : itemList,
        });
      }
      return response.speak(speakOutput)
      .reprompt(repromptOutput)
      .getResponse();
    }
    else {
      speakOutput += getFinalScore(attributes.quizScore, attributes.counter) + exitSkillMessage;
      if(supportsDisplay(handlerInput)) {
        const title = '遊んでくれてありがとう。';
        const primaryText = new Alexa.RichTextContentHelper().withPrimaryText(getFinalScore(attributes.quizScore, attributes.counter)).getTextContent();
        response.addRenderTemplateDirective({
          type : 'BodyTemplate1',
          backButton: 'hidden',
          title,
          textContent: primaryText,
        });
      }
      return response.speak(speakOutput).getResponse();
    }
  },
};

const RepeatHandler = {
  canHandle(handlerInput) {
    console.log("Inside RepeatHandler");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return attributes.state === states.QUIZ &&
           request.type === 'IntentRequest' &&
           request.intent.name === 'AMAZON.RepeatHandler';
  },
  handle(handlerInput) {
    console.log("Inside RepeatHandler - handle");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const question = getQuestion(attributes.counter, attributes.quizproperty, attributes.quizitem);

    return handlerInput.responseBuilder
      .speak(question)
      .reprompt(question)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    console.log("Inside HelpHandler");
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
           request.intent.name === 'AMAZON.HelpHandler';
  },
  handle(handlerInput) {
    console.log("Inside HelpHandler - handle");
    return handlerInput.responseBuilder
      .speak(helpMessage)
      .reprompt(helpMessage)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    console.log("Inside ExitHandler");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return request.type === `IntentRequest` && (
              request.intent.name === 'AMAZON.StopIntent' ||
              request.intent.name === 'AMAZON.PauseIntent' ||
              request.intent.name === 'AMAZON.CancelIntent'
           );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(exitSkillMessage)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    console.log("Inside SessionEndedRequestHandler");
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    console.log("Inside ErrorHandler");
    return true;
  },
  handle(handlerInput, error) {
    console.log("Inside ErrorHandler - handle");
    console.log(`Error handled: ${JSON.stringify(error)}`);
    console.log(`Handler Input: ${JSON.stringify(handlerInput)}`);

    return handlerInput.responseBuilder
      .speak(helpMessage)
      .reprompt(helpMessage)
      .getResponse();
  },
};

/* CONSTANTS */
const skillBuilder = Alexa.SkillBuilders.custom();
const imagePath = "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/{0}x{1}/{2}._TTH_.png";
const backgroundImagePath = "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/{0}x{1}/{2}._TTH_.png"
const speechConsCorrect = ["あっはっは", "あら", "あらあ", "イェイ", "うっひゃあ", "うっひょう", "うふふ", "おー", "おおー", "おっ", "おめでとう", "乾杯", "そうそう", "は〜い", "はっはっは", "万歳", "ピンポーン", "ほ〜", "やったあ", "やっほう", "ようし", "わ〜い", "わあーっ", "わっしょい"];
const speechConsWrong = ["あ〜あ", "あいたた", "あちゃあ", "あっとー", "ありゃ", "あれれ", "うぅ", "ううっ", "え〜", "おっと", "およよ", "ぎゃあ", "しくしく", "とほほ", "ドンマイ", "ひいっ", "ぶう", "むっ"];

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

const states = {
  START: `_START`,
  QUIZ: `_QUIZ`,
};

const welcomeMessage = `都道府県クイズゲームへようこそ!  47都道府県とそれらの県庁所在地について質問できます。または、クイズを始めることもできます。  何をしますか?`;
const startQuizMessage = `了解です。 都道府県に関する10個のクイズを出します。`;
const exitSkillMessage = `都道府県クイズゲームで遊んでくれてありがとうございます!  また今度遊びましょう!`;
const repromptSpeech = `ほかに、どの都道府県や都市について知りたいですか?`;
const helpMessage = `私は日本の都道府県についてたくさんのことを知っています。  都道府県または都市について聞いてくれれば、わたしが知っていることをお伝えします。  もしくは、「クイズをはじめて」と伝えていただければ、あなたの知識をテストすることもできます。  何をしますか?`;
const useCardsFlag = true;

/* HELPER FUNCTIONS */

// returns true if the skill is running on a device with a display (show|spot)
function supportsDisplay(handlerInput) {
  var hasDisplay =
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display
  return hasDisplay;
}

function getBadAnswer(item) {
  return `すみません。 ${item} は、このスキルの中でわたしがよく知っているものではありません。 ${helpMessage}`;
}

function getCurrentScore(score, counter) {
  return `あなたの今のスコアは ${counter} 点中 ${score} 点です。 `; }

function getFinalScore(score, counter) {
  return `あなたの最終スコアは ${counter} 点中 ${score} 点です。 `;
}

function getCardTitle(item) {
  return item.StateName;
}

function getSmallImage(item) {
  return `https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/720x400/${item.Abbreviation}._TTH_.png`;
}

function getLargeImage(item) {
  return `https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/1200x800/${item.Abbreviation}._TTH_.png`;
}

function getImage(height, width, label) {
  return imagePath.replace("{0}", height)
    .replace("{1}", width)
    .replace("{2}", label);
}

function getBackgroundImage(label, height = 1024, width = 600) {
  return backgroundImagePath.replace("{0}", height)
    .replace("{1}", width)
    .replace("{2}", label);
}

function getSpeechDescription(item) {
  return `${item.StateName} is the ${item.StatehoodOrder}th state, admitted to the Union in ${item.StatehoodYear}.  The capital of ${item.StateName} is ${item.Capital}, and the abbreviation for ${item.StateName} is <break strength='strong'/><say-as interpret-as='spell-out'>${item.Abbreviation}</say-as>.  I've added ${item.StateName} to your Alexa app.  Which other state or capital would you like to know about?`;
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

function getQuestion(counter, property, item) {
  return `第 ${counter} 問です。 ${item.PrefectureName} の ${formatCasing(property)} は何ですか?`;
}

// getQuestionWithoutOrdinal returns the question without the ordinal and is
// used for the echo show.
function getQuestionWithoutOrdinal(property, item) {
  return `${item.PrefectureName} の ${formatCasing(property)} は何ですか?`;
}

function getAnswer(property, item) {
  switch (property)
  {
    case "Romanization":
      return `${item.PrefectureName} の ${formatCasing(property)} は <say-as interpret-as='spell-out'>${item[property]}</say-as>です。 `;
    default:
      return `${item.PrefectureName} の ${formatCasing(property)} は ${item[property]} です。 `;
  }
}

function getRandom(min, max) {
  return Math.floor((Math.random() * ((max - min) + 1)) + min);
}

function askQuestion(handlerInput) {
  console.log("I am in askQuestion()");
  //GENERATING THE RANDOM QUESTION FROM DATA
  const random = getRandom(0, data.length - 1);
  const item = data[random];
  const propertyArray = Object.getOwnPropertyNames(item);
  const property = propertyArray[getRandom(1, propertyArray.length - 1)];

  //GET SESSION ATTRIBUTES
  const attributes = handlerInput.attributesManager.getSessionAttributes();

  //SET QUESTION DATA TO ATTRIBUTES
  attributes.selectedItemIndex = random;
  attributes.quizItem = item;
  attributes.quizProperty = property;
  attributes.counter += 1;

  //SAVE ATTRIBUTES
  handlerInput.attributesManager.setSessionAttributes(attributes);

  const question = getQuestion(attributes.counter, property, item);
  return question;
}

function compareSlots(slots, value) {
  for (const slot in slots) {
    if (Object.prototype.hasOwnProperty.call(slots, slot) && slots[slot].value !== undefined) {
      if (slots[slot].value.toString().toLowerCase() === value.toString().toLowerCase()) {
        return true;
      }
    }
  }

  return false;
}

function getItem(slots) {
  const propertyArray = Object.getOwnPropertyNames(data[0]);
  let slotValue;

  for (const slot in slots) {
    if (Object.prototype.hasOwnProperty.call(slots, slot) && slots[slot].value !== undefined) {
      slotValue = slots[slot].value;
      for (const property in propertyArray) {
        if (Object.prototype.hasOwnProperty.call(propertyArray, property)) {
          const item = data.filter(x => x[propertyArray[property]]
            .toString().toLowerCase() === slots[slot].value.toString().toLowerCase());
          if (item.length > 0) {
            return item[0];
          }
        }
      }
    }
  }
  return slotValue;
}

function getSpeechCon(type) {
  if (type) return `<say-as interpret-as='interjection'>${speechConsCorrect[getRandom(0, speechConsCorrect.length - 1)]}! </say-as><break strength='strong'/>`;
  return `<say-as interpret-as='interjection'>${speechConsWrong[getRandom(0, speechConsWrong.length - 1)]} </say-as><break strength='strong'/>`;
}


function getTextDescription(item) {
  let text = '';

  for (const key in item) {
    if (Object.prototype.hasOwnProperty.call(item, key)) {
      text += `${formatCasing(key)}: ${item[key]}\n`;
    }
  }
  return text;
}

function getAndShuffleMultipleChoiceAnswers(currentIndex, item, property) {
  return shuffle(getMultipleChoiceAnswers(currentIndex, item, property));
}

// This function randomly chooses 3 answers 2 incorrect and 1 correct answer to
// display on the screen using the ListTemplate. It ensures that the list is unique.
function getMultipleChoiceAnswers(currentIndex, item, property) {

  // insert the correct answer first
  let answerList = [item[property]];

  // There's a possibility that we might get duplicate answers
  // 8 states were founded in 1788
  // 4 states were founded in 1889
  // 3 states were founded in 1787
  // to prevent duplicates we need avoid index collisions and take a sample of
  // 8 + 4 + 1 = 13 answers (it's not 8+4+3 because later we take the unique
  // we only need the minimum.)
  let count = 0
  let upperBound = 12

  let seen = new Array();
  seen[currentIndex] = 1;

  while (count < upperBound) {
    let random = getRandom(0, data.length - 1);

    // only add if we haven't seen this index
    if ( seen[random] === undefined ) {
      answerList.push(data[random][property]);
      count++;
    }
  }

  // remove duplicates from the list.
  answerList = answerList.filter((v, i, a) => a.indexOf(v) === i)
  // take the first three items from the list.
  answerList = answerList.slice(0, 3);
  return answerList;
}

// This function takes the contents of an array and randomly shuffles it.
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while ( 0 !== currentIndex ) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

/* LAMBDA SETUP */
exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    QuizHandler,
    DefinitionHandler,
    QuizAnswerHandler,
    RepeatHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

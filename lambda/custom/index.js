/* eslint-disable  func-names */
/* eslint-disable  no-console */
/* eslint-disable  no-restricted-syntax */

// IMPORTANT: Please note that this template uses Dispay Directives,
// Display Interface for your skill should be enabled through the Amazon developer console
// See this screenshot - https://alexa.design/enabledisplay

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {
  'en': require('./languages/en.js'),
};

/* INTENT HANDLERS */
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === `LaunchRequest`;
  },
  handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    return handlerInput.responseBuilder
      .speak(requestAttributes.t('WELCOME_MESSAGE'))
      .reprompt(requestAttributes.t('HELP_MESSAGE'))
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
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    attributes.state = states.QUIZ;
    attributes.counter = 0;
    attributes.quizScore = 0;

    var question = askQuestion(handlerInput);
    var speakOutput = requestAttributes.t('START_QUIZ_MESSAGE') + question;
    var repromptOutput = question;

    const item = attributes.quizItem;
    const property = attributes.quizProperty;

    if (supportsDisplay(handlerInput)) {
      const title = `Question #${attributes.counter}`;
      const primaryText = new Alexa.RichTextContentHelper().withPrimaryText(WithoutOrdinal(property, item)).getTextContent();
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
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

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
      return response.speak(getSpeechDescription(item, handlerInput))
              .reprompt(repromptOutput)
              .getResponse();
    }
    //IF THE DATA WAS NOT FOUND
    else
    {
      return response.speak(requestAttributes.t('GET_BAD_ANSWER'), item, requestAttributes.t('HElP_MESSAGE'))
              .reprompt(requestAttributes.t('GET_BAD_ANSWER'), item, requestAttributes.t('HElP_MESSAGE'))
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

    speakOutput += getAnswer(property, item, handlerInput);
    var question = ``;
    //IF YOUR QUESTION COUNT IS LESS THAN 10, WE NEED TO ASK ANOTHER QUESTION.
    if (attributes.counter < 10) {
      speakOutput += getCurrentScore(attributes.quizScore, attributes.counter, handlerInput);
      question = askQuestion(handlerInput);
      speakOutput += question;
      repromptOutput = question;

      if (supportsDisplay(handlerInput)) {
        const title = `Question #${attributes.counter}`;
        const primaryText = new Alexa.RichTextContentHelper().withPrimaryText(getQuestionWithoutOrdinal(attributes.quizProperty, attributes.quizItem, handlerInput)).getTextContent();
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
      speakOutput += getFinalScore(attributes.quizScore, attributes.counter, handlerInput) + exitSkillMessage;
      if(supportsDisplay(handlerInput)) {
        const title = 'EXIT_SKILL_MESSAGE';
        const primaryText = new Alexa.RichTextContentHelper().withPrimaryText(getFinalScore(attributes.quizScore, attributes.counter, handlerInput)).getTextContent();
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
    const question = getQuestion(attributes.counter, attributes.quizproperty, attributes.quizitem, handlerInput);

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
      .speak('HElP_MESSAGE')
      .reprompt('HElP_MESSAGE')
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
      .speak('HELP_MESSAGE')
      .reprompt('HELP_MESSAGE')
      .getResponse();
  },
};

/* CONSTANTS */
const skillBuilder = Alexa.SkillBuilders.custom();
const imagePath = "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/{0}x{1}/{2}._TTH_.png";
const backgroundImagePath = "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/{0}x{1}/{2}._TTH_.png"
const speechConsCorrect = ['Booya', 'All righty', 'Bam', 'Bazinga', 'Bingo', 'Boom', 'Bravo', 'Cha Ching', 'Cheers', 'Dynomite', 'Hip hip hooray', 'Hurrah', 'Hurray', 'Huzzah', 'Oh dear.  Just kidding.  Hurray', 'Kaboom', 'Kaching', 'Oh snap', 'Phew', 'Righto', 'Way to go', 'Well done', 'Whee', 'Woo hoo', 'Yay', 'Wowza', 'Yowsa'];
const speechConsWrong = ['Argh', 'Aw man', 'Blarg', 'Blast', 'Boo', 'Bummer', 'Darn', "D'oh", 'Dun dun dun', 'Eek', 'Honk', 'Le sigh', 'Mamma mia', 'Oh boy', 'Oh dear', 'Oof', 'Ouch', 'Ruh roh', 'Shucks', 'Uh oh', 'Wah wah', 'Whoops a daisy', 'Yikes'];
const data = [
  {StateName: 'Alabama', Abbreviation: 'AL', Capital: 'Montgomery', StatehoodYear: 1819, StatehoodOrder: 22},
  {StateName: 'Alaska', Abbreviation: 'AK', Capital: 'Juneau', StatehoodYear: 1959, StatehoodOrder: 49},
  {StateName: 'Arizona', Abbreviation: 'AZ', Capital: 'Phoenix', StatehoodYear: 1912, StatehoodOrder: 48},
  {StateName: 'Arkansas', Abbreviation: 'AR', Capital: 'Little Rock', StatehoodYear: 1836, StatehoodOrder: 25},
  {StateName: 'California', Abbreviation: 'CA', Capital: 'Sacramento', StatehoodYear: 1850, StatehoodOrder: 31},
  {StateName: 'Colorado', Abbreviation: 'CO', Capital: 'Denver', StatehoodYear: 1876, StatehoodOrder: 38},
  {StateName: 'Connecticut', Abbreviation: 'CT', Capital: 'Hartford', StatehoodYear: 1788, StatehoodOrder: 5},
  {StateName: 'Delaware', Abbreviation: 'DE', Capital: 'Dover', StatehoodYear: 1787, StatehoodOrder: 1},
  {StateName: 'Florida', Abbreviation: 'FL', Capital: 'Tallahassee', StatehoodYear: 1845, StatehoodOrder: 27},
  {StateName: 'Georgia', Abbreviation: 'GA', Capital: 'Atlanta', StatehoodYear: 1788, StatehoodOrder: 4},
  {StateName: 'Hawaii', Abbreviation: 'HI', Capital: 'Honolulu', StatehoodYear: 1959, StatehoodOrder: 50},
  {StateName: 'Idaho', Abbreviation: 'ID', Capital: 'Boise', StatehoodYear: 1890, StatehoodOrder: 43},
  {StateName: 'Illinois', Abbreviation: 'IL', Capital: 'Springfield', StatehoodYear: 1818, StatehoodOrder: 21},
  {StateName: 'Indiana', Abbreviation: 'IN', Capital: 'Indianapolis', StatehoodYear: 1816, StatehoodOrder: 19},
  {StateName: 'Iowa', Abbreviation: 'IA', Capital: 'Des Moines', StatehoodYear: 1846, StatehoodOrder: 29},
  {StateName: 'Kansas', Abbreviation: 'KS', Capital: 'Topeka', StatehoodYear: 1861, StatehoodOrder: 34},
  {StateName: 'Kentucky', Abbreviation: 'KY', Capital: 'Frankfort', StatehoodYear: 1792, StatehoodOrder: 15},
  {StateName: 'Louisiana', Abbreviation: 'LA', Capital: 'Baton Rouge', StatehoodYear: 1812, StatehoodOrder: 18},
  {StateName: 'Maine', Abbreviation: 'ME', Capital: 'Augusta', StatehoodYear: 1820, StatehoodOrder: 23},
  {StateName: 'Maryland', Abbreviation: 'MD', Capital: 'Annapolis', StatehoodYear: 1788, StatehoodOrder: 7},
  {StateName: 'Massachusetts', Abbreviation: 'MA', Capital: 'Boston', StatehoodYear: 1788, StatehoodOrder: 6},
  {StateName: 'Michigan', Abbreviation: 'MI', Capital: 'Lansing', StatehoodYear: 1837, StatehoodOrder: 26},
  {StateName: 'Minnesota', Abbreviation: 'MN', Capital: 'St. Paul', StatehoodYear: 1858, StatehoodOrder: 32},
  {StateName: 'Mississippi', Abbreviation: 'MS', Capital: 'Jackson', StatehoodYear: 1817, StatehoodOrder: 20},
  {StateName: 'Missouri', Abbreviation: 'MO', Capital: 'Jefferson City', StatehoodYear: 1821, StatehoodOrder: 24},
  {StateName: 'Montana', Abbreviation: 'MT', Capital: 'Helena', StatehoodYear: 1889, StatehoodOrder: 41},
  {StateName: 'Nebraska', Abbreviation: 'NE', Capital: 'Lincoln', StatehoodYear: 1867, StatehoodOrder: 37},
  {StateName: 'Nevada', Abbreviation: 'NV', Capital: 'Carson City', StatehoodYear: 1864, StatehoodOrder: 36},
  {StateName: 'New Hampshire', Abbreviation: 'NH', Capital: 'Concord', StatehoodYear: 1788, StatehoodOrder: 9},
  {StateName: 'New Jersey', Abbreviation: 'NJ', Capital: 'Trenton', StatehoodYear: 1787, StatehoodOrder: 3},
  {StateName: 'New Mexico', Abbreviation: 'NM', Capital: 'Santa Fe', StatehoodYear: 1912, StatehoodOrder: 47},
  {StateName: 'New York', Abbreviation: 'NY', Capital: 'Albany', StatehoodYear: 1788, StatehoodOrder: 11},
  {StateName: 'North Carolina', Abbreviation: 'NC', Capital: 'Raleigh', StatehoodYear: 1789, StatehoodOrder: 12},
  {StateName: 'North Dakota', Abbreviation: 'ND', Capital: 'Bismarck', StatehoodYear: 1889, StatehoodOrder: 39},
  {StateName: 'Ohio', Abbreviation: 'OH', Capital: 'Columbus', StatehoodYear: 1803, StatehoodOrder: 17},
  {StateName: 'Oklahoma', Abbreviation: 'OK', Capital: 'Oklahoma City', StatehoodYear: 1907, StatehoodOrder: 46},
  {StateName: 'Oregon', Abbreviation: 'OR', Capital: 'Salem', StatehoodYear: 1859, StatehoodOrder: 33},
  {StateName: 'Pennsylvania', Abbreviation: 'PA', Capital: 'Harrisburg', StatehoodYear: 1787, StatehoodOrder: 2},
  {StateName: 'Rhode Island', Abbreviation: 'RI', Capital: 'Providence', StatehoodYear: 1790, StatehoodOrder: 13},
  {StateName: 'South Carolina', Abbreviation: 'SC', Capital: 'Columbia', StatehoodYear: 1788, StatehoodOrder: 8},
  {StateName: 'South Dakota', Abbreviation: 'SD', Capital: 'Pierre', StatehoodYear: 1889, StatehoodOrder: 40},
  {StateName: 'Tennessee', Abbreviation: 'TN', Capital: 'Nashville', StatehoodYear: 1796, StatehoodOrder: 16},
  {StateName: 'Texas', Abbreviation: 'TX', Capital: 'Austin', StatehoodYear: 1845, StatehoodOrder: 28},
  {StateName: 'Utah', Abbreviation: 'UT', Capital: 'Salt Lake City', StatehoodYear: 1896, StatehoodOrder: 45},
  {StateName: 'Vermont', Abbreviation: 'VT', Capital: 'Montpelier', StatehoodYear: 1791, StatehoodOrder: 14},
  {StateName: 'Virginia', Abbreviation: 'VA', Capital: 'Richmond', StatehoodYear: 1788, StatehoodOrder: 10},
  {StateName: 'Washington', Abbreviation: 'WA', Capital: 'Olympia', StatehoodYear: 1889, StatehoodOrder: 42},
  {StateName: 'West Virginia', Abbreviation: 'WV', Capital: 'Charleston', StatehoodYear: 1863, StatehoodOrder: 35},
  {StateName: 'Wisconsin', Abbreviation: 'WI', Capital: 'Madison', StatehoodYear: 1848, StatehoodOrder: 30},
  {StateName: 'Wyoming', Abbreviation: 'WY', Capital: 'Cheyenne', StatehoodYear: 1890, StatehoodOrder: 44},
];

const states = {
  START: `_START`,
  QUIZ: `_QUIZ`,
};

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


function getCurrentScore(score, counter, handlerInput) {
  const attributesManager = handlerInput.attributesManager;
  const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

  return requestAttributes.t('GET_CURRENT_SCORE', score, counter);
}

function getFinalScore(score, counter, handlerInput) {
  const attributesManager = handlerInput.attributesManager;
  const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

  return requestAttributes.t('GET_FINAL_SCORE', score, counter);
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

function getSpeechDescription(item, handlerInput) {
  const attributesManager = handlerInput.attributesManager;
  const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

  return requestAttributes.t('GET_SPEECH_DESCRIPTION', item.StateName, item.StatehoodOrder, item.StatehoodYear, item.StateName, item.Capital, item.StateName, item.Abbreviation, item.StateName);
}

function formatCasing(key) {
  return key.split(/(?=[A-Z])/).join(' ');
}

function getQuestion(counter, property, item, handlerInput) {
  const attributesManager = handlerInput.attributesManager;
  const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

  return requestAttributes.t('GET_QUESTION', counter, formatCasing(property), item.StateName);
}

// getQuestionWithoutOrdinal returns the question without the ordinal and is
// used for the echo show.
function getQuestionWithoutOrdinal(property, item, handlerInput) {
  const attributesManager = handlerInput.attributesManager;
  const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

  return requestAttributes.t(`GET_QUESTION_WITHOUT_ORDINAL`, formatCasing(property).toLowerCase(), item.StateName);
}

function getAnswer(property, item, handlerInput) {
  const attributesManager = handlerInput.attributesManager;
  const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

  switch (property, requestAttributes) {
    case 'Abbreviation':
      return requestAttributes.t(`GET_ANSWER_ABBREVIATION`, formatCasing(property), item.StateName, item[property]);
    default:
      return requestAttributes.t(`GET_ANSWER`, formatCasing(property).toLowerCase(), item.StateName, item[property]);
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

  const question = getQuestion(attributes.counter, property, item, handlerInput);
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

const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      resources: languageStrings,
    });
    localizationClient.localize = function localize() {
      const args = arguments;
      const values = [];
      for (let i = 1; i < args.length; i += 1) {
        values.push(args[i]);
      }
      const value = i18n.t(args[0], {
        returnObjects: true,
        postProcess: 'sprintf',
        sprintf: values,
      });
      if (Array.isArray(value)) {
        return value[Math.floor(Math.random() * value.length)];
      }
      return value;
    };
    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function translate(...args) {
      return localizationClient.localize(...args);
    };
  },
};

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
  .addRequestInterceptors(LocalizationInterceptor)
  .addErrorHandlers(ErrorHandler)
  .lambda();

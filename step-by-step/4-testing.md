# Build An Alexa Quiz Game Skill
<a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/navigation/1-locked._TTH_.png" /></a><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/navigation/spacer._TTH_.png" /><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/2-lambda-function.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/navigation/2-locked._TTH_.png" /></a><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/navigation/spacer._TTH_.png" /><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/3-connect-vui-to-code.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/navigation/3-locked._TTH_.png" /></a><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/navigation/spacer._TTH_.png" /><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/4-testing.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/navigation/4-on._TTH_.png" /></a><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/navigation/spacer._TTH_.png" /><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/5-customization.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/navigation/5-off._TTH_.png" /></a><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/navigation/spacer._TTH_.png" /><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/6-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/navigation/6-off._TTH_.png" /></a>

## Testing Your Alexa Skill

So far, we have [created a Voice User Interface](https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/1-voice-user-interface.md) and [a Lambda function](https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/2-lambda-function.md), and [connected the two together](https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/3-connect-vui-to-lambda.md).  We're now at the point where we want to verify that everything is working as we expect.

1.  **Go back to the [Amazon Developer Portal](https://developer.amazon.com/edw/home.html#/skills/list) and select your skill from the list.** You may still have a browser tab open if you started at the beginning of this tutorial.

2.  **Open the "Test" tab on the left side.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/4-2-test-tab._TTH_.png" />

3.  **Understand the voice simulator.** While it's not specific to your skill, the Voice Simulator is an incredibly valuable testing tool for every skill.  Type a word into the box, and click the "Listen" button to hear how Alexa will pronounce it.  If you need to make changes to her pronounciation, there is an entire markup language, [Speech Synthesis Markup Language (SSML)](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference), that can modify how Alexa will interpret your text for speech.  Try these examples:

    ```html
    <say-as interpret-as="number">12345</say-as>
    ```

    ```html
    <say-as interpret-as="ordinal">12345</say-as>
    ```

    ```html
    <say-as interpret-as="digits">12345</say-as>
    ```

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/4-3-voice-simulator._TTH_.png" />

    You will find yourself coming back to this Voice Simulator to make sure Alexa says things the way that you expect.

4.  **Test your skill with the Service Simulator.** To validate that your skill is working as expected, you can use the Service Simulator.  Using the text box provided, type in the name of your favorite U.S. state.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/4-4-service-simulator._TTH_.png" />

    ### Service Simulator Tips
    * After clicking the "Ask [Your Skill Name]" button, you should see the **Lambda Request** and **Lambda Response** boxes get populated with JSON data like in the screenshot above.
    * You can listen to Alexa's response by clicking the "Listen" button in the bottom right corner of the response.
    * You can have an entire conversation with your skill with the Service Simulator.  Try the following commands:
        * Start a quiz
        * [Press the listen button, and answer the first question in the box]
        * [Press the listen button, and answer the second question in the box]
        * (Continue this process for the entire quiz. To start over, click the "Reset" button.)
    * If you receive a response that reads: "The remote endpoint could not be called, or the response it returned was invalid," this is an indication that something is broken, and an opportunity to learn about another testing tool in Lambda.

5.  **Configure a test event in Lambda.** Now that you are familiar with the **request** and **response** boxes in the Service Simulator, it's important for you to know that you can use your **requests** to directly test your Lambda function every time you update it.  To do this:
    1.  Create & copy a new response with the Service Simulator, or grab the sample text from the box below:

        ```JAVASCRIPT
        {
            "session": {
                "sessionId": "SessionId.457b2d2e-5014-491a-b727-40c9484e35c0",
                "application": {
                "applicationId": "amzn1.ask.skill.3065652a-aeba-475c-870a-a2288d761637"
                },
                "attributes": {},
                "user": {
                "userId": "amzn1.ask.account.AENLL2Z6RE7QK6242NGYH7C4ATZ5BGNLUWOQOFMEDSFL7N3Y4VFWTPFFG4SJ73WLURBECZTF6ITOAQKP5MEKL2DCS736VXURRP22AEPF67BQRKJ3BSNNWTLEZPXXG6PYG56LQTMOD6UB24OFF5RRTLK2EYGKRL3VEEV24UBZVVTQNJ6SSWYKMQGUQUNRPX72HY24K2OZLWR5Y3Q"
                },
                "new": true
            },
            "request": {
                "type": "IntentRequest",
                "requestId": "EdwRequestId.dfd1d8f6-1bab-49cd-b4c9-fbba2f522d11",
                "locale": "en-US",
                "timestamp": "2017-02-27T19:28:31Z",
                "intent": {
                "name": "AnswerIntent",
                "slots": {
                    "Abbreviation": {
                    "name": "Abbreviation"
                    },
                    "StatehoodYear": {
                    "name": "StatehoodYear"
                    },
                    "StateName": {
                    "name": "StateName",
                    "value": "Ohio"
                    },
                    "Capitol": {
                    "name": "Capitol"
                    },
                    "StatehoodOrder": {
                    "name": "StatehoodOrder"
                    }
                }
                }
            },
            "version": "1.0"
        }
        ```

    2.  **Open your Lambda function in AWS, open the Actions menu, and select "Configure Test Event."**

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/4-5-2-configure-test-event._TTH_.png" />

    3.  **Choose "Alexa Start Session" from the Sample Event Template dropdown list.** You can really choose any of these, as they are just templated event requests, but using "Alexa Start Session" is an easy one to remember.  This will also be the sample request that fires every time you update and "Save and Test" your Lambda code.

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/4-5-3-alexa-start-session._TTH_.png" />

    4.  **Delete the contents of the box, and paste your request from step #1 into the box.**

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/4-5-4-paste-request._TTH_.png" />

    5.  **Click the "Save and test" button.** This will save your test event, and run it against your Lambda function.
    
        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/4-5-5-save-and-test._TTH_.png" />
        
        This gives you visibility into four things:

        *  **Your response, listed in the "Execution Result."**

           <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/4-5-5-1-execution-result._TTH_.png" />

        *  **A Summary of the statistics for your request.** This includes things like duration, resources, and memory used.

           <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/4-5-5-2-summary._TTH_.png" />

        *  **Log output.**  By effectively using console.log() statements in your Lambda code, you can track what is happening inside your function, and help to figure out what is happening when something goes wrong.  You will find the log to be incredibly valuable as you move into more advanced skills.
        
           <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/4-5-5-3-log-output._TTH_.png"/>

        *  **A link to your [CloudWatch](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:) logs for this function.**  This will show you **all** of the responses and log statements from every user interaction.  Very useful, especially when you are testing your skill from a device with your voice.  (It is the "[Click here](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:)" link in the Log Output description.)

6.  **Other testing methods to consider:**

    *  [Echosim.io](http://echosim.io) - a browser-based Alexa device that makes it easy to test your skills without carrying a physical device everywhere you go.
    *  [Unit Testing with Alexa](/unit-testing.md) - a modern approach to unit testing your Alexa skills with [Postman](http://getpostman.com) and [AWS API Gateway](http://aws.amazon.com/apigateway).

7.  **If your sample skill is working properly, you can move on to Step #5: Customization.**

<br/><br/>
<a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/5-customization.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_customization._TTH_.png" /></a>




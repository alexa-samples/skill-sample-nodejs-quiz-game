# Build An Alexa Quiz Game Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-off._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/1-voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-off._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/2-lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-off._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/3-connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/4-testing.md)[![Customization](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/5-customization.md)[![Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/6-publication.md)

<!--<a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-off._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/2-lambda-function.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-off._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/3-connect-vui-to-code.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-off._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/4-testing.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/5-customization.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/6-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png" /></a>-->

## What You Will Learn
*  [AWS Lambda](http://aws.amazon.com/lambda)
*  [Alexa Skills Kit (ASK)](https://developer.amazon.com/alexa-skills-kit)
*  Voice User Interface (VUI) Design
*  Skill Certification
*  State Management
*  [Speechcons](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference)

## What You Will Need
*  [Amazon Developer Portal Account](http://developer.amazon.com)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](https://github.com/alexa/skill-sample-nodejs-quiz-game).
*  Simple graphical editing tool
*  At least 25 rows of interesting data to quiz your users with.
   *  Examples: [U.S. States](https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/data/STATES.js), [Sports Teams](https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/data/SPORTSTEAMS.js), [Video Games](https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/data/VIDEOGAMES.js), [Books](https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/data/BOOKS.js)

## What Your Skill Will Do
Everyone has some interesting data in their head.  Maybe it's a list of all of the action figures you played with as a kid, specific details about the 50 states, or a historical list of the starting quarterbacks for your favorite football team.  When we're hanging out with our friends, sometimes we'll even quiz each other on these nuanced categories of information.  It's a fun, interactive way to share your knowledge with others, and it's always enjoyable to learn more about a topic you're passionate about.

This new Alexa skill template helps you create a quiz for exactly that kind of information.  Not only that, but this skill can also be used as a reference guide.  In addition to being able to quiz a user about your data, Alexa will be able to answer questions like:

*  "Alexa, ask United States Quiz about Ohio."
*  "Alexa, ask Hockey Quiz about Wayne Gretzky."
*  "Alexa, ask Video Game Quiz about River City Ransom."

You get to provide the data, as well as the number of properties in that data, and Alexa will dynamically build a quiz game for you.  In the quiz, Alexa will ask questions like:

*  "What is the capital of Vermont?"
*  "How many career home runs did Mickey Mantle hit?"
*  "What year was Harry Potter and the Sorcerer's Stone first published?"

We've also included a new feature for Alexa skill development: [speechcons](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference).  Speechcons are special words and phrases that Alexa pronounces more expressively.  We use them in this quiz game to let the user know whether they gave a correct or incorrect answer during the quiz.

If you would like to see an example of this skill in action, you can enable the [United States Quiz](https://www.amazon.com/Jeff-Blankenburg-United-States-Quiz/dp/B06X9GQBRL) from the [Alexa app](http://amazon.com/skills).  You may not get all of the answers right on your first try, but you'll definitely get a great feel for what your new quiz game could be like!

<a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_get_started._TTH_.png" /></a>

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>















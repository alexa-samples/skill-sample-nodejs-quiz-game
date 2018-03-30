# Build An Alexa Quiz Game Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/header._TTH_.png" />

[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-off._TTH_.png)](1-voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-off._TTH_.png)](2-lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-off._TTH_.png)](3-connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png)](4-testing.md)[![Customization](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png)](5-customization.md)[![Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](6-publication.md)


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
   *  Examples: [U.S. States](.data/states.js), [Video Games](.data/videogames.js), [Books](data/books.js), [British Monarchs](data/monarchs.js)

## What Your Skill Will Do
We all hold interesting data in our heads. Maybe it's a list of all the action figures we played with as a kid, specific details about the 50 states, or a historical list of the starting quarterbacks for our favorite football team. When we're with friends, sometimes we'll even quiz each other on these nuanced categories of information. It's a fun, interactive way to share our knowledge and learn more about our favorite topics.

You can now bring that experience to Alexa using our new quiz skill template. You provide the data and the number of properties in that data, and Alexa will dynamically build a quiz game for you. In the quiz, Alexa will ask questions like:
*  "What is the capital of Vermont?"
*  "How many career home runs did Mickey Mantle hit?"
*  "What year was Harry Potter and the Sorcerer's Stone first published?"

You get to provide the data, as well as the number of properties in that data, and Alexa will dynamically build a quiz game for you.  In the quiz, Alexa will ask questions like:
*  "Alexa, ask United States Quiz about Ohio."
*  "Alexa, ask Hockey Quiz about Wayne Gretzky."
*  "Alexa, ask Video Game Quiz about River City Ransom."

If you’re in the US, we've also included the new [speechcons](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference) feature for Alexa skill development. Speechcons are special words and phrases that Alexa pronounces more expressively. We use them in this quiz game to let the user know whether they gave a correct or incorrect answer during the quiz.

<p align='center'>
<a href='./1-voice-user-interface.md'><img src='https://camo.githubusercontent.com/db9b9ce26327ad3bac57ec4daf0961a382d75790/68747470733a2f2f6d2e6d656469612d616d617a6f6e2e636f6d2f696d616765732f472f30312f6d6f62696c652d617070732f6465782f616c6578612f616c6578612d736b696c6c732d6b69742f7475746f7269616c732f67656e6572616c2f627574746f6e732f627574746f6e5f6765745f737461727465642e5f5454485f2e706e67'></a>
</p>

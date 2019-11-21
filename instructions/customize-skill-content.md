# Build An Alexa Quiz Game Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

Build an engaging skill that quizes a user with facts about any topic. Alexa will quiz the user with these facts at random and test their knowledge.

## Customize the Skill to be Yours

At this point, you should have a working copy of our Quiz Game skill.  In order to make it your own, you will need to customize it with data and responses that you create.  Here are the things you will need to change:

1.  **New sentences to respond to your users.** There are several sentences and responses that you will want to customize for your skill.

    1. Navigate to the **Code** tab again, and expand the project folder on the left to `Skill Code/lambda`.

    2. Open **[index.js](../lambda/custom/index.js)**

    3. We are going to be focusing on the contents of lines `358-362`, which contain the response strings used by the Skill. In this example, we are going to change the `exitSkillMessage`, said when the user is exiting the skill, to "Thanks for playing, come back later to test your knowledge!". This would result in the following change:

    Before:
     ```js
    const welcomeMessage = `Welcome to the United States Quiz Game!  You can ask me about any of the fifty states and their capitals, or you can ask me to start a quiz.  What would you like to do?`;
    const startQuizMessage = `OK.  I will ask you 10 questions about the United States. `;
    const exitSkillMessage = `Thank you for playing the United States Quiz Game!  Let's play again soon!`;
    const repromptSpeech = `Which other state or capital would you like to know about?`;
    const helpMessage = `I know lots of things about the United States.  You can ask me about a state or a capital, and I'll tell you what I know.  You can also test your knowledge by asking me to start a quiz.  What would you like to do?`;
    ```

    After:
     ```js
    const welcomeMessage = `Welcome to the United States Quiz Game!  You can ask me about any of the fifty states and their capitals, or you can ask me to start a quiz.  What would you like to do?`;
    const startQuizMessage = `OK.  I will ask you 10 questions about the United States. `;
    const exitSkillMessage = `Thanks for playing, come back later to test your knowledge!`; // <-- CHANGED
    const repromptSpeech = `Which other state or capital would you like to know about?`;
    const helpMessage = `I know lots of things about the United States.  You can ask me about a state or a capital, and I'll tell you what I know.  You can also test your knowledge by asking me to start a quiz.  What would you like to do?`;
    ```

     After you're done editing all of the files necessary, as before, make sure to press **Save**, **Deploy**, and navigate back to the **Testing** tab. When you relaunch the quiz skill and exit, Alexa will say "Thanks for playing, come back later to test your knowledge!" instead of "Thank you for playing the United States Quiz Game! Let's play again soon!". You can edit more than just the `exitSkillMessage`, so feel free to customize all of the messages to make it your own!

2.  **New language.** If you are creating this skill for another language other than English, you will need to make sure Alexa's responses are also in that language.

    - For example, if you are creating your skill in German, every single response that Alexa makes has to be in German. You can't use English responses or your skill will fail certification.

3. **Once you have customized the skill's data, languages and/or sentences, return to the [Amazon Developer Portal](https://developer.amazon.com/alexa/console/ask?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Survey&sc_detail=fact-nodejs-V2_GUI-5&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Survey_fact-nodejs-V2_GUI-5_Convert_WW_beginnersdevs&sc_segment=beginnersdevs) and select your skill from the list.**

4.  **Click on "Distribution" in the top navigation to move on to the publishing and certification of your skill.**


[![Next](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_publication._TTH_.png)](./submit-for-certification.md)


# Build An Alexa Quiz Game Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

## Customize the Skill to be Yours

At this point, you should have a working copy of our Quiz Game skill.  In order to make it your own, you will need to customize it with data and responses that you create.  Here are the things you will need to change:

1.  **New data.** You will need to provide a set of quiz game for your topic.  We recommend a minimum of 25, but a total closer to 100 offers a better experience.

    1.  **Open a copy of index.js.** If you haven't already downloaded the code for this project, you can find a copy of index.js [here](../lambda/custom/index.js).  You can use a simple, lightweight code editor like [Atom](http://atom.io), [Sublime Text](http://sublimetext.com), or [VSCode](http://code.visualstudio.com), but you also have the option to edit the code directly in your Alexa-hosted or AWS-hosted Lambda function.

    2.  **Search for the comment "TODO: Replace this data with your own."**  This is the data for our skill.  You can see that it is a simple list of facts.

    3.  **When you have replaced the data in index.js, copy the contents of your file to your Lambda function.**  This should be as done in the same way as when you first created the skill (if you're not editing directly).

2.  **New sentences to respond to your users.** There are several sentences and responses that you will want to customize for your skill.

    1.  **Go back to your copy of [index.js](../lambda/custom/index.js).**

    2.  **Look for the comment "TODO: The items below this comment need your attention."** This is the beginning of the section where you need to customize several text strings for your skill.

    3.  **Continue through index.js until you reach the bottom of the file.**  This will ensure that you cover each of the values that you need to update.

3.  **New language.** If you are creating this skill for another language other than English, you will need to make sure Alexa's responses are also in that language.

    *  For example, if you are creating your skill in German, every single response that Alexa makes has to be in German.  You can't use English responses or your skill will fail certification.

4.  **Once you have made the updates listed on this page, you can click "Next" to move on to Publishing and Certification of your skill.**

[![Next Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_publication._TTH_.png)](./submit-for-certification.md)

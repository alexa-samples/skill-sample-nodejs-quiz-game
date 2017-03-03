# Build An Alexa Quiz Game Skill
<a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/navigation/1-locked._TTH_.png" /></a><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/navigation/spacer._TTH_.png" /><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/2-lambda-function.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/navigation/2-locked._TTH_.png" /></a><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/navigation/spacer._TTH_.png" /><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/3-connect-vui-to-code.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/navigation/3-locked._TTH_.png" /></a><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/navigation/spacer._TTH_.png" /><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/4-testing.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/navigation/4-locked._TTH_.png" /></a><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/navigation/spacer._TTH_.png" /><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/5-customization.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/navigation/5-on._TTH_.png" /></a><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/navigation/spacer._TTH_.png" /><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/6-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/navigation/6-off._TTH_.png" /></a>

## Customize the Skill to be Yours

At this point, you should have a working copy of our United States Quiz Game skill.  In order to make it your own, you will need to customize it and make it your own.  Here are the things you will need to change:

1.  **New data.** You will need to create a new dataset for your skill that *isn't* the 50 United States of America.  If you are looking for an idea, check out [Wikipedia's List of Lists of Lists](https://en.wikipedia.org/wiki/List_of_lists_of_lists).

    1.  **Open a copy of index.js.** If you haven't already downloaded the code for this project, [you can find a copy of index.js here on GitHub](/src/index.js).  You can use a simple, lightweight code editor like [Atom](http://atom.io), [Sublime Text](http://sublimetext.com), or [VSCode](http://code.visualstudio.com), but you also have the option to edit the code directly in your Lambda function.

    2.  **Scroll to the bottom, and search for the comment "TODO: Replace this data with your own."**  This is the data for our skill.  You can see that there is a row for each state, represented by five data values: **StateName**, **Abbreviation**, **Capitol**, **StatehoodYear**, and **StatehoodOrder**.

        You can provide as few or as many properties for your data as you would like, but we recommend a minimum of three to keep your skill interesting.  (Two is the fewest that will make any sense for a quiz.)  You should provide at least 25 rows of data for your quiz by replacing the data that we provided with the content you want to create a quiz for.  To see a few other examples of appropriate data structures, we have created a few other sample data sets for your review.

        *  [Sports Teams](https://github.com/alexa/skill-sample-nodejs-quiz-game-staging/blob/master/data/SPORTSTEAMS.js)
        *  [Video Games](https://github.com/alexa/skill-sample-nodejs-quiz-game-staging/blob/master/data/VIDEOGAMES.js)
        *  [Books](https://github.com/alexa/skill-sample-nodejs-quiz-game-staging/blob/master/data/BOOKS.js)
        
    3.  **Consider using built-in slot values.** We recommend considering data from the built-in slot values that Amazon provides for us to use.  You still need to build your entire dataset, but using values from the built-in slots will make your work in the next few steps easier.  We have provided a few examples below, but you can see the [entire list of built-in slot values here](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#list-types).

        | Slot Name | Description | Sample Values | Supported Languages |
        | --------- | ----------- | ------------- | ------------------- |
        | [AMAZON.Actor](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#actor) | Names of actors and actresses | Alan Rickman, Amy Adams, Daniel Radcliffe, Emma Watson | US |
        | [AMAZON.Airline](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#airline) | Name of a variety of airlines | Alaska Airlines, British Airways, Dolphin Air, Maestro | US |
        | [AMAZON.Animal](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#animal) | Names of many different animals | blister beetle, common frog, moray eel, opossum, spider monkey | US |
        | [AMAZON.Comic](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#comic) | Titles of comic books | Justice League, Runaways, The Amazing Spiderman, Watchmen, X-Men | US |
        | [AMAZON.EUROPE_CITY](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#europe_city) | European and world cities | Kempten, Loures, Paris, London, Barcelona | US, UK, DE |
        | [AMAZON.Sport](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#sport) | Names of sports | basketball, college football, football, gymnastics, team handball | US |
        | [AMAZON.VideoGame](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#videogame) | Titles of video games | Doom Two, Lemmings, The Sims, Worms | US |

    4.  **Once you have your data, here's a few things to remember as we move forward:**

        *  **Alexa will read your property names, so each property name should be readable in your questions.**  These names are also used in **cards** in the Alexa app, so you should capitalize the first letter of each word.  The skill will automatically separate words and add spaces as necessary.
        *  **The first property in each item is typically used in the questions.** For example, in the U.S state data, most of the questions ask things like "What is the capital of Ohio?", where "capital" came from the property name, and "Ohio" was the first property.  (You can customize this for your skill.)  Otherwise, the order does not matter at all.

    5.  **When you have replaced the data in index.js, copy the contents of your file to your Lambda function.**  This should be as simple as copying the text, and pasting it into the code box for your Lambda.

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/5-1-5-lambda-code-box._TTH_.png" />

2.  **New Interaction Model for your AnswerIntent.** If your data is changing, then the type of data you receive from your users probably needs to change as well.

    1.  **Open your skill in the Developer Portal, and go to the Interaction Model tab.**

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/5-2-1-interaction-model._TTH_.png" />

    2.  **Update the slot values for AnswerIntent in your Intent Schema** In our [original intent schema](https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master//speech-assets/intentSchema.json), we defined a slot for each property in our data, and they had the exact same names as the properties of our data.  You should do the same with your intent schema.

        ### Tips for Your Intent Schema

        *  **Make sure you have a slot for every property in your data.**  
        *  **Use built-in slot values when possible.** This will generally make your life easier, but if you need a custom slot, they're easy to make.  You should have noticed that we created one custom slot for our U.S. states quiz for US state abbreviations.
        
    3.  **Create any new custom slots you need.** You will need a custom slot for every data value that you can't use a built-in slot value for.  While a custom slot doesn't need to be every possible value, it certainly helps to make the list as representative of your expected data as possible.

    4.  **Update your sample utterances.** There is a sample utterance for AnswerIntent for each data type we created.  You need to update this list of utterances to represent your data structure instead.

        *  **Remember that if you are creating this skill for a language other than English, your sample utterances need to be written in that language, not English.

    5.  **Click the "Save" button when you have completed.**

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/5-2-5-save-button._TTH_.png" />

3.  **New sentences to respond to your users.** There are several sentences and responses that you will want to customize for your skill.

    1.  **Go back to your copy of index.js.**

    2.  **Look for the comment "TODO: Evenrything below this comment needs your attention."** This is the beginning of the section where you need to customize several text strings for your skill.  Rather than document all of them here, we have left comments in index.js to help you understand the purpose of each one.

    3.  **Continue through index.js until you reach the bottom of the file.**  This will ensure that you cover each of the values that you need to update.

4.  **New language.** If you are creating this skill for another language other than English, you will need to make sure Alexa's responses are also in that language.

    *  For example, if you are creating your skill in German, every single response that Alexa makes has to be in German.  You can't use English responses or your skill will fail certification.

5.  **Once you have made the updates listed on this page, you can click "Next" to move on to Publishing and Certification of your skill.**

    <a href="6-certification.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/3-7-next-button._TTH_.png" /></a>

<br/><br/>
<a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/6-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_publication._TTH_.png" /></a>



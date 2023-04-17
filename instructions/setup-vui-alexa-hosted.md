# Build An Alexa Quiz Game Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

Build an engaging skill that quizes a user with facts about any topic. Alexa will quiz the user with these facts at random and test their knowledge.

## Setting up Your Alexa Skill in the Developer Console (Alexa Hosted)

With an Alexa-hosted skill, you can build, edit, and publish a skill without leaving the developer console.
The skill includes a code editor for managing and deploying the backend code for your skill.
For details on what the Alexa-Hosted skills service provides, open [this page](https://developer.amazon.com/docs/hosted-skills/build-a-skill-end-to-end-using-an-alexa-hosted-skill.html) in a new tab.

### Steps
Now that you've chosen Alexa-Hosted for the method to host your skill's backend resources, to use this template, 
1. Select "Custom" as a model
2. Select "Alexa-hosted (Node.js)"
3. Click "Next"
4. Click "Import Skill"
5. Copy and past https://github.com/alexa-samples/skill-sample-nodejs-quiz-game
6. Click "Import"
It will take a minute to create your Alexa hosted skill, then you will be taken to the Build tab of the console. It will take a minute to create your Alexa hosted skill, then you will be taken to the Build tab of the console.


 #### Build the Interaction Model for your skill

The Interaction Model for any skill lays the general guidelines of speech Alexa will listen for, including any additional information it may need to gather (ex: Slot Values). If you want to learn more about the Interaction Model and how it works, make sure to check out [the ASK Documentation on Creating an Interaction Model](https://developer.amazon.com/docs/custom-skills/create-the-interaction-model-for-your-skill.html).

- If you want to change the skill invocation name, select the **Build** tab, then **Invocation** under **Interaction Model**. Enter a **Skill Invocation Name**. This is the name that your users will need to say to start your skill.
- Click "Build Model".


#### NEXT: Review and Deploy the Alexa-Hosted Code
[![Next](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/next._TTH_.png)](./create-alexa-hosted-function.md)


// Copyright <YEAR> Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Licensed under the Amazon Software License
// http://aws.amazon.com/asl/

module.exports = {
  translation: {
    WELCOME_MESSAGE: `Welcome to the United States Quiz Game!  You can ask me about any of the fifty states and their capitals, or you can ask me to start a quiz.  What would you like to do?`,
    START_QUIZ_MESSAGE: `OK.  I will ask you 10 questions about the United States. `,
    GET_SPEECH_DESCRIPTION: `%s is the %sth state, admitted to the Union in %s.  The capital of %s is %s, and the abbreviation for %s is <break strength='strong'/><say-as interpret-as='spell-out'>%s</say-as>.  I've added %s to your Alexa app.  Which other state or capital would you like to know about?`,
    GET_QUESTION: `Here is your %sth question.  What is the %s of %s?`,
    GET_QUESTION_WITHOUT_ORDINAL; `What is the %s of %s?`,
    EXIT_SKILL_MESSAGE: `Thank you for playing the United States Quiz Game!  Let's play again soon!`,
    GET_BAD_ANSWER: `I'm sorry. %s is not something I know very much about in this skill.`,
    GET_ANSWER: `The %s of %s is %s. `,
    GET_ANSWER_ABBREVIATION: `The %s of %s is <say-as interpret-as='spell-out'>%s</say-as>.`,
    GET_CURRENT_SCORE: `Your current score is %s out of %s.`,
    GET_FINAL_SCORE: `Your final score is %s out of %s.`,
    REPROMPT_SPEECH: `Which other state or capital would you like to know about?`,
    HELP_MESSAGE: `I know lots of things about the United States.  You can ask me about a state or a capital, and I'll tell you what I know.  You can also test your knowledge by asking me to start a quiz.  What would you like to do?`,
  },
};

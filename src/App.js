import React, { useState } from 'react';
import { Survey } from 'survey-react-ui';
import 'survey-core/modern.min.css';
import { StylesManager, Model } from 'survey-core';
import './App.css';


var surveyValidateQuestion = function (s, options) {
  if (options && options.question && !options?.question?.isAnswerCorrect()) {
    // TODO: Submit data here
    options.error = "Incorrect answer!"
  }
}

const surveyJson = {
  "title": "Progress quiz",
  "description": "Take this quiz and fill in your details if you want to learn more about career opportunities at Progress",
  "logo": "https://www.progress.com/favicon.ico?v=2",
  "logoWidth": 60,
  "logoHeight": 60,
  hideNumbers: true,
  pages: [
    {
      elements: [
        {
          name: "Email",
          title: "Email",
          type: "text",
          isRequired: true,
          hideNumber: true,
          validators: [{
            type: "email"
          }]
        },
        {
          name: "Name",
          title: "Enter your name:",
          type: "text",
          hideNumber: true
        },
        {
          name: "Receive marketing emails",
          title: "Do you agree to receive news and job opportunities from Progress?",
          type: "checkbox",
          hideNumber: true,
          choices: [
            "Yes"
          ],
          defaultValue: "Yes"
        },
        {
          hideNumber: true,
          type: "radiogroup",
          name: "question",
          title: `What will be the result of the following JavaScript function?
<div id="codeblock" class="codeblock">
<pre>
<code>
function taskJS1() {
  const a = 1, b = 2, c = 3;
  console.log(a && b && c);
}
</code>
</pre>
</div>`,
          choices: [
            "true",
            "1",
            "2",
            "3",
            "compliation error"
          ],
          "correctAnswer": "3"
        }
      ]
    }
  ]
};


StylesManager.applyTheme("modern");


var survey = new Model(surveyJson);
survey.onCompleting.add((args) => {
  console.log(args);
});

// Create showdown markdown converter
var converter = new window.showdown.Converter();
survey.onTextMarkdown.add(function (survey, options) {
  // convert the markdown text to html
  var str = converter.makeHtml(options.text).trim();
  // remove root paragraphs <p></p>
  if (str.startsWith("<p>") && str.endsWith("</p>")) {
    str = str.substring(3);
    str = str.substring(0, str.length - 4);
  }

  // set html
  options.html = str;
});

function App(args) {
  const question = args.question;
  const firebaseService = args.firebaseService;
  debugger;
  return (
    <div id="appSurvey" className="App">
      <Survey model={survey} onValidateQuestion={surveyValidateQuestion} />;
    </div>
  );
}

export default App;

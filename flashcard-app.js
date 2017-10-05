//Require the 'inquirer' package
var inquirer = require("inquirer");
var colors = require("colors");

//Import the flash cards constructor implementations
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");

//Import the full list of questions
var questions = require("./questions.js").questions;
var questionsBasic = require("./questionsBasic.js").questionsBasic;

//Variable that holds the questions list
var closeQuestions = [];
var basicQuestions = [];

//Populate the cloze-deleted questions list
for (var i = 0; i < questions.length; i++) {
	var question = new ClozeCard(questions[i].full, questions[i].cloze);
	closeQuestions.push(question);
}

//Populate the basic questions list
for (var i = 0; i < questionsBasic.length; i++) {
		var question = new BasicCard(questionsBasic[i].front, questionsBasic[i].back);
		basicQuestions.push(question);
}

//The question the user is currently on
var currentQuestion = 0;

//How many questions the user has right
var answerCorrect = 0;

//How many questions the user has wrong
var answerWrong = 0;

//Opening question, prompting user to decide if they want basic or cloze cards.
function askType() {
  inquirer.prompt([															
      {
          type: "list",													
          message: "\nWhich kind of flashcards would you like?",	
          choices: ["Basic", "Cloze"],
          name: "menuOptions"												
      }
  ]).then(function (answer) {												

    switch (answer.menuOptions) {

        case 'Basic':
        	console.log('-------------------------------------\n');
            console.log("\nOk let's run through some basic cards...".gray);
            console.log("Please include both the first and last name of the president you are guessing!\n".underline.bold.magenta);
            askBasicQuestion();
            break;

        case 'Cloze':
        	console.log('-------------------------------------\n');
			console.log("\nOk let's run through some cloze cards...".gray);
            console.log("Please include both the first and last name of the president you are guessing!\n".underline.bold.magenta);
            askBasicQuestion();			askQuestion();
            break;

        default:
            console.log("");
            console.log("Sorry I don't understand");
            console.log("");
    }

  });

}

//Function that prompts the user to answer a given cloze-deleted question
function askQuestion() {

	inquirer.prompt([
		{
			type: 'input',
			message: closeQuestions[currentQuestion].partial + '\nAnswer: ',
			name: 'userGuess'
		}
	]).then(function (answers) {
		console.log('\n');

		//Check if the user has guessed correctly
		if (answers.userGuess.toLowerCase() === closeQuestions[currentQuestion].cloze.toLowerCase()) {
			console.log('Correct!'.bold.yellow);
			answerCorrect++;
		} else {
			console.log('Incorrect! The correct answer was...'.bold.red);
			answerWrong++;
		}

		//Show the correct answer
		console.log(closeQuestions[currentQuestion].full);
		console.log('-------------------------------------\n');

		//Advance to the next question
		if (currentQuestion < closeQuestions.length - 1) {
			currentQuestion++;
			askQuestion();
		} else {
			console.log('Game Over!');
			console.log('Correct Answers: ' + answerCorrect);
			console.log('Incorrect Answers: ' + answerWrong);

			console.log('-------------------------------------\n');

			//Prompt the user to play again
			inquirer.prompt([
				{
					type: 'confirm',
					message: 'Would you like to play again?',
					name: 'playAgain'
				}
			]).then(function (answers) {
				if (answers.playAgain) {
					//Reset the game
					currentQuestion = 0;
					answerCorrect = 0;
					answerWrong = 0;

					//Begin asking the questions
					askType();
				} else {
					//End the game
					console.log('Thanks for playing! Goodbye!');
				}
			})
		}
	})
}

//Function that prompts the user to answer a given basic question
function askBasicQuestion() {

	inquirer.prompt([
		{
			type: 'input',
			message: basicQuestions[currentQuestion].front + '\nAnswer: ',
			name: 'userGuess'
		}
	]).then(function (answers) {
		console.log('\n');

		//Check if the user has guessed correctly
		if (answers.userGuess.toLowerCase() === basicQuestions[currentQuestion].back.toLowerCase()) {
			console.log('Correct!'.bold.yellow);
			answerCorrect++;
		} else {
			console.log('Incorrect! The answer was...'.bold.red);
			answerWrong++;
		}

		//Show the correct answer
		console.log(basicQuestions[currentQuestion].back);
		console.log('-------------------------------------\n');

		//Advance to the next question
		if (currentQuestion < basicQuestions.length - 1) {
			currentQuestion++;
			askBasicQuestion();
		} else {
			console.log('Game Over!');
			console.log('Correct Answers: ' + answerCorrect);
			console.log('Incorrect Answers: ' + answerWrong);

			console.log('-------------------------------------\n');

			//Prompt the user to play again
			inquirer.prompt([
				{
					type: 'confirm',
					message: 'Would you like to play again?',
					name: 'playAgain'
				}
			]).then(function (answers) {
				if (answers.playAgain) {
					//Reset the game
					currentQuestion = 0;
					answerCorrect = 0;
					answerWrong = 0;

					//Begin asking the questions
					askType();
				} else {
					//End the game
					console.log('Thanks for playing! Goodbye!');
				}
			})
		}
	})
}

//Allows user to choose between basic or cloze cards.
askType();


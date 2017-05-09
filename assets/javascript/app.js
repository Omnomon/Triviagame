//create arrays and objects, move to private later 
$(document).ready(function() {

	var options = ["A", "B", "C", "D"]
	var guessedRight = 0;
	var guessedWrong = 0;
	var intervalId; 

	//create question object

	function trivia(question, choices, rightAnswer, checker) {
		this.question = question
		this.choices = choices
		this.rightAnswer = rightAnswer
		this.checker = function() {
			return "placeholder"
		}
	}

	// create working countdown timer 
	$("#timer").html("<h3>00:30</h3>")

	var countdown = {
		time: 30,

		start: function() {
			intervalId = setInterval(countdown.count, 1000)
			$("#startButton").toggleClass("disabled")
			$("#resetButton").toggleClass("disabled")
		},

		stop: function() {
			clearInterval(intervalId)
			countdown.time = 30
			$("#timer").html("<h3>00:30</h3>")
			$("#startButton").toggleClass("disabled")
			$("#resetButton").toggleClass("disabled")
		},

		count: function() {
			countdown.time -- 
			$("#timer")
			.html("<h3>" + countdown.timeConverter(countdown.time) + "</h3>") 
		},

		  timeConverter: function(t) {

		    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
		    var minutes = Math.floor(t / 60);
		    var seconds = t - (minutes * 60);

		    if (seconds < 10) {
		      seconds = "0" + seconds;
		    }

		    if (minutes === 0) {
		      minutes = "00";
		    }

		    else if (minutes < 10) {
		      minutes = "0" + minutes;
		    }

		    return minutes + ":" + seconds;
		  }
	}

	$("#startButton").click(countdown.start)
	$("#resetButton").click(countdown.stop)


	// make sure to put choices before the question !! 
	var abcd = ["A: ", "B: ", "C: ", "D: "]
	var choices_1 = ["yes", "no", "no" ,"no"]
	var question_1 = new trivia("does this thing work", choices_1, "yes")
	console.log(question_1)
	console.log(question_1.choices)
	console.log(choices_1)
	console.log(question_1.choices[0])
	// works! 

	var choices_2 = ["no", "yes", "no," ,"no"]
	var question_2 = new trivia("does this thing switch", choices_2, "yes")


	//create buttons and questions dynamically grabbing from question objects with class btn btn-default guessSelected 
	var grabInfo = function(input) {
		for (var i = 0; i < input.choices.length; i++) {
			var choiceButton = $("<button>")
				.addClass("btn btn-default guessSelected")
				.data("value", input.choices[i])
				.html(abcd[i] + input.choices[i])
				.appendTo("#triviaChoices")
		} 

		var question = $("<div>")
			.addClass("question")
			.data("value", input.question)
			.html("<h2>" + input.question + "</h2>")
			.appendTo("#triviaQuestion")
	
	}

	grabInfo(question_1) // works 

	//create array of questions 

	questionArray = [
	question_1, 
	question_2, 
	];

	console.log(questionArray[0])

})


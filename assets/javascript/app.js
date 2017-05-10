//create arrays and objects, move to private later 
$(document).ready(function() {

	var options = ["A", "B", "C", "D"]
	var guessedRight = 0;
	var guessedWrong = 0;
	var intervalId; 
	var j = 0; 

	//create question object

	function trivia(question, choices, answers) {
		this.question = question
		this.choices = choices //array
		this.answers = answers //array 
	}

	// make sure to put choices before the question !! -----------------------------------
	var abcd = ["A: ", "B: ", "C: ", "D: "]
	var choices_1 = ["yes", "no", "no" ,"no"]
	var answers_1 = ["yes", "wrong", "wrong", "wrong"]
	var question_1 = new trivia("does this thing work", choices_1, answers_1)

	var choices_2 = ["no", "yes", "no" ,"no"]
	var answers_2 = ["wrong", "yes", "wrong", "wrong"]
	var question_2 = new trivia("does this thing switch", choices_2, answers_2)

	var choices_3 = ["no", "no", "yes" ,"no"]
	var answers_3 = ["wrong", "wrong", "yes", "wrong"]
	var question_3 = new trivia("why you so annoying", choices_3, answers_3)


	//create buttons and questions dynamically grabbing from question objects with class btn btn-default guessSelected 
	questionArray = [
	question_1, 
	question_2, 
	question_3
	];

	var input = questionArray
	//create grabInfo function ------------------------------------------------
	var grabInfo = function(input) {
		for (var i = 0; i < input.choices.length; i++) {
			var choiceButton = $("<button>")
				.addClass("btn btn-default guessSelected")
				.attr("id", "button-" + i)
				.attr("value", input.choices[i])
				.attr("answers", input.answers[i])
				.html(abcd[i] + input.choices[i])
				.appendTo("#triviaChoices")
		} 

		var question = $("<div>")
			.addClass("question")
			.attr("value", input.question)
			.html("<h2>" + input.question + "</h2>")
			.appendTo("#triviaQuestion")
	
	}

	// create checker function------------------------------
		var checker = function(arg) {
			console.log("checker works")
			if ($(arg).attr("value") === $(arg).attr("answers")) {
				var holder = true 
			} 
			if (holder) {
				guessedRight ++
			} else {
				guessedWrong ++
		}
		
		
		console.log("guess right count is " + guessedRight)
		console.log("guess wrong count is " + guessedWrong)
		$("#triviaQuestion").html("")
		$("#triviaChoices").html("")
		}

		
//-----------------------------------------------
	var currentQuestion=0;

	$("#triviaChoices").on("click", function(event){
		console.log($(event.target))
		console.log($(event.target).attr("value"))
		checker($(event.target))
		currentQuestion++
		if(currentQuestion < questionArray.length) {
			grabInfo(questionArray[currentQuestion])
		} else {
			$("#display").html("Right answers: " + guessedRight + "<br>Wrong Answers: " + guessedWrong)
			countdown.stop()
		}


	})
/*	$("#button-0").on("click", checker)
	$("#button-1").on("click", checker)
	$("#button-2").on("click", checker)
	$("#button-3").on("click", checker)*/

// create function that switches on button click to next question in array 
	



















	// create working countdown timer 
	$("#timer").html("<h3>00:30</h3>")

	var countdown = {
		time: 30,

		start: function() {
			intervalId = setInterval(countdown.count, 1000)
			$("#startButton").toggleClass("disabled")
			$("#resetButton").toggleClass("disabled")
			grabInfo(questionArray[0])


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



})


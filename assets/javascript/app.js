//create arrays and objects, move to private later 
$(document).ready(function() {

    var options = ["A", "B", "C", "D"]
    var guessedRight = 0;
    var guessedWrong = 0;
    var intervalId;
    var j = 0;

    //create question object

    function trivia(question, choices) {
        this.question = question
        this.choices = choices //array //array 
    }

    //-----------------------------

    var tieChoiceAndAnswers = function(array1, array2) {
        var createNewEntry = [];
        var createNewArray = [];
        for (var i = 0; i < 4; i++) {
            createNewEntry[i] = [array1[i], array2[i]]
            createNewArray[i] = createNewEntry[i]
        }

        return createNewArray
    }


    // make sure to put choices before the question !! -----------------------------------
    var abcd = ["A: ", "B: ", "C: ", "D: "]

    var options_1 = ["yes", "no", "no", "no"]
    var answers_1 = ["yes", "wrong", "wrong", "wrong"]
    var choices_1 = tieChoiceAndAnswers(options_1, answers_1)
    var question_1 = new trivia("does this thing work", choices_1, answers_1)

    var options_2 = ["no", "yes", "no", "no"]
    var answers_2 = ["wrong", "yes", "wrong", "wrong"]
    var choices_2 = tieChoiceAndAnswers(options_2, answers_2)
    var question_2 = new trivia("does this thing switch", choices_2, answers_2)

    var options_3 = ["no", "no", "i don't know", "no"]
    var answers_3 = ["wrong", "wrong", "i don't know", "wrong"]
    var choices_3 = tieChoiceAndAnswers(options_3, answers_3)
    var question_3 = new trivia("why you so annoying", choices_3, answers_3)



    //----------------steal shuffle array -----------
    function shuffle(array) {
        var currentIndex = array.length
        var temporaryValue = 0;
        var randomIndex = 0;

        console.log(currentIndex)
            // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }


    //create buttons and questions dynamically grabbing from question objects with class btn btn-default guessSelected 
    questionArray = [
        question_1,
        question_2,
        question_3
    ];


    var input = questionArray
        //create grabInfo function ------------------------------------------------
    var grabInfo = function(input) {
    	var arrayShuffle = [0,1,2,3]
        var shuffleArray = shuffle(arrayShuffle)
        for (var i = 0; i < 4; i++) {
            var choiceButton = $("<button>")
                .addClass("btn btn-default guessSelected")
                .attr("value", input.choices[shuffleArray[i]][0])
                .attr("answers", input.choices[shuffleArray[i]][1])
                .attr("id", "button_" + i)
                .html(abcd[i] + input.choices[shuffleArray[i]][0])
                .css("opacity", "0.1")
                .appendTo("#triviaChoices")

        }

	        var question = $("<div>")
	            .addClass("question")
	            .attr("value", input.question)
	            .html("<h2>" + input.question + "</h2>")
	            .css("opacity", "0.1")
	            .appendTo("#triviaQuestion")

    }




    var changeInfo = function(input) {
    	var arrayShuffle = [0,1,2,3]
        var shuffleArray = shuffle(arrayShuffle)
        for (var i = 0; i < 4; i++) {
            choiceChange = $("#button_"+ i )
                .attr("value", input.choices[shuffleArray[i]][0])
                .attr("answers", input.choices[shuffleArray[i]][1])
                .html(abcd[i] + input.choices[shuffleArray[i]][0])
                .animate({ opacity: "1.0" }, 10)
        }

	        question = $(".question")
	            .attr("value", input.question)
	            .html("<h2>" + input.question + "</h2>")
	            .animate({ opacity: "1.0" }, 200)
    }

    // create checker function------------------------------
    var checker = function(arg) {
        console.log("checker works")
        if ($(arg).attr("value") === $(arg).attr("answers")) {
            var holder = true
        }
        if (holder) {
            guessedRight++
        } else {
            guessedWrong++
        }

        console.log("guess right count is " + guessedRight)
        console.log("guess wrong count is " + guessedWrong)
    }

    var clearScreen = function() {
        $(".score")
	    	.removeClass("hidden")
	        .css("opacity", "0.1")
	        .html("Right answers: " + guessedRight + "<br>Wrong Answers: " + guessedWrong)
	        .appendTo("#display")
	        .animate({ opacity: "1.0" }, 100)
        $("#triviaChoices").addClass("hidden")
        $("#triviaQuestion").addClass("hidden")
        $("#playAgain").removeClass("hidden")

    }


    //-----------------------------------------------
    var currentQuestion = 0;

    $("#triviaChoices").on("click", function(event) {
        console.log($(event.target))
        console.log($(event.target).attr("value"))
        checker
            ($(event.target))
        currentQuestion++
        if (currentQuestion < questionArray.length) {
            changeInfo(questionArray[currentQuestion])
        $(".guessSelected").animate({
            right: "700px",
            opacity: "0.001",
            display: "none"
        }, 200);
        $(".guessSelected").animate({
            left: "700px",
        }, 1);
        $(".guessSelected").animate({
            display: "block",
            left: "0px",
            opacity: "1.0"
        }, 200);
        } else {
            countdown.stop()
            clearScreen()
        }

    })


    // create function that switches on button click to next question in array 

    // create working countdown timer 
    $("#timer").html("<h3>00:30</h3>")

    var countdown = {
        time: 30,

        start: function() {
            console.log("start button works")
            intervalId = setInterval(countdown.count, 1000)

            /*			if (countdown.time <= 0 ) {
            				countdown.stop()
            				$("#display").html("Right answers: " + guessedRight + "<br>Wrong Answers: " + guessedWrong)
            			}

            */
        },

        stop: function() {
            console.log("stop button works")
            clearInterval(intervalId)
            $("#timer").html("<h3>00:30</h3>")
            $("#startButton").addClass("hidden")
            countdown.time = 30
            clearScreen()

        },

        count: function() {
            countdown.time--
                $("#timer")
                .html("<h3>" + countdown.timeConverter(countdown.time) + "</h3>")
            console.log(countdown.time)
            if (countdown.time === 0) {
                countdown.stop()
               $(".score")
		    	.removeClass("hidden")
		        .css("opacity", "0.1")
		        .html("Right answers: " + guessedRight + "<br>Wrong Answers: " + guessedWrong)
		        .appendTo("#display")
		        .animate({ opacity: "1.0" }, 100)
	        $("#triviaChoices").addClass("hidden")
	        $("#triviaQuestion").addClass("hidden")
            }

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
            } else if (minutes < 10) {
                minutes = "0" + minutes;
            }

            return minutes + ":" + seconds;
        }
    }

    $("#startButton").click(function() {
        countdown.start()
        $("#startButton").addClass("hidden")
        console.log("question array is" + questionArray[0])
        console.log(questionArray[0])
        grabInfo(questionArray[0])
        changeInfo(questionArray[0])

    })

    $("#playAgain").click(function(){
    	console.log("#playAgain button works")
        $("#triviaQuestion").removeClass("hidden")
        $("#triviaChoices").removeClass("hidden")
        $(".score").html(" ")
        changeInfo(questionArray[0])
        guessedWrong = 0;
        guessedRight = 0;
        currentQuestion = 0;
        $("#playAgain").addClass("hidden")
    })






})

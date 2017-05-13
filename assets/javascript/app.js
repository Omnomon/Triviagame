//create arrays and objects, move to private later 
$(document).ready(function() {

    var options = ["A", "B", "C", "D"]
    var guessedRight = 0;
    var guessedWrong = 0;
    var intervalId;
    var j = 0;
    var gratsArray = [];
    var smhArray = [];

    //--------hide gif 
    $(".gif").hide()


    //create question object

    function trivia(question, choices, answer) {
        this.question = question
        this.choices = choices //array[[array][array]]
        this.answer = answer
    }

    //-----------------------------grab movies, put in array. 

    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?q=congratulations&limit=15&api_key=dc6zaTOxFJmzC",
        method: "GET"
    }).done(function(response) {
        console.log(response.data[0].images.fixed_width.url)
        for (var i = 0; i < 15; i++) {
            gratsArray[i] = response.data[i].images.fixed_width.url
            gratsArray[i] = gratsArray[i].replace(/http/g,"https")
        }
        return gratsArray

    })

    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?q=smh&limit=15&api_key=dc6zaTOxFJmzC",
        method: "GET"
    }).done(function(response) {
        console.log(response.data[0].images.fixed_width.url)
        for (var i = 0; i < 15; i++) {
            smhArray[i] = response.data[i].images.fixed_width.url
            smhArray[i] = smhArray[i].replace(/http/g,"https")
        }
        return smhArray

    })

    //----------------------------

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

    var options_1 = ["Yes", "No", "Maybe", "I like bananas"]
    var answers_1 = ["Yes", "wrong", "wrong", "wrong"]
    var choices_1 = tieChoiceAndAnswers(options_1, answers_1)
    var question_1 = new trivia("Do you think this trivia website will work?", choices_1, "Yes")

    var options_2 = ["Huh?", "10", "2", "Who?"]
    var answers_2 = ["wrong", "10", "wrong", "wrong"]
    var choices_2 = tieChoiceAndAnswers(options_2, answers_2)
    var question_2 = new trivia("30 cows in a field, 28 chickens. How many didn't?", choices_2, "10")

    var options_3 = ["C", "A", "N", "U"]
    var answers_3 = ["wrong", "wrong", "N", "wrong"]
    var choices_3 = tieChoiceAndAnswers(options_3, answers_3)
    var question_3 = new trivia("What letter must appear at the beginning of the registration number of all non-military aircraft in the U.S.?", choices_3, "N")

    var options_4 = ["New Delhi", "Baghdad", "Cairo", "You're lying"]
    var answers_4 = ["wrong", "Baghdad", "wrong", "wrong"]
    var choices_4 = tieChoiceAndAnswers(options_4, answers_4)
    var question_4 = new trivia("Now used to refer to a cat, the word 'Tabby' is derived from the name of a district of what world capital?", choices_4, "Baghdad")

    var options_5 = ["5", "2", "3", "You bastard"]
    var answers_5 = ["5", "wrong", "wrong", "wrong"]
    var choices_5 = tieChoiceAndAnswers(options_5, answers_5)
    var question_5 = new trivia("How many questions do you think are left", choices_5, "5")

    var options_6 = ["Yes", "Google it", "Bing it", "Bop it"]
    var answers_6 = ["Yes", "wrong", "wrong", "wrong"]
    var choices_6 = tieChoiceAndAnswers(options_6, answers_6)
    var question_6 = new trivia("Is there a quicker way to steal these questions from google?", choices_6, "Yes")

    var options_7 = ["C", "B", "A", "D"]
    var answers_7 = ["C", "wrong", "wrong", "wrong"]
    var choices_7 = tieChoiceAndAnswers(options_7, answers_7)
    var question_7 = new trivia("Pick the correct answer", choices_7, "C")

    var options_8 = ["This again?", "2", "5", "It's not 100"]
    var answers_8 = ["wrong", "2", "wrong", "wrong"]
    var choices_8 = tieChoiceAndAnswers(options_8, answers_8)
    var question_8 = new trivia("How many questions do you think are left", choices_8, "2")

    var options_9 = ["9", "8", "7", "C"]
    var answers_9 = ["9", "wrong", "wrong", "wrong"]
    var choices_9 = tieChoiceAndAnswers(options_9, answers_9)
    var question_9 = new trivia("What question are we on right now?", choices_9, "9")

    var options_10 = ["Yes", "No", "Your code sucks", "I'll think about it"]
    var answers_10 = ["Yes", "wrong", "wrong", "wrong"]
    var choices_10 = tieChoiceAndAnswers(options_10, answers_10)
    var question_10 = new trivia("Are you going to give me an A on this homework assignment?", choices_10, "Yes")


    //----------------steal shuffle array from google -----------
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
        question_3,
        question_4,
        question_5,
        question_6,
        question_7,
        question_8,
        question_9,
        question_10
    ];


    var input = questionArray
    var grabInfo = function(input) {
        var arrayShuffle = [0, 1, 2, 3]
        var shuffleArray = shuffle(arrayShuffle)
        for (var i = 0; i < 4; i++) {
            var choiceButton = $("<button>")
                .addClass("btn btn-default guessSelected animateLeft")
                .attr("value", input.choices[shuffleArray[i]][0])
                .attr("answers", input.choices[shuffleArray[i]][1])
                .attr("id", "button_" + i)
                .html(abcd[i] + input.choices[shuffleArray[i]][0])
                .css("opacity", "0.1")
                .appendTo("#triviaChoices")
            console.log(input.answer)

        }

        var question = $("<div>")
            .addClass("question animateLeft")
            .attr("value", input.question)
            .attr("correctAnswer", input.answer)
            .html("<h2>" + input.question + "</h2>")
            .appendTo("#triviaQuestion")

    }


    var changeInfo = function(input) {
        var arrayShuffle = [0, 1, 2, 3]
        var shuffleArray = shuffle(arrayShuffle)
        for (var i = 0; i < 4; i++) {
            choiceChange = $("#button_" + i)
                .blur()
                .attr("value", input.choices[shuffleArray[i]][0])
                .attr("answers", input.choices[shuffleArray[i]][1])
                .html(abcd[i] + input.choices[shuffleArray[i]][0])
                .animate({ opacity: "1.0" }, 10)
        }

        question = $(".question")
            .attr("value", input.question)
            .html("<h2>" + input.question + "</h2>")
            .attr("correctAnswer", input.answer)

    }

    // create checker function------------------------------
    var checker = function(arg) {
        $(".correctAnswer").html("")
        console.log("checker works")
        if ($(arg).attr("value") === $(arg).attr("answers")) {
            var holder = true
        }
        if (holder) {
            guessedRight++
            $(".gif").attr("src", gratsArray[Math.floor(Math.random() * 15)])
            $(".correctAnswer").html("<h2>Nice!</h>")
        } else {
            guessedWrong++
            $(".gif").attr("src", smhArray[Math.floor(Math.random() * 15)])
            $(".correctAnswer").html("<h2>Nope. The correct answer was " + $(".question").attr("correctAnswer") + "</h2>")

        }

        console.log("guess right count is " + guessedRight)
        console.log("guess wrong count is " + guessedWrong)
        console.log($(".gif").attr("src"))
    }

    var clearScreen = function() {
        $(".score")
            .removeClass("hidden")
            .css("opacity", "0.1")
            .html("Right answers: " + guessedRight + "<br>Wrong Answers: " + guessedWrong)
            .appendTo("#display")
            .animate({ opacity: "1.0" }, 100)
        $("#triviaChoices")
            .addClass("hidden")
        $("#triviaQuestion")
            .addClass("hidden")
        $("#playAgain").removeClass("hidden")


    }


    //-----------------------------------------------
    var currentQuestion = 0;

    $("#triviaChoices").on("click", function(event) {
        console.log($(event.target))
        console.log($(event.target).attr("value"))
        checker($(event.target))
        currentQuestion++
        if (currentQuestion < questionArray.length) {
            $(".animateLeft").animate({
                right: "+=700px",
                opacity: "0.001",
                display: "none"
            }, 200);
            $(".animateLeft").animate({
                right: "-=1400px",
            }, 1);
            $(".gif").show(700)
            $(".correctAnswer").show(600)
            countdown.pause()
            setTimeout(function() {
                $(".correctAnswer").hide()
                $(".question").html("")
                changeInfo(questionArray[currentQuestion])
                countdown.start()
                $(".gif").hide()
                $(".gif").attr("src", "#")
                $(".animateLeft").animate({
                    display: "block",
                    right: "+=700px",
                    opacity: "1.0"
                }, 200);
            }, 3000)
        } else {
            countdown.stop()
            clearScreen()
            $(".gif").show()
        }

    })

    // create working countdown timer 
    $("#timer").html("<h3>00:30</h3>")

    var countdown = {
        time: 30,

        start: function() {
            console.log("start button works")
            intervalId = setInterval(countdown.count, 1000)

        },

        stop: function() {
            console.log("stop button works")
            clearInterval(intervalId)
            $("#timer").html("<h3>00:30</h3>")
            $("#startButton").addClass("hidden")
            countdown.time = 30
            clearScreen()

        },

        pause: function() {
            console.log("pause button works")
            clearInterval(intervalId)
            $("#timer").html("<h3>00:30</h3>")
            countdown.time = 30
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
                $(".gif")
                    .attr("src", smhArray[Math.floor(Math.random() * 15)])
                    .show()

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

    $("#playAgain").click(function() {
        console.log("#playAgain button works")
        $("#triviaQuestion").removeClass("hidden")
        $("#triviaChoices").removeClass("hidden")
        $(".score").html(" ")
        changeInfo(questionArray[0])
        guessedWrong = 0;
        guessedRight = 0;
        currentQuestion = 0;
        $("#playAgain").addClass("hidden")
        $(".gif").hide()
        countdown.start()
    })






})

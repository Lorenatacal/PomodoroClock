$(document).ready(function(){
    var paused;
    var countdown;
    var sessionLength;
    var countdownTime;
    var finalSessionLength

function startTimer(duration, display) {
    var timer = duration
    var minutes;
    var seconds;
    
    countdown = setInterval(function() {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            clearinterval(countdown);
        }
    }, 1000);
}

$('.start-timer').on('click', function() {
    if (countdown) {
        clearInterval(countdown);
    }
    paused = false;
    $('body').append("<div id ='countdown-timer'></div>");
    countdownTime = 60 * finalSessionLength;
    startTimer(countdownTime, $('#countdown-timer'));
});
//Pause and Unpause

$('body').on('click', '#countdown-timer', function() {
    if (paused) {
        var timer = $(this).text().split(':');
        startTimer(Number(timer[0] * 60) + Number(timer[1]), $('#countdown-timer'));
        paused = false;
    } else {
        clearInterval(countdown);
        paused = true;
    }
    });

    sessionLength = 25;

    $('#plus-length').click(function(){
        $('#session-length').html(function(i, sessionLength){
            return finalSessionLength = sessionLength*1+1;
        })
    })

    $('#minus-length').click(function(){
        $('#session-length').html(function(i, sessionLength){
            return finalSessionLength = sessionLength*1-1;
        })
    })


    $("#session-length").append(`${sessionLength}`);
    // console.log("countdownTime", countdownTime);
});
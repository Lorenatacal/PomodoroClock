$(document).ready(function () {
    var paused;
    var countdown;
    var sessionLength;
    var countdownTime;
    var finalSessionLength = 25;
    var breakLength;
    var finalBreakLength = 5;
    var clockTimer;

    function createClock(duration, display, callback){
        let minutes;
        let seconds;
        countdown = setInterval(function () {
            minutes = parseInt(duration / 60, 10)
            seconds = parseInt(duration % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.text(minutes + ":" + seconds);

            if (--duration <= 0) {
                clearInterval(countdown);
                callback();
            }
        }, 1000);
    }

    function startBreak() {
        createClock($('#session-break').html() * 60, $('#countdown-timer'), startSessionLength);
    }

    function startSessionLength() {
        createClock($('#session-length').html() * 60, $('#countdown-timer'), startBreak);
    }

    function startClock() {
        $('.start-timer').on('click', function () {
            paused = false;
            $('body').append("<div id='countdown-timer'></div>");
            countdownTime = 60 * finalSessionLength;
            clearInterval(countdown);
            createClock(countdownTime, $('#countdown-timer'), startBreak);
        });

        //Pause and Unpause

        $('body').on('click', '#countdown-timer', function () {
            if (paused) {
                clockTimer = $(this).text().split(':');
                createClock(Number(clockTimer[0] * 60) + Number(clockTimer[1]), $('#countdown-timer'));
                paused = false;
            } else {
                clearInterval(countdown);
                paused = true;
            }
        });

        sessionLength = 25;

        $('#plus-length').click(function () {
            $('#session-length').html(function (i, sessionLength) {
                return finalSessionLength = sessionLength * 1 + 1;
            })
        })

        $('#minus-length').click(function () {
            if (finalSessionLength <= 0) {
                finalSessionLength = 0;
            } else {
                $('#session-length').html(function (i, sessionLength) {
                    return finalSessionLength = sessionLength * 1 - 1;
                })
            }
        })


        $("#session-length").append(`${sessionLength}`);

    }
    startClock()

        breakLength = 5;
        $('#plus-break').click(function () {
            $('#session-break').html(function (i, sessionBreak) {
                return finalBreakLength = sessionBreak * 1 + 1;
            })
        })

        $('#minus-break').click(function () {
            if (finalBreakLength <= 0) {
                finalBreakLength = 0;
            } else {
                $('#session-break').html(function (i, sessionBreak) {
                    return finalBreakLength = sessionBreak * 1 - 1;
                })
            }
        })

        $("#session-break").append(`${breakLength}`);
    

});

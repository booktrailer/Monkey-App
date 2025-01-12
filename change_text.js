function toTimeFormat(number) {
    var content = ""
    if (number >= 3600) {
        if (number%3600 == 0) {
            content = (number/3600).toString() + ' hr';
        } else {
            var minutes_seconds = minutesSplit(number%3600);
            content = String(number%3600) + ' hr ' + minutes_seconds;
        }
    }

    return content;
}

function minutesSplit(number) {
    var content = ""
    if (number >= 60) {
        if (number%60 == 0) {
            content = (number/60).toString() + ' min';
        } else {
            var minutes = Math.floor(number/60);
            content = String(minutes) + ' min ' + String(times[i] - 60*minutes) + ' sec';
        }
    } else {
        content = String(times[i]) + ' sec';
    }
    return content;
}
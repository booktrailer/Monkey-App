var theTheme = null;
stopwatch_time = 0.0;
curr_time = 0;
start_time = 0;
the_interval = 0;
stopwatch_running = false;
orig_time = 0;
going = false;

function on_startup() {
    // load the themes
    var loaded_themes = localStorage.getItem('themes');
    console.log(loaded_themes);
    if (!(loaded_themes)) {
        console.log('not skib');
        theTheme = 'red';
        localStorage.setItem('themes', theTheme);
    } else {
        theTheme = loaded_themes;
    }

    set_theme();
}

function swap_theme(theme) {
    theTheme = theme;
    set_theme();
}

function set_theme() {
    var styles = document.getElementById('stylestuff');
    if (theTheme == null) {
        theTheme = 'red';
        styles.innerHTML = '<link rel="stylesheet" href="' + theTheme + '.css">';
    } else {
        styles.innerHTML = '<link rel="stylesheet" href="' + theTheme + '.css">';
    }
    localStorage.setItem('themes', theTheme);
    console.log(theTheme);
}

function pause_stopwatch() {
    pause_button = document.getElementById("pause_button");

    if (stopwatch_running) {
        stopwatch_running = false;
        console.log('Paused timer');
        pause_button.innerHTML = "Unpause";

        // save the elasped time when paused
        orig_time = curr_time;
        clearInterval(the_interval); 
    } else {
        if (going) {
            start_stopwatch();
        }
        pause_button.innerHTML = "Pause";
    }
}

function cancel() {
    clearInterval(the_interval);
    document.getElementById('time_num').innerHTML = '0.00 sec';
    stopwatch_running = false;
    going = false;
    orig_time = 0; // reset elapsed time
    document.title = "Timerly";
}

function start_stopwatch() {
    going = true;
    if (!stopwatch_running) {
        stopwatch_running = true;
        console.log('Starting stopwatch');

        start_time = (Date.now() / 1000) - orig_time;
        clearInterval(the_interval);
        the_interval = setInterval(stopwatch_interval, 10);
    }
}

function stopwatch_interval() {
    curr_time = (Date.now() / 1000 - start_time).toFixed(2); // calculate elapsed time
    document.getElementById('time_num').innerHTML = toTimeFormat(curr_time);
}

function toTimeFormat(x) {
    let number = Number(x);
    let content = "";
    if (number >= 3600) {
        if (number % 3600 === 0) {
            content = (number / 3600).toString() + ' hr';
        } else {
            let minutes_seconds = minutesSplit(number % 3600);
            content = Math.floor(number / 3600) + ' hr ' + minutes_seconds;
        }
    } else {
        content = minutesSplit(number);
    }
    return content;
}

function minutesSplit(y) {
    let number = Number(y);
    let content = "";
    if (number >= 60) {
        if (number % 60 === 0) {
            content = (number / 60).toString() + ' min';
        } else {
            let minutes = Math.floor(number / 60);
            content = String(minutes) + ' min ' + String((number % 60).toFixed(2)) + ' sec';
        }
    } else {
        content = String(number.toFixed(2)) + ' sec';
    }
    return content;
}
